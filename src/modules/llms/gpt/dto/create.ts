import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGptDto {
  @ApiProperty()
  @IsString()
  model: string

  @ApiProperty()
  @IsString()
  apiKey: string
}
