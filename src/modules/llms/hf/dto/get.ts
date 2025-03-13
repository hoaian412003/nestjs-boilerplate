import { IsString } from "class-validator";
import { BaseQuery } from "base/base.query";

export class GetAllHfQuery extends BaseQuery {

}

export class GetOneHfParam {
  @IsString()
  hfId: string;
}
