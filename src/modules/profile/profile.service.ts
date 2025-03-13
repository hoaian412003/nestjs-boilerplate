import { Profile, ProfileDocument } from "./profile.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { Model } from "mongoose";

export class ProfileService extends BaseService<ProfileDocument> {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<ProfileDocument>
  ) {
    super(profileModel)
  }
}
