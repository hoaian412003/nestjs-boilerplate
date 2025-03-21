import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePromptDto {
  @ApiProperty()
  @IsString()
  content: string;
}
