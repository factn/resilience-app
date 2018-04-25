/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import {
  faMapMarkerAlt,
  faCamera,
  faCloudUploadAlt,
  faImage
} from "@fortawesome/fontawesome-free-solid"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"
import GoogleMaps from "../components/GoogleMaps"

// Input
import File from "../components/inputs/File"
import Text from "../components/inputs/Text"
/*** [end of imports] ***/

export default class RequesterFlow extends Component {
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

    let requestPhotoInputObj = {
      labelPhrase: "Upload",
      labelIcon: faCloudUploadAlt,
      inputID: "photo",
      requiredField: true,
      disabledField: false
    }
    let eventTagInputObj = {
      inputType: "text",
      labelPhrase: "Event",
      inputID: "eventTag",
      requiredField: true,
      disabledField: false
    }
    let jobsInputObj = {
      inputType: "text",
      labelPhrase: "Jobs",
      inputID: "jobsTags",
      requiredField: true,
      disabledField: false
    }

    return (
      <div className="page flow-page requester-flow-page">
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
              <h3>What do you need?</h3>
            </header>
            <article className="card input-card title-card">
              <input type="text" placeholder="Enter a title" />
            </article>
            <article className="card input-card message-card">
              <textarea
                placeholder="Enter a description"
                maxLength="512"
                rows="3"
                onChange={e => this.updateCharacterCount(e)}
              />
              <div className="remaining-character-count">
                {remainingCharacterCount} characters left
              </div>
            </article>
          </section>
          <section className="session-settings">
            <header className="settings-header">
              <h3>Where is it?</h3>
            </header>
            <article className="card">
              <div className="input-with-icon-wrap">
                <label className="input-icon" htmlFor="requestLocation">
                  <Icon icon={faMapMarkerAlt} />
                </label>
                <input
                  className="input-field"
                  type="text"
                  id="requestLocation"
                  placeholder="Enter address"
                />
              </div>
              <GoogleMaps />
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
              <File inputObj={requestPhotoInputObj} />
              <label
                className="input-label btn btn-label second-label"
                htmlFor="requester_photo"
              >
                <span className="input-label-phrase">Take Photo</span>
                <Icon icon={faCamera} className="input-label-icon" />
              </label>
            </article>
          </section>
          <section className="event-settings">
            <header className="settings-header">
              <h3>Event tag</h3>
            </header>
            <article className="card event-card">
              <Text inputObj={eventTagInputObj} />
            </article>
          </section>
          <section className="jobs-settings">
            <header className="settings-header">
              <h3>What jobs do you need done?</h3>
            </header>
            <article className="card jobs-card">
              <Text inputObj={jobsInputObj} />
              <div className="tag-wrap">
                <ul className="tag-list">
                  <li className="tag inactive-tag">#Painting</li>
                  <li className="tag inactive-tag">#Roofing</li>
                  <li className="tag inactive-tag">#Transport</li>
                  <li className="tag inactive-tag">#Coding</li>
                  <li className="tag inactive-tag">#FirstAid</li>
                  <li className="tag inactive-tag">#Childcare</li>
                </ul>
              </div>
            </article>
          </section>
        </Main>
        <Footer>
          <div className="button-label">Post your request</div>
          <Link to="/1/requester" className="btn footer-btn feed-btn">
            Submit
          </Link>
        </Footer>
      </div>
    )
  }
}
