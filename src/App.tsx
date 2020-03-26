import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { useSelector } from "react-redux";

import "./App.css";
import theme from "./theme";

import LoginPage from "./app/page/Login";
import HomePage from "./app/page/Home";
import OffersPage from "./app/page/Offers/Offers";
import SignupPage from "./app/page/Signup";

import MakeRequest from "./app/page/MakeRequest";
import Missions from "./app/page/Missions";
import UserProfile from "./app/page/UserProfile";
  // @ts-ignore
import {ThemeProvider} from "styled-components";

const customTheme = createMuiTheme(theme)

function App() {
  // @ts-ignore
  const auth = useSelector((state) => state.firebase.auth);
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
              <Route path="/offers">
                <OffersPage />;
              </Route>
              <Route path="/signup">
                <SignupPage />
              </Route>
              <Route path="/request/create" component={MakeRequest} />
              <Route path="/missions" component={Missions} />
              <Route path="/user" component={UserProfile} />
            </Switch>
          </div>
        </Router>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

export default App;
