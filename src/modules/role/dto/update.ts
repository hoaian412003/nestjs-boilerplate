import { IsString } from "class-validator";

export class UpdateRoleDto { }

export class UpdateRoleParams {
  @IsString({
    each: true
  })
  roleId: string;
}
