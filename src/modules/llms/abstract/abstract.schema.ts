import { BaseSchema } from "base";
import { Document } from "mongoose";

export class LLMAbstract extends BaseSchema {
  name: string;
  apiKey: string;
}

export type LLMAbstractDocument = LLMAbstract & Document;
