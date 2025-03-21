import { User, UserDocument } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { AdminRole } from "decorators";
import { OrganizationDocument } from "modules/organization/organization.schema";
import { RoleService } from "modules/role/role.service";
import { Model } from "mongoose";

export class UserService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private roleService: RoleService
  ) {
    super(userModel)
  }

  async validate(email: string, password: string) {
    const user = await this.userModel.findOne({
      email
    })

    if (!user) return null;
    if (user.password !== password) return null;
    return user;
  }

  async attachOrganization(user: UserDocument, organization: OrganizationDocument) {
    user.organization = organization;
    const adminRole = await this.roleService.findOne({ name: AdminRole });

    user.roles.push(adminRole!);

    return user.save();
  }
}
