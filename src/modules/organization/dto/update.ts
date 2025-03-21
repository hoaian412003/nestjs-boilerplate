import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { PromptDto } from "./prompt";
import { Type } from "class-transformer";

export class UpdateOrganizationDto {
  @IsString()
  @ApiProperty({
    description: 'Brand Name'
  })
  @IsOptional()
  brandName: string;

  @IsString()
  @ApiProperty({
    description: 'Website'
  })
  @IsOptional()
  website: string;


  @ValidateNested({
    each: true
  })
  @ApiProperty({
    isArray: true,
    type: PromptDto
  })
  @IsOptional()
  @Type(() => PromptDto)
  prompts?: Array<PromptDto> = [];
}

export class UpdateOrganizationParams {
  @ApiProperty()
  @IsString({
    each: true
  })
  organizationId: string;
}
