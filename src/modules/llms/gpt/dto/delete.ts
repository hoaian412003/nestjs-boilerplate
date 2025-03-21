import { IsString } from "class-validator";

export class DeleteGptQuery {

  @IsString({
    each: true
  })
  ids: Array<string>;
}
