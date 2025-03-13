import { IsString } from "class-validator";

export class UpdateHfDto { }

export class UpdateHfParams {
  @IsString({
    each: true
  })
  hfId: string;
}
