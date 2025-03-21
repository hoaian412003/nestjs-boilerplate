import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdatePromptDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  content: string;
}

export class UpdatePromptParams {
  @IsString({
    each: true
  })
  @ApiProperty()
  promptId: string;
}
