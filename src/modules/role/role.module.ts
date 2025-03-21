import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "./role.schema";
import { RoleService } from "./role.service";

@Module({
  controllers: [
    RoleController
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema }
    ])
  ],
  exports: [
    RoleService
  ],
  providers: [
    RoleService
  ],
})
export class RoleModule {

}
