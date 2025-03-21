import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Resource, Scopes } from "decorators";
import { GptService } from "./gpt.service";
import { GetAllGptQuery, GetOneGptParam } from "./dto/get";
import { CreateGptDto } from "./dto/create";
import { UpdateGptDto, UpdateGptParams } from "./dto/update";
import { DeleteGptQuery } from "./dto/delete";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AskGptBody, AskGptParams } from "./dto/ask";
import { GetTopBrandBody, GetTopBrandParams } from "./dto/getTopBrand";

@Controller('gpt')
@Resource('gpt')
@ApiTags('Gpt')
export class GptController {
  constructor(
    private gptService: GptService
  ) { }

  @Get('')
  @Scopes('view-all')
  @ApiBearerAuth()
  async getAll(@Query() query: GetAllGptQuery) {
    return this.gptService.getAll(query);
  }

  @Get(':gptId')
  @Scopes('view')
  async getOne(@Param() param: GetOneGptParam) {
    return this.gptService.findById(param.gptId);
  }

  @Post()
  @Scopes('create')
  async create(@Body() body: CreateGptDto) {
    return this.gptService.create(body);
  }

  @Post(':gptId/ask')
  @Scopes('create')
  @ApiBearerAuth()
  async ask(@Body() body: AskGptBody, @Param() param: AskGptParams) {
    return this.gptService.ask(param.gptId, body);
  }

  @Post(':gptId/top-brand')
  @Scopes('create')
  @ApiBearerAuth()
  async getTopBrand(@Body() body: GetTopBrandBody, @Param() param: GetTopBrandParams) {
    return this.gptService.getTopBrand(param.gptId, body);
  }

  @Put(':gptId')
  @Scopes('update')
  async update(@Body() body: UpdateGptDto, @Param() params: UpdateGptParams) {
    return this.gptService.updateOne({ _id: params.gptId }, body)
  }

  @Delete('soft')
  @Scopes('delete')
  async deleteSoft(@Query() query: DeleteGptQuery) {
    return this.gptService.deleteMany(query.ids);
  }

  @Delete('hard')
  @Scopes('delete')
  async deleteHard(@Query() query: DeleteGptQuery) {
    return this.gptService.hardDelete(query.ids);
  }
}
