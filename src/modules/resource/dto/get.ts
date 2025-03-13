import { IsString } from "class-validator";
import { BaseQuery } from "base/base.query";

export class GetAllResourceQuery extends BaseQuery {

}

export class GetOneResourceParam {
  @IsString()
  resourceId: string;
}
