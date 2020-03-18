/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"

// Page wrapper
import Page from "./Page"

// Local JS Utilities
import Database from "../resources/Database"
import { getBase64 } from "../resources/Util"

// Images
import hon3y from "../../img/hon3y.png"
/*** [end of imports] ***/

export default class Account extends Component {
  createProfile = params => {
    let imageString = getBase64(params.avatar)

    const json = {
      data: {
        type: "users",
        attributes: {
          firstname: params.firstname || "",
          email: params.email || "",
          avatar: imageString,
          password: params.password || "password",
          password_confirmation: params.password_confirmation || "password"
        }
      }
    }

    Database.createUser(json)
      .then(result => {
        Cookies.set("userId", result.body.data.id)
        this.props.history.push("/profile")
      })
      .catch(error => {})
  }

  render() {
    return (
      <Page className="create-account-page">
        <section className="account-body">
          <div className="logo-area">
            <h3 className="call-to-action-title call-to-action-title-1">Sign up with</h3>
            <img className="j4r-logo-large" src={hon3y} alt="J4R!" />
            <h4 className="call-to-action-title call-to-action-title-2">Create your profile in J4R!</h4>
          </div>
          <div className="card j4r-link-card">
            <div className="j4r-logo-wrap">
              <img className="j4r-logo-small" src={hon3y} alt="J4R!" />
            </div>
            <div className="j4r-link-flex-item">J4R!</div>
            <div className="sign-up-btn-wrap">
              <a className="btn sign-up-btn" href="http://j4r-uat.herokuapp.com/permissions/">
                Sign up
              </a>
            </div>
          </div>
        </section>
      </Page>
    )
  }
}
