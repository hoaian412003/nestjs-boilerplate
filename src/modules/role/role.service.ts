import { Role, RoleDocument } from "./role.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { Model } from "mongoose";

export class RoleService extends BaseService<RoleDocument> {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>
  ) {
    super(roleModel)
  }
}
