/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faCloudUploadAlt, faImage, faCamera } from "@fortawesome/fontawesome-free-solid"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"

// Input
import File from "../components/inputs/File"
/*** [end of imports] ***/

export default class DoerConfirmation extends Component {
  render() {
    let confirmationPhotoInputObj = {
      labelPhrase: "Upload",
      labelIcon: faCloudUploadAlt,
      inputID: "photo",
      requiredField: true,
      disabledField: false
    }

    return (
      <div className="page flow-page doer-confirmation-page">
        <Header>
          <div className="login-link">
            <a className="bright-link" href="/account">
              Login / Sign up
            </a>
          </div>
        </Header>
        
        <Main>
          <section className="session-settings">
            <header className="settings-header">
              <h3>Add a photo</h3>
            </header>
            <article className="photo-card">
              <div className="photo-icon">
                <Icon icon={faImage} />
              </div>
              <File inputObj={confirmationPhotoInputObj} />
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
          <Link to="/feed/doer" className="btn footer-btn feed-btn">
            Send Confirmation
          </Link>
        </Footer>
      </div>
    )
  }
}
