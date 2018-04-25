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
  constructor(props) {
    super(props)

    this.state = {
      remainingCharacterCount: 512
    }
  }

  updateCharacterCount = e => {
    const { value } = e.target

    this.setState({
      remainingCharacterCount: 512 - value.length
    })
  }

  render() {
    const { remainingCharacterCount } = this.state

    let confirmationPhotoInputObj = {
      labelPhrase: "Upload",
      labelIcon: faCloudUploadAlt,
      inputID: "photo",
      requiredField: true,
      disabledField: false
    }

    return (
      <div className="page flow-page doer-confirmation-page">
        <Header />
        
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
          <section className="session-settings">
            <header className="settings-header">
              <h3>Include a message</h3>
            </header>
            <article className="card input-card message-card">
              <textarea
                placeholder="Add a message"
                maxLength="512"
                rows="3"
                onChange={e => this.updateCharacterCount(e)}
              />
              <div className="remaining-character-count">
                {remainingCharacterCount} characters left
              </div>
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
