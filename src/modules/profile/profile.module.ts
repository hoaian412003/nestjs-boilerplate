import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Profile, ProfileSchema } from "./profile.schema";
import { ProfileService } from "./profile.service";

@Module({
  controllers: [
    ProfileController
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema }
    ])
  ],
  exports: [
    ProfileService
  ],
  providers: [
    ProfileService
  ],
})
export class ProfileModule {

}
