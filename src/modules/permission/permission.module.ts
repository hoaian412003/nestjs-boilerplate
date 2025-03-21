import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Permission, PermissionSchema } from "./permission.schema";
import { PermissionService } from "./permission.service";

@Global()
@Module({
  controllers: [
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema }
    ])
  ],
  exports: [
    PermissionService
  ],
  providers: [
    PermissionService
  ],
})
export class PermissionModule {

}
