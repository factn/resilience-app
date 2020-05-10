import routes from "./routes";
import { getLinkWithQuery } from "./utils";
import AppRoute from "./AppRoute";

export { routes, getLinkWithQuery, AppRoute };

export type IRoutes = import("./routes").IRoutes;
export type IRoute = import("./routes").IRoute;
