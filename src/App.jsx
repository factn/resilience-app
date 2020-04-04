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
import AboutPage from "./app/page/Aboutus";
import SignupPage from "./app/page/Signup";
import OrganizerSignupPage from "./app/page/OrganizerSignup";
import Status from "./app/page/Status";

import MakeRequest from "./app/page/MakeRequest";
import { Missions, MissionsCreated, MissionsVolunteered } from "./app/page";

import { MissionsControl } from "./app/page";

import MissionDetails from "./app/page/MissionDetails";

import UserProfile from "./app/page/UserProfile";

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
              state: { referrer: location, warning: true },
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
                <Route path="/about">
                  <AboutPage />
                </Route>
                <Route path="/login" component={LoginPage} />
                <Route path="/organizer/signup">
                  <OrganizerSignupPage />;
                </Route>
                <Route path="/signup">
                  <SignupPage />
                </Route>
                <PrivateRoute path="/request/create">
                  <MakeRequest />
                </PrivateRoute>
                <PrivateRoute path="/missions/control">
                  <MissionsControl />
                </PrivateRoute>
                <PrivateRoute path="/missions/created">
                  <MissionsCreated />
                </PrivateRoute>
                <PrivateRoute path="/missions/volunteered">
                  <MissionsVolunteered />
                </PrivateRoute>
                <Route path="/missions/:id" component={MissionDetails} />
                <Route path="/missions" component={Missions} />
                <Route path="/status" component={Status} />
                <Route path="/user/profile" component={UserProfile} />
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

export default App;
