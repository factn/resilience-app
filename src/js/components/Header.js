/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faBullseye } from "@fortawesome/fontawesome-free-solid"

// Components
import NavMenu from "./NavMenu"

// Logo image
import logo from "../../img/logo.svg"
/*** [end of imports] ***/

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loggedIn: this.props.loggedIn || true,
      userId: this.props.userId || 1
    }
  }
  render() {
    const { loggedIn , userId} = this.state

    return (
      <header className="app-header">
        {this.props.children ||
          (loggedIn ? (
            <Fragment>
              <NavMenu userId={userId} />
              <div className="logo">
                <a href="/">
                  <img src={logo} alt="WAGL" />
                </a>
              </div>
              <div className="missions-btn">
                <a href="/missions">
                  <Icon icon={faBullseye} />
                </a>
              </div>
            </Fragment>
          ) : (
            <div className="login-link">
              <a className="bright-link" href="/account">
                Login / Sign up
              </a>
            </div>
          ))}
      </header>
    )
  }
}
