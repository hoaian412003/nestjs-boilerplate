import { Resource, ResourceDocument } from "./resource.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { Model } from "mongoose";

export class ResourceService extends BaseService<ResourceDocument> {
  constructor(
    @InjectModel(Resource.name)
    private resourceModel: Model<ResourceDocument>
  ) {
    super(resourceModel)
  }
}
