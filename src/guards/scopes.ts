import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { JwtConfig } from "config/jwt.config";
import { DefaultScopes, Scopes } from "decorators";
import { Request } from "express";

@Injectable()
export class ScopeGuard implements CanActivate {
  private jwtConfig: JwtConfig

  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.jwtConfig = configService.get('jwt')!;
  }

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    const scopes = this.reflector.get(Scopes, context.getHandler());
    // TODO: Check scope latter

    if (!token && scopes === DefaultScopes.Public) return true;

    const user = this.jwtService.verify(token, this.jwtConfig.accessTokenSigner);
    request.user = user;

    return true;
  };

  extractTokenFromHeader(request: Request): string {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
