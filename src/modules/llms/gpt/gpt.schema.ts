import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import { Document } from "mongoose";


export type GptDocument = Document & Gpt;

@Schema({
  timestamps: true
})
export class Gpt extends BaseSchema {

  name: "GPT"

  @Prop({
    required: true
  })
  model: string;

  @Prop({
    required: true
  })
  apiKey: string;
}

export const GptSchema = SchemaFactory.createForClass(Gpt);
