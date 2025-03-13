import { IsString } from "class-validator";

export class DeleteResourceQuery {

  @IsString({
    each: true
  })
  ids: Array<string>;
}
