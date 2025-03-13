import { Body, Controller, Get, Post } from "@nestjs/common";
import { DefaultScopes, Resource, Scopes } from "decorators";
import { ProfileService } from "./profile.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "decorators";
import { UserDocument } from "modules/user/user.schema";
import { CreateProfileDto } from "./dto/create";

@Controller('profiles')
@Resource('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService
  ) { }

  @Get('me')
  @Scopes(DefaultScopes.Read)
  @ApiBearerAuth()
  async getMe(@User() user: UserDocument) {
    console.log("user is: ", user)
    return this.profileService.findOne({
      user: user._id
    });
  }

  @Post('me')
  @Scopes(DefaultScopes.Write)
  @ApiBearerAuth()
  async create(@User() user: UserDocument, @Body() data: CreateProfileDto) {
    return this.profileService.create({
      user,
      ...data
    });
  }
}
