import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import "./App.css";
import theme from "./theme";

import LoginPage from "./app/page/Login";
import HomePage from "./app/page/Home";
import OffersPage from "./app/page/Offers/Offers";

function App() {
  // @ts-ignore
  const auth = useSelector(state => state.firebase.auth);
  console.log("auth", auth);
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={createMuiTheme(theme)}>
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
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
