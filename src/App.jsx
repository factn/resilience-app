import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import ThemeProvider from "./app/component/ThemeProvider";
import { Dashboard } from "./app/page";
import { MissionCreate, MissionsCompleted, MissionsCreated } from "./app/page";
import AboutPage from "./app/page/Aboutus";
import HomePage from "./app/page/Home";
import LoginPage from "./app/page/Login";
import MissionDetails from "./app/page/MissionDetails";
import OrganizerSignupPage from "./app/page/OrganizerSignup";
import RequestPage from "./app/page/Request";
import SignupScene from "./app/page/Signup";
import Status from "./app/page/Status";
import UserProfile from "./app/page/UserProfile";
import theme from "./theme";

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
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/organizer/signup" component={OrganizerSignupPage} />
              <Route path="/status" component={Status} />
              <Route path="/signup" component={SignupScene} />
              <Route path="/request" component={RequestPage} />
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <PrivateRoute path="/missions/created">
                <MissionsCreated />
              </PrivateRoute>
              <PrivateRoute path="/missions/new">
                <MissionCreate />
              </PrivateRoute>
              <PrivateRoute path="/missions/completed">
                <MissionsCompleted />
              </PrivateRoute>
              <Route path="/missions/:id" component={MissionDetails} />

              <PrivateRoute path="/user/profile">
                <UserProfile />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
