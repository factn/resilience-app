import routes, { IRoute } from "./routes";
import { PERMISSIONS } from "../model/permissions/Permissions";
import { addPermissionToRoutes, IRoutePermission } from "./services/utils";

const RoutePermissionsList: IRoutePermission[] = [];

const publicOnlyRoutes: IRoute[] = [
  routes.home,
  routes.about,
  routes.donate,
  routes.login,
  routes.organizer.signup,
  routes.request.start,
  routes.user.signup,
];

const authenticatedRoutes: IRoute[] = [
  routes.organizer.dashboard.home,
  routes.missions.createdByUser,
  routes.missions.createNew,
  routes.missions.completed,
  routes.missions.feedback,
  routes.missions.details,
  routes.missions.main,
  routes.organizer.dashboard.home,
  routes.organizer.dashboard.missions,
  routes.organizer.dashboard.recipients,
  routes.organizer.dashboard.volunteer,
  routes.request.foodbox,
  routes.request.success,
  routes.request.error,
  routes.user.profile,
  routes.volunteer.status,
];

addPermissionToRoutes(null, publicOnlyRoutes, RoutePermissionsList);
addPermissionToRoutes(PERMISSIONS.AUTHENTICATED, authenticatedRoutes, RoutePermissionsList);

export default RoutePermissionsList;
