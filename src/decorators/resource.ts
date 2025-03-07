import { SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const Resource = Reflector.createDecorator<string>();
