import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import logo from "./logo.svg";
import "./App.css";
import theme from "./theme";

import LoginPage from "./app/page/Login";
import HomePage from "./app/page/Home";

const customTheme = createMuiTheme(theme);
function App() {
  return (
    <React.Fragment>
      <CssBaseline />
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
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
