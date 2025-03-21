import { Prompt, PromptDocument } from "./prompt.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { PromptDto } from "modules/organization/dto/prompt";
import { Model } from "mongoose";

export class PromptService extends BaseService<PromptDocument> {
  constructor(
    @InjectModel(Prompt.name)
    private promptModel: Model<PromptDocument>
  ) {
    super(promptModel)
  }

  async upsert(data: Array<PromptDto>) {
    return Promise.all(data.map((value) => {
      if (value.id) return this.findByIdAndUpdate(value.id, value)
      return this.create(value);
    }))
  }
}
