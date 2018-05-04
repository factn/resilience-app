/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
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
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: this.props.loggedIn || true,
      userId: Cookies.get("userId") || 1
    }
  }
  render() {
    const { loggedIn, userId } = this.state

    return (
      <header className="app-header">
        {this.props.children ||
          (loggedIn ? (
            <Fragment>
              <NavMenu userId={userId} />
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="WAGL" />
                </Link>
              </div>
              <div className="missions-btn">
                <Link to="/missions">
                  <Icon icon={faBullseye} />
                </Link>
              </div>
            </Fragment>
          ) : (
            <div className="login-link">
              <Link className="bright-link" to="/login">
                Login
              </Link>
              <span> / </span>
              <Link className="bright-link" to="/account">
                Sign up
              </Link>
            </div>
          ))}
      </header>
    )
  }
}
