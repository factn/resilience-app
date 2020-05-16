import { PERMISSIONS } from "../model";
import { addPermissionsToRoutes, IRoutePermissions } from "./services/utils";
import routes, { IRoute } from "./routes";

const RoutePermissions: IRoutePermissions = {};

const publicOnlyRoutes: IRoute[] = [
  routes.home,
  routes.about,
  routes.donate,
  routes.login,
  routes.organizer.signup,
  routes.request.start,
  routes.request.foodbox,
  routes.request.success,
  routes.request.error,
  routes.user.signup,
  routes.unauthorized,
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
  routes.organizer.dashboard.volunteers,
  routes.user.profile,
  routes.volunteer.status,
  routes.recipient.dashboard.home,
  routes.recipient.dashboard.submitted,
  routes.recipient.dashboard.completed,
];

addPermissionsToRoutes([PERMISSIONS.PUBLIC], publicOnlyRoutes, RoutePermissions);
addPermissionsToRoutes([PERMISSIONS.AUTHENTICATED], authenticatedRoutes, RoutePermissions);

export default RoutePermissions;
