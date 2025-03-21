import { IsString } from "class-validator";

export class DeleteOrganizationQuery {

  @IsString({
    each: true
  })
  ids: Array<string>;
}
