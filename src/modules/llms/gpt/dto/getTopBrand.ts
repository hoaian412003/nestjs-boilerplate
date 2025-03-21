import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";

export class GetTopBrandParams {

  @IsString()
  @ApiProperty()
  gptId: string;
}

export class GetTopBrandBody {
  @ApiProperty()
  @IsString()
  prompt: string;
}
