import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import routes, { IRoute, IRoutes } from "../routes";
import ROUTE_PERMISSIONS from "../RoutePermissionsList";
import { IRoutePermission } from "./utils";

export class RoutingService {
  public get isAuthenticated(): boolean {
    const auth = useSelector((state: any) => state.firebase.auth);
    return isLoaded(auth) && !isEmpty(auth);
  }

  constructor(routes: IRoutes, routePermissions: IRoutePermission[]) {}

  public canAccessRoute(route: IRoute): boolean {
    const isAuthenticated: boolean = this.isAuthenticated;
    return true;
  }
}
export default new RoutingService(routes, ROUTE_PERMISSIONS);
