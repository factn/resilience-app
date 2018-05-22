/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"
import Icon from "@fortawesome/react-fontawesome"
import { faAt, faKey } from "@fortawesome/fontawesome-free-solid"

// Components
import Page from "./Page"
import Main from "../components/Main"
import Form from "../components/Form"
import Submit from "../components/input/Submit"

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
          // console.log("Login complete:", result)

          this.setUserCookie(result)
        })
        .catch(error => {
          // console.error("Error getting user:", error)
        })
    }
  }
  setUserCookie = userId => {
    Cookies.set("userId", userId)
    this.props.history.push("/")
  }

  render() {
    let buttonObj = {
      labelPhrase: "Sign In",
      clas: "neutral-response",
      onSubmit: this.submitLogin,
      onSubmitParams: {
        login_email: "login_email",
        login_password: "login_password"
      }
    }

    return (
      <Page clas="flow-page login-page">
        <Main>
          <Form>
            <div className="input-wrap">
              <label className="input-label" htmlFor="login_email">
                <span className="input-label-phrase">Email</span>
                <Icon icon={faAt} className="input-label-icon" />
              </label>
              <input className="form-input" type="email" id="login_email" />
            </div>

            <div className="input-wrap">
              <label className="input-label" htmlFor="login_password">
                <span className="input-label-phrase">Password</span>
                <Icon icon={faKey} className="input-label-icon" />
              </label>
              <input
                className="form-input"
                type="password"
                id="login_password"
              />
            </div>

            <Submit {...buttonObj} />
          </Form>
        </Main>
      </Page>
    )
  }
}
