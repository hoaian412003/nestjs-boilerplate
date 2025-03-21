import { IsString } from "class-validator";
import { BaseQuery } from "base/base.query";

export class GetAllGptQuery extends BaseQuery {

}

export class GetOneGptParam {
  @IsString()
  gptId: string;
}
