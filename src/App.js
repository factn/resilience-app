/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { Provider } from "react-redux"

import Cookies from "js-cookie"

import { store, history } from "./js/store/Store"

// Styles
import "./style.sass"
// Pages
//  - Home
import Home from "./js/pages/Home"

// Requester
import RequestCreate from "./js/pages/RequestCreate"

//  - Flows
import DonorFlow from "./js/pages/DonorFlow"
import RequesterFlow from "./js/pages/RequesterFlow"
import Feed from "./js/pages/Feed"
import Confirmation from "./js/pages/Confirmation"
import Payment from "./js/pages/Payment"

//  - Account creation
import Account from "./js/pages/Account"

//  - Account
import Login from "./js/pages/Login"
import SignUp from "./js/pages/Signup"
import Profile from "./js/pages/Profile"
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
      <Provider store={store}>
        <Router>
          <Switch>
            {/* Home */}
            <Route path="/" exact component={Home} />

            {/* Flows */}
            <Route path="/request/create" component={RequestCreate} />

            <Route path="/donor" component={DonorFlow} />
            <Route path="/requester" component={RequesterFlow} />
            <Route path="/feed/:type" component={Feed} />
            <Route path="/:role/confirmation" exact component={Confirmation} />
            <Route path="/:scenario_id/:role/confirmation" exact component={Confirmation} />
            <Route
              path="/:scenario_id/:role/confirmation/:child_scenario_id"
              exact
              component={Confirmation}
            />
            <Route path="/:scenario_id/payment" component={Payment} />

            {/* Account */}
            <Route path="/login" component={Login} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/:user_id" exact component={Profile} />
            <Route path="/account" component={Account} />
            <Route path="/signup" component={SignUp} />

            {/* Mission control */}
            <Route path="/missions" exact component={MissionControl} />
            <Route path="/missions/:role" exact component={MissionControl} />
            <Route path="/missions/:role/:tab" exact component={MissionControl} />

            {/* Scenario full-page */}
            <Route path="/:scenario_id/" exact component={Info} />
            <Route path="/:scenario_id/:role/" exact component={Info} />

            {/* 404 */}
            <Route component={NoPage} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
