import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "modules/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  controllers: [
    AuthController
  ],
  imports: [
    UserModule,
    PassportModule,
  ],
  exports: [
    AuthService,
  ],
  providers: [
    AuthService,
    LocalStrategy
  ],
})
export class AuthModule {

}
