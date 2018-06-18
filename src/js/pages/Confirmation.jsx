/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"

// Page wrapper
import Page from "./Page"

// Page elements
import SessionSetting from "../components/SessionSetting"
import SessionCard from "../components/SessionCard"
import StarRating from "../components/StarRating"

// Inputs
import Image from "../components/inputs/Image"
import TextArea from "../components/inputs/TextArea"
import Submit from "../components/inputs/Submit"

// Local JS Utilities
import Database from "../resources/Database"
import { getBase64, toFirstCap } from "../resources/Util"

// Image
import stubImage from "../../img/stub-image.png"
import genericAvatar from "../../img/fb-profile.jpg"
/*** [end of imports] ***/

export default class Confirmation extends Component {
  state = {
    scenarioId: this.props.match.params.scenario_id || "1",
    childScenarioId: this.props.match.params.child_scenario_id || "1",
    role: this.props.match.params.role || "doer",
    currentUser: Cookies.get("userId") || "1",
    ratingColapsed: true
  }

  submitConfirmation = params => {
    const { scenarioId, childScenarioId, currentUser, role } = this.state
    const imageString = getBase64(params.image)

    const json = {
      data: {
        type: "vouches",
        attributes: {
          image: imageString || "",
          description: params.description || "",
          rating: params.rating || "1"
        },
        relationships: {
          scenario: {
            data: {
              type: "scenarios",
              id: childScenarioId || scenarioId
            }
          },
          verifier: {
            data: {
              type: "users",
              id: currentUser
            }
          }
        }
      }
    }

    Database.createVouch(json)
      .then(result => {
        this.props.history.push(`/${scenarioId}/${role}`)
      })
      .catch(error => {})
  }

  openRating = () => {
    this.setState({
      ratingColapsed: false
    })
  }

  render() {
    const { role, parentScenarioData, ratingColapsed } = this.state

    const requestFooter = (
      <Submit
        labelPhrase="Verify mission complete"
        clas="footer-btn feed-btn"
        onSubmit={this.submitConfirmation}
        onSubmitParams={{
          rating: "rating"
        }}
      />
    )

    const doerFooter = (
      <Submit
        labelPhrase="Verify mission complete"
        clas="footer-btn feed-btn"
        onSubmit={this.submitConfirmation}
        onSubmitParams={{
          description: "description",
          image: "photo"
        }}
      />
    )

    if (role === "requester") {
      return (
        <Page className="confirmation-page requester-confirmation-page" footer={requestFooter}>
          <header className="confirmation-header">
            {parentScenarioData && (
              <h4 className="scenario-title">{`${toFirstCap(parentScenarioData.attributes.verb)} ${toFirstCap(
                parentScenarioData.attributes.requester_firstname
              )}'s ${parentScenarioData.attributes.noun}`}</h4>
            )}
          </header>

          <section className="confirmation-body">
            <header className="job-status-header">
              <span className="job-status-label">Job Status: </span>
              <span className="job-status">All tasks completed</span>
            </header>

            <div className="message-box">
              <div className="message-user-wrap">
                <div
                  className="message-box-avatar"
                  style={{
                    backgroundImage: `url("${genericAvatar}")`
                  }}
                />
              </div>
              <div className="message-bubble-wrap">
                <div className="bubble">
                  <div className="vouch-image-wrap">
                    <img className="vouch-image" src={stubImage} alt="Proof" />
                  </div>
                  <div className="vouch-message">
                    <p>Hi Audrey,</p>
                    <p>
                      Your roof is fixed. You shouldn't have any problems with leaks now. Good luck with everything and
                      thanks for the delicious meals you gave us while we were working.
                    </p>
                    <p>John</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={ratingColapsed ? "rating-wrapper" : "rating-wrapper open"}>
              <button className="rating-opener" onClick={() => this.openRating()}>
                Rate Mission
              </button>
              <StarRating headerLabel="How well was it completed?" />
            </div>
          </section>
        </Page>
      )
    } else {
      return (
        <Page className="confirmation-page doer-confirmation-page flow-page" footer={doerFooter}>
          <h2 className="confirmation-header">Help us vouch for your work</h2>

          <SessionSetting headerLabel="Include a message">
            <SessionCard className="input-card message-card">
              <TextArea inputID="description" />
            </SessionCard>
          </SessionSetting>

          <SessionSetting headerLabel="Add a photo">
            <Image />
          </SessionSetting>
        </Page>
      )
    }
  }
}
