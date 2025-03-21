import { Prompt, PromptDocument } from "./prompt.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { Model } from "mongoose";

export class PromptService extends BaseService<PromptDocument> {
  constructor(
    @InjectModel(Prompt.name)
    private promptModel: Model<PromptDocument>
  ) {
    super(promptModel)
  }
}
