/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"

// Inputs
import Image from "../components/inputs/Image"
import Submit from "../components/inputs/Submit"

// Local JS Utilities
import Database from "../resources/Database"
import { getBase64 } from "../resources/Util"
/*** [end of imports] ***/

export default class Account extends Component {
  createProfile = params => {
    let imageString = getBase64(params.avatar)

    const json = {
      data: {
        type: "users",
        attributes: {
          firstname: params.firstname,
          email: params.email,
          avatar: imageString,
          password: params.password,
          password_confirmation: params.password_confirmation
        }
      }
    }

    Database.createUser(json)
      .then(result => {
        // console.log("User successfully created:", result)
        Cookies.set("userId", result.body.data.id)
        this.props.history.push("/profile")
      })
      .catch(error => {
        // console.error("Error creating user:", error)
      })
  }

  render() {
    let buttonObj = {
      labelPhrase: "Create Account",
      clas: "footer-btn user-create-btn",
      onSubmit: this.createProfile,
      onSubmitParams: {
        firstname: "firstname",
        email: "email",
        password: "password",
        password_confirmation: "password_confirmation",
        avatar: "photo"
      }
    }

    return (
      <div className="page flow-page create-account-page">
        <Header>
          <h2>Create your profile</h2>
        </Header>

        <Main>
          <section className="session-settings facebook-setting">
            <Link
              className="btn facebook-connect-btn"
              to="/account/confirm-facebook"
            >
              Sign up with Facebook
            </Link>
          </section>
          <div className="or-line">or enter your details</div>
          <section className="session-settings name-settings">
            <header className="settings-header">
              <h3>Name</h3>
            </header>
            <article className="card input-card name-card">
              <input type="text" placeholder="Enter a name" id="firstname" />
            </article>
          </section>
          <section className="session-settings email-settings">
            <header className="settings-header">
              <h3>Email</h3>
            </header>
            <article className="card input-card email-card">
              <input type="email" placeholder="Enter your email" id="email" />
            </article>
          </section>
          <section className="session-settings password-settings">
            <header className="settings-header">
              <h3>Password</h3>
            </header>
            <article className="card input-card password-card">
              <input
                type="password"
                placeholder="Choose a password"
                id="password"
              />
            </article>
            <article className="card input-card password-confirm-card">
              <input
                type="password"
                placeholder="Confirm your password"
                id="password_confirmation"
              />
            </article>
          </section>
          <section className="session-settings">
            <header className="settings-header">
              <h3>Add a photo</h3>
            </header>
            <Image />
          </section>
        </Main>

        <Footer>
          <div className="button-label">Create your profile</div>
          <Submit {...buttonObj} />
        </Footer>
      </div>
    )
  }
}
