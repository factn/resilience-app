/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { HashRouter, Route, Switch } from "react-router-dom"
import Cookies from "js-cookie"

// Styles
import "./style.sass"

// Pages
//  - Home
import Home from "./js/pages/Home"

//  - Flows
import DonorFlow from "./js/pages/DonorFlow"
import DoerFlow from "./js/pages/DoerFlow"
import Confirmation from "./js/pages/Confirmation"
import RequesterFlow from "./js/pages/RequesterFlow"
import Feed from "./js/pages/Feed"

//  - Account creation
import Account from "./js/pages/Account"

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
          <Route path="/donor" component={DonorFlow} />
          <Route path="/doer" exact component={DoerFlow} />
          <Route path="/:role/confirmation" exact component={Confirmation} />
          <Route path="/:scenario_id/:role/confirmation" exact component={Confirmation} />
          <Route path="/:scenario_id/:role/confirmation/:verb/:noun" exact component={Confirmation} />
          <Route path="/requester" component={RequesterFlow} />
          <Route path="/feed/:type" component={Feed} />

          {/* Account */}
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/reputation/:user_id" exact component={Reputation} />
          <Route path="/account" component={Account} />

          {/* Mission control */}
          <Route path="/missions" exact component={MissionControl} />
          <Route path="/missions/:role" exact component={MissionControl} />
          <Route path="/missions/:role/:tab" exact component={MissionControl} />

          {/* Scenario full-page */}
          <Route path="/:scenario_id/" exact component={Info} />
          <Route path="/:scenario_id/:role/" exact component={Info} />
          <Route path="/:scenario_id/:role/:tab" exact component={Info} />

          {/* 404 */}
          <Route component={NoPage} />
        </Switch>
      </HashRouter>
    )
  }
}
