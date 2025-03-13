import { IsString } from "class-validator";
import { BaseQuery } from "base/base.query";
import { ApiParam, ApiProperty } from "@nestjs/swagger";

export class GetAllUserQuery extends BaseQuery {

}

export class GetOneUserParam {
  @IsString()
  @ApiProperty()
  userId: string;
}
