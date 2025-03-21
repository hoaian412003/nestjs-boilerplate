import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "base";
import { Organization } from "modules/organization/organization.schema";
import { Permission } from "modules/permission/permission.schema";
import mongoose, { Document } from "mongoose";


export type RoleDocument = Document & Role;

@Schema({
  timestamps: true
})
export class Role extends BaseSchema {

  @Prop({
    require: true
  })
  name: string;

  @Prop({
    require: true,
    ref: 'Permission',
    type: [mongoose.Schema.Types.ObjectId],
    autopopulate: true
  })
  permissions: Array<Permission>

  @Prop({})
  description: string;


  @Prop({
    ref: 'Organization',
    type: mongoose.Schema.Types.ObjectId
  })
  organization: Organization;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.plugin(require('mongoose-autopopulate'))
