import { Permission, PermissionDocument } from "./permission.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { Model } from "mongoose";
import { CreatePermissionDto } from "./dto/create";

export class PermissionService extends BaseService<PermissionDocument> {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>
  ) {
    super(permissionModel)
  }

  async upsert(data: CreatePermissionDto) {
    const permission = await this.findOne(data)
    if (permission) return permission;
    return this.create(data)
  }
}
