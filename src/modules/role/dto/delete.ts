import { IsString } from "class-validator";

export class DeleteRoleQuery {

  @IsString({
    each: true
  })
  ids: Array<string>;
}
