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
  routes.request.success.donation,
  routes.request.success.payment,
  routes.request.error,
  routes.user.signup,
  routes.unauthorized,
  routes.pageNotFound,
];

const authenticatedRoutes: IRoute[] = [
  routes.logout,
  routes.organizer.dashboard.home,
  routes.missions.createdByUser,
  routes.missions.createNew,
  routes.missions.completed,
  routes.missions.feedback,
  routes.missions.details,
  routes.organizer.dashboard.home,
  routes.organizer.dashboard.missions,
  routes.organizer.dashboard.recipients,
  routes.organizer.dashboard.volunteers,
  routes.organizer.dashboard.create,
  routes.user.profile,
  routes.volunteer.status,
  routes.volunteer.dashboard.home,
  routes.recipient.dashboard.home,
  routes.recipient.dashboard.submitted,
  routes.recipient.dashboard.completed,
];

// Public routes
addPermissionsToRoutes([PERMISSIONS.PUBLIC], publicOnlyRoutes, RoutePermissions);
addPermissionsToRoutes([PERMISSIONS.BECOME_VOLUNTEER], [routes.user.signup], RoutePermissions);

// Authenticated routes
addPermissionsToRoutes([PERMISSIONS.AUTHENTICATED], authenticatedRoutes, RoutePermissions);

// Mission-related routes
addPermissionsToRoutes(
  [PERMISSIONS.VIEW_MISSIONS],
  [
    routes.volunteer.dashboard.home,
    routes.missions.details,
    routes.missions.createdByUser,
    routes.missions.completed,
    routes.missions.feedback,
  ],
  RoutePermissions
);
addPermissionsToRoutes(
  [PERMISSIONS.CREATE_NEW_MISSIONS],
  [routes.missions.createNew],
  RoutePermissions
);

// Organizers-related routes
addPermissionsToRoutes(
  [PERMISSIONS.VIEW_ORGANIZER_DASHBOARD],
  [routes.organizer.dashboard.home],
  RoutePermissions
);
addPermissionsToRoutes(
  [PERMISSIONS.VIEW_ALL_MISSIONS],
  [routes.organizer.dashboard.missions],
  RoutePermissions
);
addPermissionsToRoutes(
  [PERMISSIONS.VIEW_ALL_RECIPIENTS],
  [routes.organizer.dashboard.recipients],
  RoutePermissions
);
addPermissionsToRoutes(
  [PERMISSIONS.VIEW_ALL_VOLUNTEERS],
  [routes.organizer.dashboard.volunteers],
  RoutePermissions
);
addPermissionsToRoutes(
  [PERMISSIONS.VIEW_ORGANIZER_DASHBOARD],
  [routes.organizer.dashboard.create],
  RoutePermissions
);

export default RoutePermissions;
