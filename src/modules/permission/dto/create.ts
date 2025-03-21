import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePermissionDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  resource: string;
}
