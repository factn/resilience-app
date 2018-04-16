/*** IMPORTS ***/
// Module imports
import createHistory from "history/createBrowserHistory"

// Local JS
import Page from "./Page"

// Local JS Utilities
import Database from "../resources/Database"
/*** [end of imports] ***/

const history = createHistory()

export default class Login extends Page {
  constructor(props) {
    super(props)

    this.state = {
      pageStyle: "modal",
      title: "Login",
      navMenu: false,
      userId: 1
    }
    this.inputs = [
      {
        inputType: "email",
        inputID: "email",
        labelPhrase: "Email",
        labelIcon: "at",
        requiredField: true
      },
      {
        inputType: "password",
        inputID: "pw",
        labelPhrase: "Password",
        labelIcon: "key",
        requiredField: true
      },
      {
        inputType: "submit",
        labelPhrase: "Sign In",
        labelIcon: "sign-in-alt",
        onSubmit: this.submitLogin,
        onSubmitParams: { email: "login_email", password: "login_pw" },
        responseType: "neutral"
      }
    ]
  }

  submitLogin = params => {
    let json = {
      email: params.email,
      password: params.password
    }

    Database.attemptLogin(json)
      .then(result => {
        // console.log("Login complete:", result)

        history.push("/")
      })
      .catch(error => {
        // console.error("Error getting user:", error)
      })
  }
}
