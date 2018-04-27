/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import createHistory from "history/createBrowserHistory"
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
import SessionSetting from "../components/SessionSetting"

// Inputs
import Image from "../components/inputs/Image"
import TextArea from "../components/inputs/TextArea"
import Submit from "../components/inputs/Submit"
import InputIconWrap from "../components/inputs/InputIconWrap"

// Local JS Utilities
import Database from "../resources/Database"
import { getBase64 } from "../resources/Util"
/*** [end of imports] ***/

const history = createHistory()

export default class RequesterFlow extends Component {
  submitRequest = params => {
    let imageString = getBase64(params.image)

    let json = {
      // No where to put address info, custom message, or tasks / jobs
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
              id: "2" // "Hurricane Katrina", or title field based off of `params.event`
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
        // console.log("Scenario successfully created:", result)
        history.push(`/${result.body.data.id}/requester`)
        window.location = `/${result.body.data.id}/requester`
      })
      .catch(error => {
        // console.error("Error creating scenario:", error)
      })
  }

  render() {
    let buttonObj = {
      labelPhrase: "Submit",
      clas: "footer-btn feed-btn",
      onSubmit: this.submitRequest,
      onSubmitParams: { event: "event", photo: "photo" }
    }
    let textareaObj = {
      id: "description"
    }

    return (
      <Page clas="flow-page requester-flow-page">
        <Main>
          <SessionSetting headerLabel="Event">
            <article className="card input-card event-card">
              <input type="text" placeholder="Enter event name" id="event" />
            </article>
          </SessionSetting>

          <SessionSetting headerLabel="What help do you need?">
            <article className="card input-card title-card">
              <input
                type="text"
                placeholder="Enter a title"
                defaultValue="Fix my roof"
              />
            </article>
            <article className="card input-card message-card">
              <TextArea {...textareaObj} />
            </article>
          </SessionSetting>

          <SessionSetting headerLabel="Where is it?">
            <article className="card">
              <InputIconWrap id="requestLocation" icon={faMapMarkerAlt}>
                <input
                  className="input-field"
                  type="text"
                  id="requestLocation"
                  placeholder="Enter address"
                />
              </InputIconWrap>
              <GoogleMaps />
            </article>
          </SessionSetting>

          <SessionSetting headerLabel="Add a photo">
            <Image />
          </SessionSetting>

          <SessionSetting headerLabel="Tasks" clas="jobs-settings">
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
          </SessionSetting>
        </Main>

        <Footer>
          <div className="button-label">Post your request</div>
          <Submit {...buttonObj} />
        </Footer>
      </Page>
    )
  }
}
