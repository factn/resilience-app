import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "firebase/storage";
import { OrganizationContext, Organization } from "./app/model";

import { routes, AppRoute } from "./app/routing";
import ThemeProvider from "./app/component/ThemeProvider";
import {
  AboutPage,
  Dashboard,
  DonationPage,
  ErrorLanding,
  Home,
  Login,
  MissionCreate,
  MissionDetails,
  MissionFeedback,
  MissionsCompleted,
  MissionsCreated,
  OrganizerSignupPage,
  RequestPage,
  Signup,
  Status,
  UserProfile,
} from "./app/page";
import Snackbar from "./app/component/Snackbars";
import theme from "./theme";
import { LinearProgress } from "@material-ui/core";

// grab from domain or some service
const ORGANIZATION_ID = "1";

function App() {
  const [org, setOrg] = useState();
  useEffect(() => {
    Organization.init(ORGANIZATION_ID)
      .then((org) => setOrg(org))
      .catch((error) => {
        console.error(error);
        setOrg(null);
      });
  }, []);

  if (org === undefined) {
    return <LinearProgress />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <OrganizationContext.Provider value={org}>
              <Snackbar.Context.SnackbarProvider>
                {org === null && <Redirect to={routes.organizer.signup} />}
                <Switch>
                  <AppRoute exact path={routes.home} component={Home} />
                  <AppRoute path={routes.about} component={AboutPage} />
                  <AppRoute path={routes.login} component={Login} />
                  <AppRoute path={routes.organizer.signup} component={OrganizerSignupPage} />
                  <AppRoute path={routes.volunteer.status} component={Status} />
                  <AppRoute path={routes.user.signup} component={Signup} />
                  <AppRoute path={routes.request.start} component={RequestPage} />
                  <AppRoute path={routes.donate} component={DonationPage} />
                  <AppRoute path={routes.organizer.dashboard.home} component={Dashboard} />
                  <AppRoute path={routes.missions.createdByUser} component={MissionsCreated} />
                  <AppRoute path={routes.missions.createNew} component={MissionCreate} />
                  <AppRoute path={routes.missions.completed} component={MissionsCompleted} />
                  <AppRoute path={routes.missions.feedback} component={MissionFeedback} />
                  <AppRoute path={routes.missions.details} component={MissionDetails} />
                  <AppRoute path={routes.user.profile} component={UserProfile} />
                  <AppRoute path={routes.unauthorized}>
                    <ErrorLanding errorCode={401} />
                  </AppRoute>
                  <Route path="*">
                    <ErrorLanding errorCode={404} />
                  </Route>
                </Switch>
                <Snackbar.Context.SnackbarConsumer>
                  {(value) => {
                    return <Snackbar handleClose={value.closeSnackbar} {...value.snackbar} />;
                  }}
                </Snackbar.Context.SnackbarConsumer>
              </Snackbar.Context.SnackbarProvider>
            </OrganizationContext.Provider>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
