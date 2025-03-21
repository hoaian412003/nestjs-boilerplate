import { BaseService } from "base";
import { Model } from "mongoose";
import { LLMAbstractDocument } from "./abstract.schema";

export abstract class LLMService<T extends LLMAbstractDocument> extends BaseService<T> {
  constructor(
    model: Model<T>
  ) {
    super(model)
  }

  abstract ask(id: string, query: { prompt: string } & any): Promise<string>

  abstract getTopBrand(id: string, prompt: any): Promise<Array<any>>
}
