import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class StatisticQuery {
  @IsString()
  @ApiProperty()
  startDate: string;

  @IsString()
  @ApiProperty()
  endDate: string;
}
