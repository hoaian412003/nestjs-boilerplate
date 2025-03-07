import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { DefaultScopes, Scopes } from "decorators";

@Injectable()
export class ScopeGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const scopes = this.reflector.get(Scopes, context.getHandler());

    if (scopes === DefaultScopes.Public) return true;

    // TODO: Decode access token to grant

    return true;
  }
}
