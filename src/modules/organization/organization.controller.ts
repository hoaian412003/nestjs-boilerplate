
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Permission, PublicPermission, Resource, Role, Scopes, SuperAdminRole, User } from "decorators";
import { GetAllOrganizationQuery, GetOneOrganizationParam } from "./dto/get";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { OrganizationService } from "./organization.service";
import { UserDocument } from "modules/user/user.schema";
import { CreateOrganizationDto } from "./dto/create";
import { UserService } from "modules/user/user.service";
import { UpdateOrganizationDto, UpdateOrganizationParams } from "./dto/update";

@Controller('organizations')
@Resource('organization')
@ApiTags('Organization')
export class OrganizationController {
  constructor(
    private origanizationService: OrganizationService,
    private userService: UserService
  ) { }

  @Get('')
  @Role(SuperAdminRole)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get list of organization'
  })
  async getAll(@Query() query: GetAllOrganizationQuery, @User() user: UserDocument) {
    return this.origanizationService.getAll(query)
  }

  @Post()
  @Permission(PublicPermission)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create new organization'
  })
  async create(@Body() body: CreateOrganizationDto, @User() user: UserDocument) {
    if (user.organization) throw new BadRequestException("User already have organization");
    const organization = await this.origanizationService.create(body);
    await this.userService.attachOrganization(user, organization);
    return organization;
  }

  @Get('me')
  @Permission('Get')
  @ApiOperation({
    summary: 'Get detail of current organization'
  })
  @ApiBearerAuth()
  async getMe(@User() user: UserDocument) {
    return this.origanizationService.findById(user.organization._id);
  }

  @Put('me')
  @Permission('Update')
  @ApiOperation({
    summary: 'Update current organization'
  })
  @ApiBearerAuth()
  async updateMe(@User() user: UserDocument, @Body() body: UpdateOrganizationDto) {
    return this.origanizationService.updateOne({ _id: user.organization._id }, body)
  }

  @Get(':organizationId')
  @Role(SuperAdminRole)
  @ApiOperation({
    summary: 'Get detail of organization'
  })
  @ApiBearerAuth()
  async getOne(@Param() param: GetOneOrganizationParam) {
    return this.origanizationService.findById(param.organizationId);
  }

  @Put(':organizationId')
  @Role(SuperAdminRole)
  @ApiOperation({
    summary: 'Update organization'
  })
  @ApiBearerAuth()
  async update(@Body() body: UpdateOrganizationDto, @Param() params: UpdateOrganizationParams) {
    return this.origanizationService.updateOne({ _id: params.organizationId }, body)
  }
}
