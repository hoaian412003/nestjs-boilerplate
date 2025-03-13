import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProfileDto {

  @IsString()
  @ApiProperty()
  brand: string;
}
