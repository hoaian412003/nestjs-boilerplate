import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";
import { PromptDto } from "./prompt";
import { Type } from "class-transformer";

export class CreateOrganizationDto {

  @IsString()
  @ApiProperty({
    description: 'Brand Name'
  })
  brandName: string;

  @IsString()
  @ApiProperty({
    description: 'Website'
  })
  website: string;


  @ValidateNested({
    each: true
  })
  @ApiProperty({
    isArray: true,
    type: PromptDto
  })
  @Type(() => PromptDto)
  prompts: Array<PromptDto> = [];
}
