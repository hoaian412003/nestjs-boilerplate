import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import { User } from "modules/user/user.schema";
import mongoose, { Document } from "mongoose";


export type ProfileDocument = Document & Profile;

@Schema({
  timestamps: true
})
export class Profile extends BaseSchema {

  @Prop({
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    autopopulate: true
  })
  user: User;

  @Prop({
    required: true
  })
  brand: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
ProfileSchema.plugin(require('mongoose-autopopulate'));
