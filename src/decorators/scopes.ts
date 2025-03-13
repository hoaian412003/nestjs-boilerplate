import { applyDecorators } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export enum DefaultScopes {
  Public = 'public',
  Read = 'read',
  Write = 'write',
}

export const Scopes = Reflector.createDecorator<string | string[]>();
