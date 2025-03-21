import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { JwtConfig } from "config/jwt.config";
import { UserDocument } from "modules/user/user.schema";
import { UserService } from "modules/user/user.service";
import { RegisterUserDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  private config: JwtConfig;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService
  ) {
    this.config = this.configService.get('jwt')!;
  }

  async sign(user: UserDocument) {

    const accessToken = this.jwtService.sign(user.toObject(), this.config.accessTokenSigner);
    const refreshToken = this.jwtService.sign({
      userId: user.id
    }, this.config.refreshTokenSigner);


    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: any) {
    const { userId } = this.jwtService.verify(refreshToken, this.config.refreshTokenSigner);
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException();
    return this.sign(user);
  }

  async register(data: RegisterUserDto) {
    return this.userService.create(data);
  }
}
