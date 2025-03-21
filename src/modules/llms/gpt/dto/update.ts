import { IsString } from "class-validator";

export class UpdateGptDto { }

export class UpdateGptParams {
  @IsString({
    each: true
  })
  gptId: string;
}
