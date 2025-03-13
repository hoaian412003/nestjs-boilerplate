import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import { Document } from "mongoose";


export type HfDocument = Document & Hf;

@Schema({
  timestamps: true
})
export class Hf extends BaseSchema {
  name: "Hugging Face"

  @Prop()
  model: string;

  @Prop()
  apiKey: string;
}

export const HfSchema = SchemaFactory.createForClass(Hf);
