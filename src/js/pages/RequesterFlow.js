/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
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
import Image from "../components/inputs/Image"

// Local JS Utilities
import Database from "../resources/Database"
import { getBase64 } from "../resources/Util"
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
  submitRequest = params => {
    let imageString = getBase64(params.image)

    let json = {
      data: {
        type: "scenarios",
        attributes: {
          funding_goal: "1000",
          image: imageString
        },
        relationships: {
          event: {
            data: {
              type: "events",
              id: "2" // "Hurricane Katrina", will be based of of title field
            }
          },
          noun: {
            data: {
              type: "nouns",
              id: "5" // "roof", will be based of of title field
            }
          },
          verb: {
            data: {
              type: "verbs",
              id: "5" // "fix", will be based of of title field
            }
          },
          requester: {
            data: {
              type: "users",
              id: "1" // current user, right now, defaulted
            }
          },
          doer: {
            data: {
              type: "users",
              id: "1" // will be admin until chosen
            }
          }
        }
      }
    }

    Database.createScenario(json)
      .then(result => {
        console.log("Scenario successfully created:", result)
        // go to /newID/requester
      })
      .catch(error => {
        // console.error("Error creating scenario:", error)
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
              <input type="text" placeholder="Enter event name" id="event" />
            </article>
          </section>
          <section className="session-settings">
            <header className="settings-header">
              <h3>What help do you need?</h3>
            </header>
            <article className="card input-card title-card">
              <input
                type="text"
                placeholder="Enter a title"
                defaultValue="Fix my roof"
              />
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
          <button
            className="btn footer-btn feed-btn"
            onClick={() =>
              this.submitRequest({
                event: document.getElementById("event").value,
                image: document.getElementById("photo")
              })
            }
          >
            Submit
          </button>
        </Footer>
      </Page>
    )
  }
}
