/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faCheck, faMapMarkerAlt } from "@fortawesome/fontawesome-free-solid"

// Local components
import MiniMap from "./MiniMap"
import Footer from "../components/Footer"

// Local JS
import Database from "../resources/Database"
import {
  getUrlPiece,
  toFirstCap,
  moneyfy,
  gradientStyle
} from "../resources/Util"
/*** [end of imports] ***/

export default class ScenarioContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lastUrlSegment: getUrlPiece(),
      lat: this.props.attributes.doerlat,
      lon: this.props.attributes.doerlon,
      subtasks: null,
      mapRefresh: 5000, // Every 5 seconds check for map pin changes
      activeTab: this.props.activeTab || "Overview"
    }
  }

  getPins = () => {
    const { id } = this.props
    const { mapRefresh } = this.state

    setTimeout(() => {
      Database.getScenario({ id: id })
        .then(result => {
          const { doerlat, doerlon } = result.body.data.attributes
          this.setState({
            lat: doerlat,
            lon: doerlon
          })
          return [{ doerlat, doerlon }]
        })
        .catch(error => {
          // console.error("Error getting scenarios:", error)
          const { doerlat, doerlon } = this.props.attributes
          this.setState({
            lat: doerlat,
            lon: doerlon
          })
          return [{ doerlat, doerlon }]
        })
    }, mapRefresh)
  }
  getCheckboxes = () => {
    Database.getSubtasks({ id: this.props.scenarioId })
      .then(result => {
        // console.log("Subtasks found:", result)
        this.setState({
          subtasks: null
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          subtasks: null
        })
      })
  }
  changeTab = tabName => {
    this.setState({
      activeTab: tabName
    })
  }

  render() {
    const { activeTab } = this.state
    const { attributes } = this.props
    const {
      event,
      image,
      donated,
      funding_goal,
      requester_firstname,
      requester_lastname,
      requesterlat,
      requesterlon,
      doerlat,
      doerlon,
      noun,
      verb,
      customMessage
    } = attributes

    let mapPos = {
      lat: requesterlat,
      lng: requesterlon
    }
    let doerPins = [
      {
        lat: doerlat,
        lng: doerlon
      }
    ]

    let fundingGoalSliderStyle = gradientStyle({
      dividend: donated,
      divisor: funding_goal,
      endColor: "#fff"
    })

    return (
      <div className="scenario-content-wrap">
        <div className="scenario-content-image-wrap">
          <img src={image} alt={event} className="scenario-content-image" />
          <p className="scenario-image-caption">{event}</p>
        </div>

        <header className="scenario-content-header">
          <h4 className="scenario-title">
            {`${toFirstCap(verb)} ${toFirstCap(requester_firstname)}'s ${noun}`}
          </h4>
        </header>

        <section className="scenario-content-body">
          <ul className="tab-list">
            <li
              className={
                activeTab === "Overview"
                  ? "tab-link active"
                  : "tab-link"
              }
              onClick={() => this.changeTab("Overview")}
            >
              Overview
            </li>
            <li
              className={
                activeTab === "Instructions"
                  ? "tab-link active"
                  : "tab-link"
              }
              onClick={() => this.changeTab("Instructions")}
            >
              Instructions
            </li>
            <li
              className={
                activeTab === "Updates"
                  ? "tab-link active"
                  : "tab-link"
              }
              onClick={() => this.changeTab("Updates")}
            >
              Updates
            </li>
          </ul>
          <div className="tab-wrap scenario-tab-wrap">
            <article
              className={
                activeTab === "Overview"
                  ? "tab active"
                  : "tab"
              }
            >
              <section className="scenario-subheader">
                <div className="user-info">
                  <figure className="user-avatar" />
                  <div className="user-name">
                    {requester_firstname} {requester_lastname}
                  </div>
                  <div className="user-verified-status">
                    <Icon icon={faCheck} />
                  </div>
                </div>
                <div className="scenario-location">
                  <div className="location-name">Pearlington, Louisiana</div>
                  <div className="location-icon">
                    <Icon icon={faMapMarkerAlt} />
                  </div>
                </div>
              </section>

              <div className="scenario-description">
                {customMessage ||
                  "My roof was blown off in Hurricane Katrina. I need your help to fix it. Can have more info here to help tell the story and convince people to do this."}
              </div>

              <section className="scenario-tags">
                <div className="scenario-event-location">{event}</div>
                <div className="scenario-severity">Urgent</div>
              </section>
            </article>
            <article
              className={
                activeTab === "Instructions"
                  ? "tab active"
                  : "tab"
              }
            >
              <header className="job-status-header">
                <h4>
                  <span className="job-status-label">Job Status: </span>
                  <span>Workers arriving on site</span>
                </h4>
              </header>

              <div className="card job-card">
                <div className="card-label">Materials are on site</div>
                <div className="done-job-icon">
                  <Icon icon={faCheck} />
                </div>
              </div>
              <div className="card job-card">
                <div className="card-label">Do you have tools?</div>
                <button className="btn btn-lite do-job-btn">Yes</button>
              </div>
            </article>
            <article
              className={
                activeTab === "Updates" ? "tab active" : "tab"
              }
            >
              Updates
            </article>
          </div>
        </section>

        <MiniMap initialCenter={mapPos} pins={doerPins} />

        <footer className="scenario-footer">
          <div className="funding-goal-label">
            <span>To fully fund </span>
            <span className="dollar-amount">
              {moneyfy(funding_goal - donated)}
            </span>
          </div>
          <div
            className="funding-progress-slider"
            id={`${event}_fundingGoal`}
            style={fundingGoalSliderStyle}
          />
          <div className="funding-goal-label">
            Target{" "}
            <span className="dollar-amount">{moneyfy(funding_goal)}</span>
          </div>
          <div className="funding-goal-summary">
            450 donators, {moneyfy(donated)} donated
          </div>
        </footer>
        <Footer>
          <Link to="/feed/doer" className="btn footer-btn feed-btn">
            Start Job
          </Link>
        </Footer>
      </div>
    )
  }
}
