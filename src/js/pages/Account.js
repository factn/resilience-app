/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"
import SessionSetting from "../components/SessionSetting"
import SessionCard from "../components/SessionCard"

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
          <SessionSetting className="facebook-setting">
            <Link className="btn facebook-connect-btn" to="/account/confirm-facebook">
              Sign up with Facebook
            </Link>
          </SessionSetting>

          <div className="or-line">or enter your details</div>

          <SessionSetting className="name-setting" headerLabel="Name">
            <SessionCard className="input-card name-card">
              <input type="text" placeholder="Enter a name" id="firstname" />
            </SessionCard>
          </SessionSetting>

          <SessionSetting className="email-setting" headerLabel="Email">
            <SessionCard className="input-card email-card">
              <input type="email" placeholder="Enter your email" id="email" />
            </SessionCard>
          </SessionSetting>

          <SessionSetting className="password-setting" headerLabel="Password">
            <SessionCard className="input-card password-card">
              <input type="password" placeholder="Choose a password" id="password" />
            </SessionCard>

            <SessionCard className="input-card password-confirm-card">
              <input type="password" placeholder="Confirm your password" id="password_confirmation" />
            </SessionCard>
          </SessionSetting>

          <SessionSetting headerLabel="Add a photo">
            <Image />
          </SessionSetting>
        </Main>

        <Footer>
          <div className="button-label">Create your profile</div>
          <Submit {...buttonObj} />
        </Footer>
      </div>
    )
  }
}
