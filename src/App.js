/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { HashRouter, Route, Switch } from "react-router-dom"
import Cookies from "js-cookie"

// Styles
import "./App.scss"

// Pages
//  - Home
import Home from "./js/pages/Home"

//  - Flows
import DonatorFlow from "./js/pages/DonatorFlow"
import DoerFlow from "./js/pages/DoerFlow"
import Confirmation from "./js/pages/Confirmation"
import RequesterFlow from "./js/pages/RequesterFlow"
import Feed from "./js/pages/Feed"

//  - Account creation
import Account from "./js/pages/Account"
import FBConfirm from "./js/pages/FBConfirm"
import FBVerify from "./js/pages/FBVerify"

//  - Account
import Login from "./js/pages/Login"
import Profile from "./js/pages/Profile"
import Reputation from "./js/pages/Reputation"
import MissionControl from "./js/pages/MissionControl"

//  - Info Pages
import Info from "./js/pages/Info"

//  - 404
import NoPage from "./js/pages/NoPage"
/*** [end of imports] ***/

export default class App extends Component {
  componentDidMount = () => {
    if (!Cookies.get("userId")) Cookies.set("userId", "1")
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          {/* Home */}
          <Route path="/" exact component={Home} />

          {/* Flows */}
          <Route path="/donator" component={DonatorFlow} />
          <Route path="/doer" exact component={DoerFlow} />
          <Route path="/:role/confirmation" exact component={Confirmation} />
          <Route path="/:scenarioId/:role/confirmation" exact component={Confirmation} />
          <Route path="/:scenarioId/:role/confirmation/:verb/:noun" exact component={Confirmation} />
          <Route path="/requester" component={RequesterFlow} />
          <Route path="/feed/:type" component={Feed} />
          
          {/* Account */}
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/reputation/:otherUserId" exact component={Reputation} />
          <Route path="/account" exact component={Account} />
          <Route path="/account/confirm-facebook" exact component={FBConfirm} />
          <Route path="/account/verify-facebook" exact component={FBVerify} />

          {/* Mission control */}
          <Route path="/missions" exact component={MissionControl} />
          <Route path="/missions/:role" exact component={MissionControl} />
          <Route path="/missions/:role/:tab" exact component={MissionControl} />

          {/* Scenario full-page */}
          <Route path="/:scenarioId/" exact component={Info} />
          <Route path="/:scenarioId/:role/" exact component={Info} />
          <Route path="/:scenarioId/:role/:tab" exact component={Info} />

          {/* 404 */}
          <Route component={NoPage} />
        </Switch>
      </HashRouter>
    )
  }
}
