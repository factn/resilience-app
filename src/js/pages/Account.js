/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import {
  faCamera,
  faCloudUploadAlt,
  faImage
} from "@fortawesome/fontawesome-free-solid"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"

// Input
import File from "../components/inputs/File"
/*** [end of imports] ***/

export default class Account extends Component {
  render() {
    let avatarInputObj = {
      labelPhrase: "Upload",
      labelIcon: faCloudUploadAlt,
      inputID: "photo",
      requiredField: true,
      disabledField: false
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
              <input type="text" placeholder="Enter a name" />
            </article>
          </section>
          <section className="session-settings email-settings">
            <header className="settings-header">
              <h3>Email</h3>
            </header>
            <article className="card input-card email-card">
              <input type="email" placeholder="Enter your email" />
            </article>
          </section>
          <section className="session-settings password-settings">
            <header className="settings-header">
              <h3>Password</h3>
            </header>
            <article className="card input-card password-card">
              <input type="password" placeholder="Choose a password" />
            </article>
            <article className="card input-card password-confirm-card">
              <input type="password" placeholder="Confirm your password" />
            </article>
          </section>
          <section className="session-settings">
            <header className="settings-header">
              <h3>Add a photo</h3>
            </header>
            <article className="photo-card">
              <div className="photo-icon">
                <Icon icon={faImage} />
              </div>
              <File inputObj={avatarInputObj} />
              <label
                className="input-label btn btn-label second-label"
                htmlFor="requester_photo"
              >
                <span className="input-label-phrase">Take Photo</span>
                <Icon icon={faCamera} className="input-label-icon" />
              </label>
            </article>
          </section>
        </Main>
        <Footer>
          <div className="button-label">Create your profile</div>
          <Link to="/profile" className="btn footer-btn feed-btn">
            Submit
          </Link>
        </Footer>
      </div>
    )
  }
}
