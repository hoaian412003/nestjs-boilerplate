import { IsString } from "class-validator";
import { BaseQuery } from "base/base.query";

export class GetAllProfileQuery extends BaseQuery {

}

export class GetOneProfileParam {
  @IsString()
  profileId: string;
}
