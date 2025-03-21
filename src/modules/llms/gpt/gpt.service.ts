import { Gpt, GptDocument } from "./gpt.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LLMService } from "../abstract/abstract.service";
import OpenAI from 'openai';
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { BadRequestException } from "@nestjs/common";
import { AskGptBody } from "./dto/ask";
import { GetTopBrandBody } from "./dto/getTopBrand";



export class GptService extends LLMService<GptDocument> {
  constructor(
    @InjectModel(Gpt.name)
    private gptModel: Model<GptDocument>
  ) {
    super(gptModel)
  }

  async getGptModel(id: string) {

    const model = await this.findById(id);
    if (!model) throw new BadRequestException("Not found model");
    const gptModel = new OpenAI({
      apiKey: model.apiKey
    });

    return { model, gptModel }
  }

  async ask(id: string, body: AskGptBody): Promise<string> {

    const { gptModel } = await this.getGptModel(id);

    const completion = await gptModel.chat.completions.create({
      model: "gpt-4o",
      messages: body.messages as any
    });


    return completion.choices[0].message.content || "";
  }

  async getTopBrand(id: string, body: GetTopBrandBody): Promise<any[]> {
    const { gptModel } = await this.getGptModel(id);
    const BrandFormat = z.object({
      topBrands: z.array(
        z.object({
          name: z.string(),
          website: z.string(),
        })
      )
    })

    const completion = await gptModel.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        { role: 'system', content: 'Etract the event information.' },
        { role: 'system', content: 'Give top 10 brand' },
        { role: 'user', content: body.prompt }
      ],
      response_format: zodResponseFormat(BrandFormat, 'event')
    })

    return completion.choices[0].message.parsed?.topBrands || [];
  }
}
