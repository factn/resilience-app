import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import logo from "./logo.svg";
import "./App.css";

import LoginPage from "./app/page/Login";
import HomePage from "./app/page/Home";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
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
    </React.Fragment>
  );
}

export default App;
