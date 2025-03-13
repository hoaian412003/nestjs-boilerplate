import { IsString } from "class-validator";

export class UpdateProfileDto { }

export class UpdateProfileParams {
  @IsString({
    each: true
  })
  profileId: string;
}
