import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import { Organization } from "modules/organization/organization.schema";
import { Role } from "modules/role/role.schema";
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Role',
    autopopulate: true
  })
  roles: Array<Role>;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    autopopulate: true
  })
  organization: Organization;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(require('mongoose-autopopulate'));
