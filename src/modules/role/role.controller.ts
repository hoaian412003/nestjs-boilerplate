import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Permission, Resource, Role, Scopes, SuperAdminRole, User } from "decorators";
import { RoleService } from "./role.service";
import { GetAllRoleQuery, GetOneRoleParam } from "./dto/get";
import { CreateRoleDto } from "./dto/create";
import { UpdateRoleDto, UpdateRoleParams } from "./dto/update";
import { DeleteRoleQuery } from "./dto/delete";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserDocument } from "modules/user/user.schema";

@Controller('roles')
@Resource('role')
@ApiTags('Role')
export class RoleController {
  constructor(
    private roleService: RoleService
  ) { }

  @Get('')
  @ApiBearerAuth()
  @Permission('List')
  @ApiOperation({
    summary: "Get list of role"
  })
  async getAll(@Query() query: GetAllRoleQuery, @User() user: UserDocument) {
    if (user.organization) {
      return this.roleService.getAll(query, {
        organization: user.organization
      });
    }
    return this.roleService.getAll(query);
  }

  @Post()
  @ApiBearerAuth()
  @Permission('Create')
  @ApiOperation({
    summary: "Create new role"
  })
  async create(@Body() body: CreateRoleDto, @User() user: UserDocument) {
    return this.roleService.create({
      ...body,
      organization: user.organization
    });
  }

  @Put(':roleId')
  @Permission('Update')
  @ApiOperation({
    summary: "Update role"
  })
  async update(@Body() body: UpdateRoleDto, @Param() params: UpdateRoleParams) {
    return this.roleService.updateOne({ _id: params.roleId }, body)
  }

  @Delete('soft')
  @Permission('Delete')
  @ApiOperation({
    summary: "Soft delete role"
  })
  async deleteSoft(@Query() query: DeleteRoleQuery) {
    return this.roleService.deleteMany(query.ids);
  }

  @Delete('hard')
  @Permission('Delete')
  @ApiOperation({
    summary: "Hard delete role"
  })
  async deleteHard(@Query() query: DeleteRoleQuery) {
    return this.roleService.hardDelete(query.ids);
  }
}
