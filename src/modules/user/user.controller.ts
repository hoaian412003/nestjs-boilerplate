import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { DefaultScopes, Resource, Scopes } from "decorators";
import { UserService } from "./user.service";
import { GetAllUserQuery, GetOneUserParam } from "./dto/get";
import { CreateUserDto } from "./dto/create";
import { UpdateUserDto, UpdateUserParams } from "./dto/update";
import { DeleteUserQuery } from "./dto/delete";
import { ApiConsumes, ApiOperation, ApiProduces, ApiTags } from "@nestjs/swagger";

@Controller('users')
@Resource('user')
@ApiTags('User')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Get('')
  @Scopes('view-all')
  async getAll(@Query() query: GetAllUserQuery) {
    return this.userService.getAll(query);
  }

  @Get(':userId')
  @Scopes('view')
  @ApiOperation({
    summary: "Get user profile"
  })
  async getOne(@Param() param: GetOneUserParam) {
    return this.userService.findById(param.userId);
  }

  @Post()
  @Scopes('create')
  @ApiOperation({
    summary: "Register user"
  })
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Put(':userId')
  @Scopes('update')
  @ApiOperation({
    summary: "Update user profile"
  })
  async update(@Body() body: UpdateUserDto, @Param() params: UpdateUserParams) {
    return this.userService.updateOne({ _id: params.userId }, body)
  }

  @Delete('soft')
  @Scopes('delete')
  @ApiOperation({
    summary: "Delete user"
  })
  async deleteSoft(@Query() query: DeleteUserQuery) {
    return this.userService.deleteMany(query.ids);
  }

  @Delete('hard')
  @Scopes('delete')
  @ApiOperation({
    summary: "Delete user"
  })
  async deleteHard(@Query() query: DeleteUserQuery) {
    return this.userService.hardDelete(query.ids);
  }
}
