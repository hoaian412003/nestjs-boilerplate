import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Resource } from "decorators";

@Injectable()
export class ResourceGuard implements CanActivate {

  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    // TODO: Connect with scope then authorize
    const resources = this.reflector.get(Resource, context.getClass());
    if (!resources) throw new BadRequestException("Invalid resources");
    return true;
  }
}
