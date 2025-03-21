import { IsString } from "class-validator";
import { BaseQuery } from "base/base.query";
import { ApiProperty } from "@nestjs/swagger";

export class GetAllOrganizationQuery extends BaseQuery {

}

export class GetOneOrganizationParam {
  @ApiProperty()
  @IsString()
  organizationId: string;
}
