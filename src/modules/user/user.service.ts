import { User, UserDocument } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { Model } from "mongoose";

export class UserService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
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
}
