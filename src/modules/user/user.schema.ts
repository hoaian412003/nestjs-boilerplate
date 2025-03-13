import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import mongoose, { Document } from "mongoose";


export type UserDocument = Document & User;

@Schema({
  timestamps: true
})
export class User extends BaseSchema {
  @Prop({
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    required: true
  })
  password: string;

  @Prop({
    type: mongoose.SchemaTypes.ObjectId
  })
  role: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
