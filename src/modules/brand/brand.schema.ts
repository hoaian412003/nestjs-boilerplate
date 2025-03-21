import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import { Document } from "mongoose";


export type BrandDocument = Document & Brand;

@Schema({
  timestamps: true
})
export class Brand extends BaseSchema {
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
