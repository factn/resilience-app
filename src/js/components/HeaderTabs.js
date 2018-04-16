/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"

// Local JS
import { getUrlPiece } from "../resources/Util"
/*** [end of imports] ***/

export default class HeaderTabs extends Component {
  constructor(props) {
    super(props)

    this.tabs = {
      Donate: {
        title: "Donate",
        pageStyle: "home-tab",
        navMenu: true,
        path: "/donator"
      },
      Work: {
        title: "Work",
        pageStyle: "home-tab",
        navMenu: true,
        path: "/doer"
      },
      "Get Help": {
        title: "Get Help",
        pageStyle: "home-tab",
        navMenu: true,
        path: "/requester"
      },
      Verify: {
        title: "Verify",
        pageStyle: "home-tab",
        navMenu: true,
        path: "/verifier"
      }
    }
  }

  render() {
    return (
      <header className="scenario-header-tabs">
        <ul className="scenario-tab-list">
          {Object.entries(this.tabs).map(([key, val]) => (
            <li
              className={
                `/${getUrlPiece()}` === val.path
                  ? "scenario-tab active"
                  : "scenario-tab"
              }
              key={key}
            >
              <Link to={val.path}>{key}</Link>
            </li>
          ))}
        </ul>
      </header>
    )
  }
}
