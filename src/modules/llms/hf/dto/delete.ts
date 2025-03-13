import { IsString } from "class-validator";

export class DeleteHfQuery {

  @IsString({
    each: true
  })
  ids: Array<string>;
}
