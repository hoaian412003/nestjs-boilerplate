import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Resource, Scopes } from "decorators";
import { BrandService } from "./brand.service";
import { GetAllBrandQuery, GetOneBrandParam } from "./dto/get";
import { CreateBrandDto } from "./dto/create";
import { UpdateBrandDto, UpdateBrandParams } from "./dto/update";
import { DeleteBrandQuery } from "./dto/delete";
import { ApiTags } from "@nestjs/swagger";

@Controller('brands')
@Resource('brand')
@ApiTags('Brand')
export class BrandController {
  constructor(
    private brandService: BrandService
  ) { }

  @Get('')
  @Scopes('view-all')
  async getAll(@Query() query: GetAllBrandQuery) {
    return this.brandService.getAll(query);
  }

  @Get(':brandId')
  @Scopes('view')
  async getOne(@Param() param: GetOneBrandParam) {
    return this.brandService.findById(param.brandId);
  }

  @Post()
  @Scopes('create')
  async create(@Body() body: CreateBrandDto) {
    return this.brandService.create(body);
  }

  @Put(':brandId')
  @Scopes('update')
  async update(@Body() body: UpdateBrandDto, @Param() params: UpdateBrandParams) {
    return this.brandService.updateOne({ _id: params.brandId }, body)
  }

  @Delete('soft')
  @Scopes('delete')
  async deleteSoft(@Query() query: DeleteBrandQuery) {
    return this.brandService.deleteMany(query.ids);
  }

  @Delete('hard')
  @Scopes('delete')
  async deleteHard(@Query() query: DeleteBrandQuery) {
    return this.brandService.hardDelete(query.ids);
  }
}
