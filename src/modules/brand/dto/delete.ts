import { IsString } from "class-validator";

export class DeleteBrandQuery {

  @IsString({
    each: true
  })
  ids: Array<string>;
}
