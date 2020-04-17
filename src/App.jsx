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
import SignupScene from "./app/page/Signup";
import OrganizerSignupPage from "./app/page/OrganizerSignup";
import Status from "./app/page/Status";

import { Missions, MissionsCreated, MissionCreate, PostMission } from "./app/page";
import MissionsAssigned from "./app/page/MissionsAssigned";
import MissionsStarted from "./app/page/MissionsStarted";
import MissionsCompleted from "./app/page/MissionsCompleted";

import { Dashboard } from "./app/page";

import MissionDetails from "./app/page/MissionDetails";

import UserProfile from "./app/page/UserProfile";
import { Mission } from "./app/model";

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
                <Route exact path="/" component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/organizer/signup" component={OrganizerSignupPage} />
                <Route path="/status" component={Status} />
                <Route path="/temp/story123" component={PostMission} />

                <Route path="/signup" component={SignupScene} />

                <Route path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/missions/created">
                  <MissionsCreated />
                </PrivateRoute>
                <PrivateRoute path="/missions/assigned">
                  <MissionsAssigned />
                </PrivateRoute>
                <PrivateRoute path="/missions/started">
                  <MissionsStarted />
                </PrivateRoute>
                <PrivateRoute path="/missions/completed">
                  <MissionsCompleted />
                </PrivateRoute>
                <PrivateRoute path="/missions/new">
                  <MissionCreate />
                </PrivateRoute>

                <Route path="/missions/:id" component={MissionDetails} />
                <Route path="/missions" component={Missions} />
                <PrivateRoute path="/user/profile">
                  <UserProfile />
                </PrivateRoute>
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

export default App;
