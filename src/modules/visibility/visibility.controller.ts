import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Permission, Resource, Scopes } from "decorators";
import { VisibilityService } from "./visibility.service";
import { GetAllVisibilityQuery, GetOneVisibilityParam } from "./dto/get";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { StatisticQuery } from "./dto/statistic";

@Controller('visibilities')
@Resource('visibility')
@ApiTags('Visibility')
export class VisibilityController {
  constructor(
    private visibilityService: VisibilityService
  ) { }

  @Get('/statictis')
  @Permission('List')
  @ApiOperation({
    summary: 'Statictis visibility of brand AI'
  })
  @ApiBearerAuth()
  async statictis(@Query() query: StatisticQuery) {
    return this.visibilityService.statictis(query);
  }

}
