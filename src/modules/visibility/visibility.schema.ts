import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import { Prompt } from "modules/prompt/prompt.schema";
import mongoose, { Document } from "mongoose";


export type VisibilityDocument = Document & Visibility;

@Schema({
  timestamps: true
})
export class Visibility extends BaseSchema {

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    autopopulate: true
  })
  prompt: Prompt;

  @Prop({
    required: true,
  })
  brands: Array<{
    name: string;
    website: string;
  }>


  @Prop({
    required: true
  })
  model: string;
}

export const VisibilitySchema = SchemaFactory.createForClass(Visibility);
VisibilitySchema.plugin(require('mongoose-autopopulate'))
