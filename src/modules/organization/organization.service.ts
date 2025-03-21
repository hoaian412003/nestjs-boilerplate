import { Organization, OrganizationDocument } from "./organization.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { CreateOrganizationDto } from "./dto/create";
import { PromptService } from "modules/prompt/prompt.service";
import { UpdateOrganizationDto, UpdateOrganizationParams } from "./dto/update";

export class OrganizationService extends BaseService<OrganizationDocument> {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
    private promptService: PromptService
  ) {
    super(organizationModel)
  }


  async create(data: CreateOrganizationDto) {
    const prompts = await this.promptService.upsert(data.prompts);
    return super.create({
      ...data,
      prompts
    })
  }

  async updateOne(filter: FilterQuery<OrganizationDocument>, data: UpdateOrganizationDto) {
    const prompts = await this.promptService.upsert(data.prompts || []);
    return super.updateOne(filter, { ...data, prompts });
  }
}
