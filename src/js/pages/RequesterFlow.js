/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import {
  faMapMarkerAlt,
  faChevronRight
} from "@fortawesome/fontawesome-free-solid"

// Page elements
import Page from "./Page"
import Main from "../components/Main"
import Footer from "../components/Footer"
import GoogleMaps from "../components/GoogleMaps"

// Input
import Image from "../components/inputs/Image"
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

    return (
      <Page clas="flow-page requester-flow-page">
        <Main>
          <section className="session-settings event-settings">
            <header className="settings-header">
              <h3>Event</h3>
            </header>
            <article className="card input-card event-card">
              <input type="text" placeholder="Enter event name" />
            </article>
          </section>
          <section className="session-settings">
            <header className="settings-header">
              <h3>What help do you need?</h3>
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
            <Image />
          </section>
          <section className="session-settings jobs-settings">
            <header className="settings-header">
              <h3>Tasks</h3>
            </header>
            <article className="card btn-card job-card">
              <h4 className="job-label">Get materials on site</h4>
              <div className="plus-amount">+10</div>
              <div className="take-action-icon">
                <Icon icon={faChevronRight} />
              </div>
            </article>
            <article className="card btn-card job-card">
              <h4 className="job-label">Get to location</h4>
              <div className="plus-amount">+5</div>
              <div className="take-action-icon">
                <Icon icon={faChevronRight} />
              </div>
            </article>
            <article className="card btn-card job-card">
              <h4 className="job-label">Cover roof</h4>
              <div className="plus-amount">+20</div>
              <div className="take-action-icon">
                <Icon icon={faChevronRight} />
              </div>
            </article>
            <article className="card btn-card job-card">
              <h4 className="job-label">Secure roof</h4>
              <div className="plus-amount">+15</div>
              <div className="take-action-icon">
                <Icon icon={faChevronRight} />
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
      </Page>
    )
  }
}
