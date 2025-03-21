import { IsString } from "class-validator";
import { BaseQuery } from "base/base.query";

export class GetAllBrandQuery extends BaseQuery {

}

export class GetOneBrandParam {
  @IsString()
  brandId: string;
}
