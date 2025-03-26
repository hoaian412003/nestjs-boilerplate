import { IsString } from "class-validator";

export class UpdateVisibilityDto { }

export class UpdateVisibilityParams {
  @IsString({
    each: true
  })
  visibilityId: string;
}
