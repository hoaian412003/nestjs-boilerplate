import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { RoleModule } from "modules/role/role.module";

@Module({
  controllers: [
    UserController,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    RoleModule
  ],
  exports: [
    UserService
  ],
  providers: [
    UserService
  ],
})
export class UserModule {

}
