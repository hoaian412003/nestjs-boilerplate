import { Reflector } from "@nestjs/core"

export const Role = Reflector.createDecorator<string>();

export const SuperAdminRole = 'Super Admin';
export const AdminRole = 'Admin'
