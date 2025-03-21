import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class PromptDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  id: string;
}
