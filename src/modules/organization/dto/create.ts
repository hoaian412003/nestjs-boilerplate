import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

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


  @IsString({
    each: true
  })
  @ApiProperty({
    isArray: true
  })
  prompt: Array<string>;
}
