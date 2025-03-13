import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class Message {
  @IsString()
  @ApiProperty()
  role: string;

  @IsString()
  @ApiProperty()
  content: string;
}
