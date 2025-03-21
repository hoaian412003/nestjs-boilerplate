import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { BaseSchema } from "base";
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

}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

OrganizationSchema.virtual('prompts', {
  ref: "Prompt",
  localField: '_id',
  foreignField: 'organization'
})
