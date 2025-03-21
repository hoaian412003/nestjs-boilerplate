import { IsString } from "class-validator";
import { BaseQuery } from "base/base.query";
import { ApiProperty } from "@nestjs/swagger";

export class GetAllPromptQuery extends BaseQuery {

}

export class GetOnePromptParam {
  @IsString()
  @ApiProperty()
  promptId: string;
}
