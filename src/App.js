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
import DonatorFlow from "./js/pages/DonatorFlow"
import DoerFlow from "./js/pages/DoerFlow"
import RequesterFlow from "./js/pages/RequesterFlow"
import VerifierFlow from "./js/pages/VerifierFlow"

// Feeds
import DonatorFeed from "./js/pages/DonatorFeed"
import DoerFeed from "./js/pages/DoerFeed"
import RequesterFeed from "./js/pages/RequesterFeed"
import VerifierFeed from "./js/pages/VerifierFeed"

// 	Modals
import Account from "./js/pages/Account"
import EditAccount from "./js/pages/EditAccount"
import Login from "./js/pages/Login"
import Preferences from "./js/pages/Preferences"
import Profile from "./js/pages/Profile"

// 	Info Pages
import Info from "./js/pages/Info"

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

          {/* Feeds */}
          <Route path="/feed/donator" component={DonatorFeed} />
          <Route path="/feed/doer" component={DoerFeed} />
          <Route path="/feed/requester" component={RequesterFeed} />
          <Route path="/feed/verifier" component={VerifierFeed} />


          {/* Modals */}
          <Route path="/account" component={Account} />
          <Route path="/edit-account" component={EditAccount} />
          <Route path="/login" component={Login} />
          <Route path="/preferences" component={Preferences} />
          <Route path="/profile" component={Profile} />

          {/* Mission control */}
          <Route path="/mission-control" component={Profile} />

          {/* Scenario full-page */}
          <Route path="/:scenarioId/info" component={Info} />

          {/* 404 */}
          <Route component={NoPage} />
        </Switch>
      </div>
    )
  }
}
