import { Brand, BrandDocument } from "./brand.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "base";
import { Model } from "mongoose";

export class BrandService extends BaseService<BrandDocument> {
  constructor(
    @InjectModel(Brand.name)
    private brandModel: Model<BrandDocument>
  ) {
    super(brandModel)
  }
}
