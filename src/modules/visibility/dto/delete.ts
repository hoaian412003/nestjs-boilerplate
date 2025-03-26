import { IsString } from "class-validator";

export class DeleteVisibilityQuery {

  @IsString({
    each: true
  })
  ids: Array<string>;
}
