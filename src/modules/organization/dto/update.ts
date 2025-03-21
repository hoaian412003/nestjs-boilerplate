import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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


  @IsString({
    each: true
  })
  @IsOptional()
  @ApiProperty({
    isArray: true
  })
  prompt: Array<string>;

}

export class UpdateOrganizationParams {
  @ApiProperty()
  @IsString({
    each: true
  })
  organizationId: string;
}
