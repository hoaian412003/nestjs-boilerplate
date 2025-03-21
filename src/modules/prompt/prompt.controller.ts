import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Permission, Resource, Scopes, User } from "decorators";
import { PromptService } from "./prompt.service";
import { GetAllPromptQuery, GetOnePromptParam } from "./dto/get";
import { CreatePromptDto } from "./dto/create";
import { UpdatePromptDto, UpdatePromptParams } from "./dto/update";
import { DeletePromptQuery } from "./dto/delete";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserDocument } from "modules/user/user.schema";

@Controller('prompts')
@Resource('prompt')
@ApiTags('Prompt')
export class PromptController {
  constructor(
    private promptService: PromptService
  ) { }

  @Get('')
  @Permission('List')
  @ApiOperation({
    summary: 'Get list of prompt'
  })
  @ApiBearerAuth()
  async getAll(@Query() query: GetAllPromptQuery, @User() user: UserDocument) {
    return this.promptService.getAll(query, { organization: user.organization });
  }

  @Get(':promptId')
  @Permission('Get')
  @ApiOperation({
    summary: 'Get detail of prompt'
  })
  @ApiBearerAuth()
  async getOne(@Param() param: GetOnePromptParam, @User() user: UserDocument) {
    return this.promptService.findOne({
      _id: param.promptId,
      organization: user.organization
    });
  }

  @Post()
  @Permission('Create')
  @ApiOperation({
    summary: 'Create new prompt'
  })
  @ApiBearerAuth()
  async create(@Body() body: CreatePromptDto, @User() user: UserDocument) {
    return this.promptService.create({
      ...body,
      organization: user.organization
    });
  }

  @Put(':promptId')
  @Permission('Update')
  @ApiOperation({
    summary: 'Get detail of prompt'
  })
  @ApiBearerAuth()
  async update(@Body() body: UpdatePromptDto, @Param() params: UpdatePromptParams, @User() user: UserDocument) {
    return this.promptService.updateOne({ _id: params.promptId }, body)
  }

  @Delete('soft')
  @Permission('Delete')
  @ApiOperation({
    summary: 'Get detail of prompt'
  })
  @ApiBearerAuth()
  async deleteSoft(@Query() query: DeletePromptQuery) {
    return this.promptService.deleteMany(query.ids);
  }

  @Delete('hard')
  @Permission('Delete')
  @ApiOperation({
    summary: 'Get detail of prompt'
  })
  @ApiBearerAuth()
  async deleteHard(@Query() query: DeletePromptQuery) {
    return this.promptService.hardDelete(query.ids);
  }
}
