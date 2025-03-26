import { Visibility, VisibilityDocument } from "./visibility.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { GptService } from "modules/llms/gpt/gpt.service";
import { Prompt } from "modules/prompt/prompt.schema";
import { Model } from "mongoose";
import { StatisticQuery } from "./dto/statistic";

export class VisibilityService extends BaseService<VisibilityDocument> {
  constructor(
    @InjectModel(Visibility.name)
    private visibilityModel: Model<VisibilityDocument>,
    private gptService: GptService,
  ) {
    super(visibilityModel);
  }

  async visibleBrandRecord(prompt: Prompt) {
    try {
      const brands = await this.gptService.getTopBrand("", {
        prompt: prompt.content
      })

      await this.visibilityModel.create({
        brands,
        model: 'GPT',
        prompt: prompt
      })
    } catch (error) {
      console.error("Record visible failed", prompt.content, error.message)
    }
  }

  async statictis(query: StatisticQuery) {

    // Input: startDt, endDt, interval
    // Get all prompt record from startDt to endDt
    // Count(visible) / totalRecord on interval

    const agg = this.visibilityModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(query.startDate),
            $lte: new Date(query.endDate)
          },
        },
      },
      {
        $addFields: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          }
        }
      },
      {
        $group: {
          _id: "$date",
          totalCount: { $sum: 1 },
          // Preserve all documents for the next grouping stage
          documents: { $push: "$$ROOT" }
        }
      },
      { $unwind: "$documents" },
      { $unwind: "$documents.brands" },
      {
        $group: {
          _id: {
            date: "$_id",
            brand: "$documents.brands.name" // Assuming 'brand' field exists
          },
          brandCount: { $sum: 1 },
          totalCount: { $first: "$totalCount" }
        }
      },
      {
        $addFields: {
          percentage: {
            $multiply: [
              { $divide: ["$brandCount", "$totalCount"] },
              100
            ]
          }
        }
      }
    ]);

    const result = await agg.exec();

    console.log("result: ", result.length);

    return result;
  }
}
