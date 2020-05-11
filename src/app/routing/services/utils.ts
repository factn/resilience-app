import { IRoute } from "../routes";
import { PERMISSIONS } from "../../model";

export interface IReplacementDefinition {
  [key: string]: string | number;
}
/**
 * Returns a URL path with placeholders replaced with given values
 * @param {string} link The path containing query parameter values
 * @param  {...any} replacements Any number of query parameters to replace with value
 * @example getLinkWithQuery('/missions/:id', { id: '123' }) => '/missions/123'
 */
export function getLinkWithQuery(link: string, replacement: IReplacementDefinition) {
  for (let key in replacement) {
    const queryKey = `:${key}`;
    link = link.replace(queryKey, replacement[key] as string);
  }
  return link;
}

export interface IRoutePermission {
  route: IRoute;
  requiredPermissions: PERMISSIONS[];
}
/**
 * Add the same permission to multiple routes.
 */
export function addPermissionToRoutes(
  permissionToAdd: PERMISSIONS | null | undefined,
  routesToUpdate: IRoute[],
  currentRoutePermissions: IRoutePermission[]
): void {
  routesToUpdate.forEach((route: IRoute) => initRoutePermission(route, currentRoutePermissions));
  currentRoutePermissions
    .filter((routePermission: IRoutePermission) => routesToUpdate.includes(routePermission.route))
    .forEach((routePermission: IRoutePermission) =>
      addPermission(permissionToAdd as PERMISSIONS, routePermission)
    );
}

/**
 * Add multiple permissions to a route.
 */
export function addMultiplePermissionsToRoute(
  permissions: PERMISSIONS[],
  route: IRoute,
  currentRoutePermissions: IRoutePermission[]
): void {
  initRoutePermission(route, currentRoutePermissions);
  const routePermissionsToUpdate: IRoutePermission[] = currentRoutePermissions.filter(
    (routePermission: IRoutePermission) => routePermission.route === route
  );
  permissions.forEach((permission: PERMISSIONS) => {
    routePermissionsToUpdate.forEach((routePermission: IRoutePermission) =>
      addPermission(permission, routePermission)
    );
  });
}

/**
 * Adds a PERMISSION into specified the RoutePermission.
 */
export function addPermission(permission: PERMISSIONS, routePermission: IRoutePermission): void {
  if (permission) {
    if (!routePermission.requiredPermissions.includes(permission as any)) {
      routePermission.requiredPermissions.push(permission);
    }
  }
}

/**
 * Initialize permission list if it hasn't been setup yet for this route.
 */
export function initRoutePermission(
  route: IRoute,
  currentRoutePermissions: IRoutePermission[]
): void {
  const hasInitialized: boolean = currentRoutePermissions.some(
    (routePermission: IRoutePermission) => routePermission.route === route
  );
  if (!hasInitialized) {
    currentRoutePermissions.push({
      route,
      requiredPermissions: [],
    });
  }
}
