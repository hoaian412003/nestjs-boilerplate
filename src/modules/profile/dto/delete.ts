import { IsString } from "class-validator";

export class DeleteProfileQuery {

  @IsString({
    each: true
  })
  ids: Array<string>;
}
