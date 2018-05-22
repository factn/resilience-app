/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import Icon from "@fortawesome/react-fontawesome"
import { faBullseye } from "@fortawesome/fontawesome-free-solid"

// Components
import NavMenu from "./NavMenu"

// Logo image
import logo from "../../img/logo.svg"
/*** [end of imports] ***/

export default class Header extends Component {
  state = {
    loggedIn: this.props.loggedIn || true,
    userId: Cookies.get("userId") || 1
  }

  render() {
    const { loggedIn, userId } = this.state

    if (loggedIn) {
      return (
        <header className="app-header">
          <NavMenu userId={userId} />

          <Link className="logo" to="/">
            <img src={logo} alt="WAGL" />
          </Link>

          <Link className="missions-btn" to="/missions">
            <Icon icon={faBullseye} />
          </Link>
        </header>
      )
    } else {
      return (
        <header className="app-header">
          <div className="login-link">
            <Link className="bright-link" to="/login">
              Login
            </Link>
            <span> / </span>
            <Link className="bright-link" to="/account">
              Sign up
            </Link>
          </div>
        </header>
      )
    }
  }
}
