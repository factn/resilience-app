/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faFacebook } from "@fortawesome/fontawesome-free-brands"

// Page wrapper
import Page from "./Page"

// Page elements
import SessionSetting from "../components/SessionSetting"

// Logo image
import logo from "../../img/logo.svg"
/*** [end of imports] ***/

export default class FBConfirm extends Component {
  render() {
    const header = (
      <Fragment>
        <div className="facebook-icon">
          <Icon icon={faFacebook} />
        </div>
        <h2>Confirm Login</h2>
      </Fragment>
    )

    return (
      <Page className="flow-page confirm-facebook-page" header={header}>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="WAGL" />
          </Link>
        </div>
        <div className="or-line">Create your profile using your Facebook login</div>
        <SessionSetting className="facebook-setting">
          <Link className="btn facebook-connect-btn" to="/account/verify-facebook">
            Continue
          </Link>
        </SessionSetting>
      </Page>
    )
  }
}
