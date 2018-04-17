/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Route } from "react-router-dom"

// Styles
import "./App.scss"

// Pages
// 	Home Tabs
import DonatorTab from "./js/pages/DonatorTab"
import RequesterTab from "./js/pages/RequesterTab"
import DoerTab from "./js/pages/DoerTab"
import VerifierTab from "./js/pages/VerifierTab"

// 	Modals
import Account from "./js/pages/Account"
import EditAccount from "./js/pages/EditAccount"
import Login from "./js/pages/Login"
import Preferences from "./js/pages/Preferences"

// 	Flow Pages
import DonatorFlow from "./js/pages/DonatorFlow"
import RequesterFlow from "./js/pages/RequesterFlow"
import DoerFlow from "./js/pages/DoerFlow"
import VerifierFlow from "./js/pages/VerifierFlow"
import Thanks from "./js/pages/Thanks"
import Info from "./js/pages/Info"
/*** [end of imports] ***/

export default class App extends Component {
  render() {
    return (
      <div className="app">
        {/* Home tab */}
        <Route path="/" exact component={DonatorTab} />
        <Route path="/donator" component={DonatorTab} />
        <Route path="/requester" component={RequesterTab} />
        <Route path="/doer" component={DoerTab} />
        <Route path="/verifier" component={VerifierTab} />

        {/* Modals */}
        <Route path="/account" component={Account} />
        <Route path="/edit-account" component={EditAccount} />
        <Route path="/login" component={Login} />
        <Route path="/preferences" component={Preferences} />

        {/* Flows */}
        <Route path="/:scenarioId/donator" component={DonatorFlow} />
        <Route path="/:scenarioId/requester" component={RequesterFlow} />
        <Route path="/:scenarioId/doer" component={DoerFlow} />
        <Route path="/:scenarioId/verifier" component={VerifierFlow} />
        <Route path="/:scenarioId/info" component={Info} />
        <Route path="/:scenarioId/thanks" component={Thanks} />
      </div>
    )
  }
}
