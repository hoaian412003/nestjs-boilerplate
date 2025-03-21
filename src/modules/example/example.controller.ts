import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ExampleService } from "./example.service";
import { GetAllExampleQuery, GetOneExampleParam } from "./dto/get";
import { CreateExampleDto } from "./dto/create";
import { UpdateExampleDto, UpdateExampleParams } from "./dto/update";
import { DeleteExampleQuery } from "./dto/delete";
import { Permission, Resource, Scopes } from "decorators";

@Controller('examples')
@Resource('example')
export class ExampleController {
  constructor(
    private exampleService: ExampleService
  ) { }

  @Get('')
  @Permission('Create')
  async getAll(@Query() query: GetAllExampleQuery) {
    return this.exampleService.getAll(query);
  }

  @Get(':exampleId')
  @Permission('Public')
  async getOne(@Param() param: GetOneExampleParam) {
    return this.exampleService.findById(param.exampleId);
  }

  @Post()
  @Scopes('create')
  async create(@Body() body: CreateExampleDto) {
    return this.exampleService.create(body);
  }

  @Put(':exampleId')
  @Scopes('update')
  async update(@Body() body: UpdateExampleDto, @Param() params: UpdateExampleParams) {
    return this.exampleService.updateOne({ _id: params.exampleId }, body)
  }

  @Delete('soft')
  @Scopes('delete')
  async deleteSoft(@Query() query: DeleteExampleQuery) {
    return this.exampleService.deleteMany(query.ids);
  }

  @Delete('hard')
  @Scopes('delete')
  async deleteHard(@Query() query: DeleteExampleQuery) {
    return this.exampleService.hardDelete(query.ids);
  }
}
