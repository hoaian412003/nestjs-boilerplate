import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { DefaultScopes, Resource, Scopes } from "decorators";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UserDocument } from "modules/user/user.schema";
import { Request, Response } from "express";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
@Resource('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/login')
  @ApiOperation({
    summary: 'Login user'
  })
  @UseGuards(AuthGuard('local'))
  @Scopes(DefaultScopes.Public)
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
  @Scopes(DefaultScopes.Public)
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
