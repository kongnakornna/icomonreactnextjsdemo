import { UserRole } from '@/src/core/constants/roles.constant';
import { ROUTE_PERMISSIONS } from '@/src/core/config/route-permissions.config';

export function hasPermission(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

export function canAccessRoute(userRole: string, route: string): boolean {
  const requiredRoles = ROUTE_PERMISSIONS[route];
  if (!requiredRoles) return true;
  return hasPermission(userRole, requiredRoles);
}

export function isAdmin(userRole: string): boolean {
  return userRole === UserRole.ADMIN;
}

export function isUser(userRole: string): boolean {
  return userRole === UserRole.USER;
}

export function isViewer(userRole: string): boolean {
  return userRole === UserRole.VIEWER;
}
