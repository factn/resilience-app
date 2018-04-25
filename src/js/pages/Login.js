/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import createHistory from "history/createBrowserHistory"
import Icon from "@fortawesome/react-fontawesome"
import { faAt, faKey, faSignInAlt } from "@fortawesome/fontawesome-free-solid"

// Components
import Page from "./Page"
import Main from "../components/Main"
import Form from "../components/Form"
import Loader from "../components/Loader"

// Local JS Utilities
import Database from "../resources/Database"
/*** [end of imports] ***/

const history = createHistory()

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonPressed: false
    }
  }

  submitLogin = params => {
    let json = {
      email: params.email,
      password: params.password
    }

    this.setState({
      buttonPressed: true
    })

    Database.attemptLogin(json)
      .then(result => {
        // console.log("Login complete:", result)

        history.push("/")
      })
      .catch(error => {
        // console.error("Error getting user:", error)
      })
  }

  render() {
    return (
      <Page clas="flow-page requester-flow-page">
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

            <button
              className="btn submit-btn neutral-response"
              onClick={() => {
                if (!this.state.buttonPressed) {
                  this.submitLogin({
                    email: document
                      .getElementById("login_email")
                      .value.toString(),
                    password: document
                      .getElementById("login_password")
                      .value.toString()
                  })
                }
              }}
            >
              {this.state.buttonPressed ? (
                <Loader />
              ) : (
                <Fragment>
                  <span className="button-label">Sign In </span>
                  <Icon icon={faSignInAlt} className="button-icon" />
                </Fragment>
              )}
            </button>
          </Form>
        </Main>
      </Page>
    )
  }
}
