/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faFacebook } from "@fortawesome/fontawesome-free-brands"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import SessionSetting from "../components/SessionSetting"

// Logo image
import logo from "../../img/logo.svg"
/*** [end of imports] ***/

export default class FBConfirm extends Component {
  render() {
    return (
      <div className="page flow-page confirm-facebook-page">
        <Header>
          <div className="facebook-icon">
            <Icon icon={faFacebook} />
          </div>
          <h2>Confirm Login</h2>
        </Header>

        <Main>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="WAGL" />
            </Link>
          </div>
          <div className="or-line">
            Create your profile using your Facebook login
          </div>
          <SessionSetting clas="facebook-setting">
            <Link
              className="btn facebook-connect-btn"
              to="/account/verify-facebook"
            >
              Continue
            </Link>
          </SessionSetting>
        </Main>
      </div>
    )
  }
}
