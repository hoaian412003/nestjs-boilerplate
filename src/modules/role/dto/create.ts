import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateRoleDto {

  @IsString()
  @ApiProperty()
  name: string;

  @IsString({

    each: true
  })
  @ApiProperty({
    isArray: true
  })
  permission: Array<string>;

  @IsOptional()
  @IsString()
  @ApiProperty()
  descrition: string;
}
