/**
 * Define all routes in the app
 */
const routes: IRoutes = {
  home: "/",
  about: "/about",
  login: "/login",
  unauthorized: "/oops",
  pageNotFound: "/notfound",
  request: {
    start: "/request",
    foodbox: "/request/foodbox",
    success: "/request/foodbox/success/:type",
    error: "/request/foodbox/error",
  },
  donate: "/donate",

  recipient: {
    dashboard: {
      home: "/recipient",
      submitted: "/recipient/submitted",
      completed: "/recipient/completed",
    },
  },

  missions: {
    main: "/missions",
    details: "/missions/:id",
    createdByUser: "/missions/created",
    createNew: "/missions/new",
    completed: "/missions/completed",
    feedback: "/missions/feedback/:id",
  },

  organizer: {
    signup: "/organizer/signup",
    dashboard: {
      home: "/dashboard",
      missions: "/dashboard/missions",
      recipients: "/dashboard/recipients",
      volunteers: "/dashboard/volunteers",
    },
  },

  user: {
    signup: "/signup",
    profile: "/user/profile",
  },

  volunteer: {
    status: "/status",
  },
};
export type IRoute = string;
export interface IRoutes {
  [key: string]: IRoute | IRoutes | any;
}
export default routes;
