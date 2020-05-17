import routes, { IRoute, IRoutes } from "../routes";
import ROUTE_PERMISSIONS from "../RoutePermissions";
import { IPermissionSet, IRoutePermissions } from "./utils";
import { PERMISSIONS } from "../../model";
import userPermissionsService, {
  UserPermissionsService,
} from "../../model/permissions/UserPermissionsService";

export class RoutingService {
  private _determineEntitlement(
    requiredPermission: PERMISSIONS,
    happyPath: IRoute,
    sadPath: IRoute
  ): IRouteEntitlement {
    const permissionGranted: boolean = this._userPermissions.hasPermission(requiredPermission);
    const route: IRoute = permissionGranted ? happyPath : sadPath;
    return { route, permissionGranted };
  }

  private _verifyPermissions(
    requiredPermissions: IPermissionSet,
    route: IRoute
  ): IRouteEntitlement[] {
    const entitlements: IRouteEntitlement[] = [];
    for (let p in requiredPermissions) {
      if (requiredPermissions.hasOwnProperty(p)) {
        const permission: PERMISSIONS = p as PERMISSIONS;
        let entitlement: IRouteEntitlement;
        switch (permission) {
          case PERMISSIONS.PUBLIC:
            entitlement = {
              route,
              permissionGranted: true,
            };
            break;
          case PERMISSIONS.AUTHENTICATED:
            entitlement = this._determineEntitlement(permission, route, this._routes.login);
            break;
          case PERMISSIONS.VIEW_MISSIONS:
          case PERMISSIONS.CREATE_NEW_MISSIONS:
          case PERMISSIONS.VIEW_ORGANIZER_DASHBOARD:
          case PERMISSIONS.VIEW_ALL_MISSIONS:
          case PERMISSIONS.VIEW_ALL_RECIPIENTS:
          case PERMISSIONS.VIEW_ALL_VOLUNTEERS:
            entitlement = this._determineEntitlement(permission, route, this._routes.unauthorized);
            break;
          default:
            console.debug("UNCAUGHT PERMISSION", permission);
            entitlement = {
              route: this._routes.home,
              permissionGranted: false,
            };
        }
        entitlements.push(entitlement);
      }
    }
    if (entitlements.length === 0) {
      // User is trying to access route we haven't set permissions for (=｀ω´=)
      entitlements.push({
        route: this._routes.pageNotFound,
        permissionGranted: false,
      });
    }
    return entitlements;
  }

  constructor(
    private _routes: IRoutes,
    private _routePermissions: IRoutePermissions,
    private _userPermissions: UserPermissionsService
  ) {}

  public canAccessRoute(route: IRoute): IRouteEntitlement {
    const requiredPermissions: IPermissionSet = this._routePermissions[route] as IPermissionSet;
    const verifyPermissions: IRouteEntitlement[] = this._verifyPermissions(
      requiredPermissions,
      route
    );
    const violation: IRouteEntitlement | undefined = verifyPermissions.find(
      (routeEntitlement: IRouteEntitlement) => !routeEntitlement.permissionGranted
    );
    const permissionGranted: boolean = violation === undefined;
    const result: IRouteEntitlement = {
      route: permissionGranted ? route : (violation as IRouteEntitlement).route,
      permissionGranted,
    };
    // console.debug("HAS PERMISSIONS", this._userPermissions.permissions);
    // console.debug("REQUIRES", requiredPermissions);
    // console.debug("VERIFY", verifyPermissions);
    // console.debug("RESULT", result);
    if (violation) console.debug("VIOLATION", violation);
    return result;
  }
}
export interface IRouteEntitlement {
  route: IRoute;
  permissionGranted: boolean;
}
export interface AuthState {
  isLoaded?: boolean;
  isEmpty?: boolean;
}
export default new RoutingService(routes, ROUTE_PERMISSIONS, userPermissionsService);
