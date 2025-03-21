import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { Message } from "modules/llms/abstract/abstract.type";

export class AskGptParams {

  @IsString()
  @ApiProperty()
  gptId: string;
}

export class AskGptBody {
  @ApiProperty({
    isArray: true
  })
  @ValidateNested()
  @Type(() => Message)
  messages: Array<Message>;
}
