import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Email of user"
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "Password of user"
  })
  @IsString()
  password: string;
}
