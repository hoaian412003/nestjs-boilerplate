import { IsString } from "class-validator";

export class DeletePromptQuery {

  @IsString({
    each: true
  })
  ids: Array<string>;
}
