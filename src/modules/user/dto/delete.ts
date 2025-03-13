import { IsString } from "class-validator";

export class DeleteUserQuery {

  @IsString({
    each: true
  })
  ids: Array<string>;
}
