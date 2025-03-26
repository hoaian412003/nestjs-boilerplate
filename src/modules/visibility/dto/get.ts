import { IsString } from "class-validator";
import { BaseQuery } from "base/base.query";

export class GetAllVisibilityQuery extends BaseQuery {
}

export class GetOneVisibilityParam {
  @IsString()
  visibilityId: string;
}
