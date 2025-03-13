import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateResourceDto {

  @ApiProperty({
    description: 'Name of resource'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of resource'
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Icon of resource'
  })
  @IsOptional()
  @IsString()
  icon: string;
}
