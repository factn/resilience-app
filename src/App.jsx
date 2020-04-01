import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { useSelector } from "react-redux";

import { ThemeProvider } from "styled-components";
import { isLoaded, isEmpty } from "react-redux-firebase";

import "./App.css";
import theme from "./theme";

import LoginPage from "./app/page/Login";
import HomePage from "./app/page/Home";
import SignupPage from "./app/page/Signup";
import OrganizerSignupPage from "./app/page/OrganizerSignup";
import Status from "./app/page/Status";

import MakeRequest from "./app/page/MakeRequest";
import { Missions, MissionsCreated, MissionsVolunteered } from "./app/page";

import { MissionsControl } from "./app/page";

import MissionDetails from "./app/page/MissionDetails";
import UserProfile from "./app/page/UserProfile";
// @ts-ignore

function PrivateRoute({ children, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  // @ts-ignore
  const customTheme = createMuiTheme(theme);
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={customTheme}>
        <ThemeProvider theme={customTheme}>
          <Router>
            <div className="App">
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/organizer/signup">
                  <OrganizerSignupPage />;
                </Route>
                <Route path="/signup">
                  <SignupPage />
                </Route>
                <PrivateRoute path="/request/create">
                  <MakeRequest />
                </PrivateRoute>
                <PrivateRoute path="/missions/control" component={MissionsControl} />
                <Route path="/missions/created" component={MissionsCreated} />
                <Route path="/missions/volunteered" component={MissionsVolunteered} />
                <Route path="/missions/:id" component={MissionDetails} />
                <Route path="/missions" component={Missions} />
                <Route path="/user" component={UserProfile} />
                <Route path="/status" component={Status} />
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

export default App;
