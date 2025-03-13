import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import { Document } from "mongoose";


export type ResourceDocument = Document & Resource;

@Schema({
  timestamps: true
})
export class Resource extends BaseSchema {

  @Prop({
    required: true
  })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  icon?: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
