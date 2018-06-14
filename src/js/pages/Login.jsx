/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"

// Page wrapper
import Page from "./Page"

// Page elements
import Form from "../components/Form"
import Submit from "../components/inputs/Submit"
import SessionSetting from "../components/SessionSetting"
import SessionCard from "../components/SessionCard"

// Local JS Utilities
import Database from "../resources/Database"
/*** [end of imports] ***/

export default class Login extends Component {
  state = {
    buttonPressed: false
  }

  submitLogin = params => {
    if (!this.state.buttonPressed) {
      const json = {
        email: params.email,
        password: params.password
      }

      this.setState({
        buttonPressed: true
      })

      Database.attemptLogin(json)
        .then(result => {
          this.setUserCookie(result)
        })
        .catch(error => {})
    }
  }
  setUserCookie = userId => {
    Cookies.set("userId", userId)
    this.props.history.push("/")
  }

  render() {
    let buttonObj = {
      labelPhrase: "Sign In",
      clas: "footer-btn user-login-btn",
      onSubmit: this.submitLogin,
      onSubmitParams: {
        email: "username",
        password: "password"
      }
    }

    const footer = <Submit {...buttonObj} />

    return (
      <Page className="flow-page login-page" footer={footer}>
        <Form>
          <SessionSetting className="login-settings" headerLabel="Log In">
            <SessionCard className="input-card email-card">
              <input type="text" placeholder="Enter your email" id="username" />
            </SessionCard>

            <SessionCard className="input-card password-card">
              <input type="password" placeholder="Enter your password" id="password" />
            </SessionCard>
          </SessionSetting>
        </Form>
      </Page>
    )
  }
}
