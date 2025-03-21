import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import { IsString } from "class-validator";
import { Document } from "mongoose";


export type PermissionDocument = Document & Permission;

@Schema({
  timestamps: true
})
export class Permission extends BaseSchema {

  @Prop({
    required: true
  })
  name: string;

  @Prop({
    required: true
  })
  resource: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
