/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"

// Styles
import "./App.scss"

// Pages
// Home
import Home from "./js/pages/Home"

// Flows
import Feed from "./js/pages/Feed"
import DonatorFlow from "./js/pages/DonatorFlow"
import DoerFlow from "./js/pages/DoerFlow"
import RequesterFlow from "./js/pages/RequesterFlow"
import VerifierFlow from "./js/pages/VerifierFlow"
import DoerConfirmation from "./js/pages/DoerConfirmation"

// 	Account creation
import Account from "./js/pages/Account"
import FBConfirm from "./js/pages/FBConfirm";
import FBVerify from "./js/pages/FBVerify";

// 	Account
import Login from "./js/pages/Login"
import Preferences from "./js/pages/Preferences"
import Profile from "./js/pages/Profile"
import MissionControl from "./js/pages/MissionControl";

// 	Info Pages
import Page from "./js/pages/Page"

// 404
import NoPage from "./js/pages/NoPage"
/*** [end of imports] ***/

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          {/* Home */}
          <Route path="/" exact component={Home} />

          {/* Flows */}
          <Route path="/donator" component={DonatorFlow} />
          <Route path="/doer" component={DoerFlow} />
          <Route path="/requester" component={RequesterFlow} />
          <Route path="/verifier" component={VerifierFlow} />
          <Route path="/feed" component={Feed} />
          <Route path="/doer/confirmation" component={DoerConfirmation} />

          {/* Account creation */}
          <Route path="/account" exact component={Account} />
          <Route path="/account/confirm-facebook" exact component={FBConfirm} />
          <Route path="/account/verify-facebook" exact component={FBVerify} />

          {/* Account */}
          <Route path="/login" component={Login} />
          <Route path="/preferences" component={Preferences} />
          <Route path="/profile" component={Profile} />

          {/* Mission control */}
          <Route path="/missions" exact component={MissionControl} />
          <Route path="/missions/:role" exact component={MissionControl} />
          <Route path="/missions/:role/:tab" exact component={MissionControl} />

          {/* Scenario full-page */}
          <Route path="/:scenarioId/" exact component={Page} />
          <Route path="/:scenarioId/:role/" exact component={Page} />
          <Route path="/:scenarioId/:role/:tab" exact component={Page} />

          {/* 404 */}
          <Route component={NoPage} />
        </Switch>
      </div>
    )
  }
}
