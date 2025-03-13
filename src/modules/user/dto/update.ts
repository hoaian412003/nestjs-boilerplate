import { IsString } from "class-validator";

export class UpdateUserDto { }

export class UpdateUserParams {
  @IsString({
    each: true
  })
  userId: string;
}
