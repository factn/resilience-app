/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import Cookies from "js-cookie"
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

    // Database.attemptLogin(json)
    //   .then(result => {
    //     // console.log("Login complete:", result)

    //     this.setUserCookie(result)
    //   })
    //   .catch(error => {
    //     // console.error("Error getting user:", error)
    //   })
  }
  setUserCookie = userId => {
    Cookies.set("userId", userId)
    history.push("/")
    window.location = "/"
  }

  render() {
    return (
      <Page clas="flow-page login-page">
        <Main>
          <section className="user-select-wrap">
            <button
              className="btn user-btn"
              onClick={() => this.setUserCookie("1")}
            >
              User #1
            </button>
            <button
              className="btn user-btn"
              onClick={() => this.setUserCookie("2")}
            >
              User #2
            </button>
            <button
              className="btn user-btn"
              onClick={() => this.setUserCookie("3")}
            >
              User #3
            </button>
            <button
              className="btn user-btn"
              onClick={() => this.setUserCookie("4")}
            >
              User #4
            </button>
          </section>

          {/* This is the real login form, commenting for now, but it will go back to this
          
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
          </Form> */}
        </Main>
      </Page>
    )
  }
}
