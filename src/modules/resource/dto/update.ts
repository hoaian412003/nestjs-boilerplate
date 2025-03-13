import { PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreateResourceDto } from "./create";

export class UpdateResourceDto extends PartialType(CreateResourceDto) { }

export class UpdateResourceParams {
  @IsString({
    each: true
  })
  resourceId: string;
}
