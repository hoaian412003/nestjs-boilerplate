import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import { Organization } from "modules/organization/organization.schema";
import mongoose, { Document } from "mongoose";


export type PromptDocument = Document & Prompt;

@Schema({
  timestamps: true
})
export class Prompt extends BaseSchema {

  @Prop({
    required: true
  })
  content: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    autopopulate: true
  })
  organization: Organization;
}

export const PromptSchema = SchemaFactory.createForClass(Prompt);
PromptSchema.plugin(require('mongoose-autopopulate'))
