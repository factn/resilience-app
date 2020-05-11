import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import routes, { IRoute, IRoutes } from "../routes";
import ROUTE_PERMISSIONS from "../RoutePermissionsList";
import { IRoutePermission } from "./utils";
import { PERMISSIONS } from "../../model";

export class RoutingService {
  private _auth: AuthState = {};

  private _isAuthenticated(): boolean {
    return isLoaded(this._auth) && !isEmpty(this._auth);
  }

  private _getRoutePermissionRequirements(route: IRoute): PERMISSIONS[] {
    const routePermission: IRoutePermission = this._routePermissions.find(
      (rp: IRoutePermission) => rp.route === route
    ) as IRoutePermission;
    return routePermission?.requiredPermissions || [];
  }

  private _verifyPermissions(
    requiredPermissions: PERMISSIONS[],
    route: IRoute
  ): IRouteEntitlement[] {
    return requiredPermissions.map((permission: PERMISSIONS) => {
      switch (permission) {
        case PERMISSIONS.AUTHENTICATED:
          const isAuthenticated: boolean = this._isAuthenticated();
          return {
            route: isAuthenticated ? route : this._routes.login,
            permissionGranted: isAuthenticated,
          };
        default:
          return {
            route: this._routes.home,
            permissionGranted: false,
          };
      }
    });
  }

  constructor(private _routes: IRoutes, private _routePermissions: IRoutePermission[]) {}

  public useAuth(auth: AuthState): RoutingService {
    this._auth = auth;
    return this;
  }

  public canAccessRoute(route: IRoute): IRouteEntitlement {
    const requiredPermissions: PERMISSIONS[] = this._getRoutePermissionRequirements(route);
    const verifyPermissions: IRouteEntitlement[] = this._verifyPermissions(
      requiredPermissions,
      route
    );
    const violation: IRouteEntitlement | undefined = verifyPermissions.find(
      (routeEntitlement: IRouteEntitlement) => routeEntitlement.permissionGranted === false
    );
    const permissionGranted: boolean = violation === undefined;
    return {
      route: permissionGranted ? route : (violation as IRouteEntitlement).route,
      permissionGranted,
    };
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
export default new RoutingService(routes, ROUTE_PERMISSIONS);
