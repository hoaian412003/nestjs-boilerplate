import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Organization, OrganizationSchema } from "./organization.schema";
import { OrganizationService } from "./organization.service";
import { UserModule } from "modules/user/user.module";

@Module({
  controllers: [
    OrganizationController
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema }
    ]),
    UserModule
  ],
  exports: [
    OrganizationService
  ],
  providers: [
    OrganizationService
  ],
})
export class OrganizationModule {

}
