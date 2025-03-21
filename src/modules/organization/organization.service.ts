import { Organization, OrganizationDocument } from "./organization.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { Model } from "mongoose";

export class OrganizationService extends BaseService<OrganizationDocument> {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>
  ) {
    super(organizationModel)
  }
}
