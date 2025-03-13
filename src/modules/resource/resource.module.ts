import { Module } from "@nestjs/common";
import { ResourceController } from "./resource.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Resource, ResourceSchema } from "./resource.schema";
import { ResourceService } from "./resource.service";

@Module({
  controllers: [
    ResourceController
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Resource.name, schema: ResourceSchema }
    ])
  ],
  exports: [
    ResourceService
  ],
  providers: [
    ResourceService
  ],
})
export class ResourceModule {

}
