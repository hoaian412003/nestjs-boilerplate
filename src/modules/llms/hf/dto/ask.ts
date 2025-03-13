import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { CreateHfDto } from "./create";
import { Message } from "modules/llms/abstract/abstract.type";

export class AskHfParams {

  @IsString()
  @ApiProperty()
  hfId: string;
}

export class AskHfBody {
  @ApiProperty({
    isArray: true
  })
  @ValidateNested()
  @Type(() => Message)
  messages: Array<Message>;
}
