import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import { Prompt } from "modules/prompt/prompt.schema";
import mongoose from "mongoose";
import { Document } from "mongoose";


export type OrganizationDocument = Document & Organization;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true
  }
})
export class Organization extends BaseSchema {

  @Prop({
    required: true
  })
  brandName: string;

  @Prop({
    required: true
  })
  website: string;

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    autopopulate: true,
    ref: 'Prompt'
  })
  prompts: Array<Prompt>;

}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
OrganizationSchema.plugin(require('mongoose-autopopulate'));
