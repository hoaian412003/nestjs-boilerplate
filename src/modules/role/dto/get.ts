import { IsString } from "class-validator";
import { BaseQuery } from "base/base.query";

export class GetAllRoleQuery extends BaseQuery {

}

export class GetOneRoleParam {
  @IsString()
  roleId: string;
}
