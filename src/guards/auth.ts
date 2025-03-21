import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { JwtConfig } from "config/jwt.config";
import { AdminRole, Permission, PublicPermission, Resource, Role, SuperAdminRole } from "decorators";
import { Request } from "express";
import { PermissionService } from "modules/permission/permission.service";
import { UserService } from "modules/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  private jwtConfig: JwtConfig

  constructor(private reflector: Reflector,
    private permissionSerice: PermissionService,
    private jwtService: JwtService,
    configService: ConfigService,
    private userService: UserService
  ) {
    this.jwtConfig = configService.get('jwt')!;
  }

  extractTokenFromHeader(request: Request): string {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }

  async getUser(req: Request) {
    try {

      const token = this.extractTokenFromHeader(req);

      const payload = this.jwtService.verify(token, this.jwtConfig.accessTokenSigner);

      const user = await this.userService.findById(payload?._id);

      return user;

    } catch (error) {
      return null;
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get(Permission, context.getHandler());
    const resource = this.reflector.get(Resource, context.getClass());
    const role = this.reflector.get(Role, context.getHandler());
    const isPublic = permission === PublicPermission;

    const req = context.switchToHttp().getRequest();

    const user = await this.getUser(req);
    req.user = user;

    if (isPublic) {
      return true;
    }

    if (permission && !isPublic) {
      await this.permissionSerice.upsert({
        resource,
        name: permission
      });
    }

    if (user && user.roles.find((v) => (
      v.name === role || // User have this role
      v.name === SuperAdminRole || // User is Super Admin
      (v.name === AdminRole && user.organization && role !== SuperAdminRole) // User is Admin of this organization and this api not require super admin role
    ))) {
      return true;
    }

    if (user && user.roles.find(r => (
      r.permissions.find(p => p.name === permission && p.resource === resource)
    ))) {
      return true;
    }

    return false;
  }
}
