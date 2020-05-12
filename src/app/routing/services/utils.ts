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

/**
 * Add the same permission(s) to multiple routes.
 */
export function addPermissionsToRoutes(
  permissionsToAdd: PERMISSIONS[],
  routesToUpdate: IRoute[],
  currentRoutePermissions: IRoutePermissions
): void {
  routesToUpdate.forEach((route: IRoute) => {
    let routePermissions: IPermissionSet = currentRoutePermissions[route];
    if (!routePermissions) {
      routePermissions = currentRoutePermissions[route] = {};
    }
    permissionsToAdd.forEach((permission: PERMISSIONS) => {
      routePermissions[permission] = permission;
    });
  });
}

export type IRoutePermissions = { [route: string]: IPermissionSet };
export type IPermissionSet = { [permission: string]: PERMISSIONS };
