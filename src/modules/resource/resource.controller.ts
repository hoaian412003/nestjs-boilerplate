import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Resource, Scopes } from "decorators";
import { ResourceService } from "./resource.service";
import { GetAllResourceQuery, GetOneResourceParam } from "./dto/get";
import { CreateResourceDto } from "./dto/create";
import { UpdateResourceDto, UpdateResourceParams } from "./dto/update";
import { DeleteResourceQuery } from "./dto/delete";
import { ApiTags } from "@nestjs/swagger";

@Controller('resources')
@Resource('resource')
@ApiTags('Resource')
export class ResourceController {
  constructor(
    private resourceService: ResourceService
  ) { }

  @Get('')
  @Scopes('view-all')
  async getAll(@Query() query: GetAllResourceQuery) {
    return this.resourceService.getAll(query);
  }

  @Get(':resourceId')
  @Scopes('view')
  async getOne(@Param() param: GetOneResourceParam) {
    return this.resourceService.findById(param.resourceId);
  }

  @Post()
  @Scopes('create')
  async create(@Body() body: CreateResourceDto) {
    return this.resourceService.create(body);
  }

  @Put(':resourceId')
  @Scopes('update')
  async update(@Body() body: UpdateResourceDto, @Param() params: UpdateResourceParams) {
    return this.resourceService.updateOne({ _id: params.resourceId }, body)
  }

  @Delete('soft')
  @Scopes('delete')
  async deleteSoft(@Query() query: DeleteResourceQuery) {
    return this.resourceService.deleteMany(query.ids);
  }

  @Delete('hard')
  @Scopes('delete')
  async deleteHard(@Query() query: DeleteResourceQuery) {
    return this.resourceService.hardDelete(query.ids);
  }
}
