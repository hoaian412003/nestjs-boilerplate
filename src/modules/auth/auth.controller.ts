import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Permission, PublicPermission, Resource } from "decorators";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserDocument } from "modules/user/user.schema";
import { Request, Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { RegisterUserDto } from "./dto/register.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
@Resource('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/register')
  @Permission(PublicPermission)
  @ApiOperation({
    summary: 'Register new user'
  })
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Login user'
  })
  @UseGuards(AuthGuard('local'))
  @Permission(PublicPermission)
  async login(@Req() req: Request & { user: UserDocument }, @Res({ passthrough: true }) res: Response, @Body() body: LoginDto) {
    const { accessToken, refreshToken } = await this.authService.sign(req.user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true
    })

    return {
      accessToken
    }
  }
  @Post('/refresh')
  @Permission(PublicPermission)
  @ApiOperation({
    summary: 'Refresh access token'
  })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    const { accessToken, refreshToken: newRefreshToken, } = await this.authService.refresh(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true
    })
    return { accessToken };
  }
}
