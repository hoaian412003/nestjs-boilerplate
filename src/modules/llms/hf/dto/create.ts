import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateHfDto {

  name: "Hugging Face"

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  apiKey: string;
}
