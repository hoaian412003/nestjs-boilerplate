import { Module } from "@nestjs/common";
import { BrandController } from "./brand.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Brand, BrandSchema } from "./brand.schema";
import { BrandService } from "./brand.service";

@Module({
  controllers: [
    BrandController
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Brand.name, schema: BrandSchema }
    ])
  ],
  exports: [
    BrandService
  ],
  providers: [
    BrandService
  ],
})
export class BrandModule {

}
