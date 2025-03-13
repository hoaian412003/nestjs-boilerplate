import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Resource, Scopes } from "decorators";
import { HfService } from "./hf.service";
import { GetAllHfQuery, GetOneHfParam } from "./dto/get";
import { CreateHfDto } from "./dto/create";
import { UpdateHfDto, UpdateHfParams } from "./dto/update";
import { DeleteHfQuery } from "./dto/delete";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AskHfBody, AskHfParams } from "./dto/ask";

@Controller('hfs')
@Resource('hf')
@ApiTags('Hf')
export class HfController {
  constructor(
    private hfService: HfService
  ) { }

  @Get('')
  @Scopes('view-all')
  @ApiBearerAuth()
  async getAll(@Query() query: GetAllHfQuery) {
    return this.hfService.getAll(query);
  }

  @Get(':hfId')
  @Scopes('view')
  @ApiBearerAuth()
  async getOne(@Param() param: GetOneHfParam) {
    return this.hfService.findById(param.hfId);
  }

  @Post()
  @ApiBearerAuth()
  @Scopes('create')
  async create(@Body() body: CreateHfDto) {
    return this.hfService.create(body);
  }

  @Post('/:hfId/ask')
  @ApiBearerAuth()
  @Scopes('create')
  async ask(@Param() param: AskHfParams, @Body() body: AskHfBody) {
    return this.hfService.ask(param.hfId, body);
  }

  @Put(':hfId')
  @Scopes('update')
  async update(@Body() body: UpdateHfDto, @Param() params: UpdateHfParams) {
    return this.hfService.updateOne({ _id: params.hfId }, body)
  }

  @Delete('soft')
  @Scopes('delete')
  async deleteSoft(@Query() query: DeleteHfQuery) {
    return this.hfService.deleteMany(query.ids);
  }

  @Delete('hard')
  @Scopes('delete')
  async deleteHard(@Query() query: DeleteHfQuery) {
    return this.hfService.hardDelete(query.ids);
  }
}
