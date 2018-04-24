/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faMapMarkerAlt,
  faArrowCircleUp,
  faEllipsisH
} from "@fortawesome/fontawesome-free-solid"

// Local components
import MiniMap from "./MiniMap"
import Footer from "../components/Footer"

// Local JS
import Database from "../resources/Database"
import { toFirstCap, moneyfy, gradientStyle } from "../resources/Util"
/*** [end of imports] ***/

export default class ScenarioContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lat: this.props.attributes.doerlat,
      lon: this.props.attributes.doerlon,
      subtasks: null,
      mapRefresh: 5000, // Every 5 seconds check for map pin changes
      activeTab: this.props.tab || "Overview"
    }
  }

  getBackLink = () => {
    const { role } = this.props

    if (role === "donator" || role === "doer" || role === "verifer")
      return `/feed/${role}`
    else if (role === "requester") return "/requester"
    else return "/"
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
  callToActionBtn = () => {
    const { role } = this.props

    if (role === "donator") {
      return (
        <Link to="/feed/donator" className="btn footer-btn feed-btn">
          Donate
        </Link>
      )
    } else if (role === "doer") {
      return (
        <Link to="/feed/doer" className="btn footer-btn feed-btn">
          Start Mission
        </Link>
      )
    } else if (role === "verifer") {
      return (
        <Link to="/feed/verifier" className="btn footer-btn feed-btn">
          Verify
        </Link>
      )
    } else if (role === "requester") {
      return (
        <Link to="/missions" className="btn footer-btn feed-btn">
          Edit Mission
        </Link>
      )
    } else {
      return (
        <Link to="/missions" className="btn footer-btn feed-btn">
          Share
        </Link>
      )
    }
  }
  tabs = () => {
    const { role } = this.props
    const { activeTab } = this.state

    if (role === "donator" || role === "info" || role === "requester") {
      return (
        <ul className="tab-list">
          <li
            className={
              activeTab === "Overview" ? "tab-link active" : "tab-link"
            }
            onClick={() => this.changeTab("Overview")}
          >
            Overview
          </li>
          <li
            className={activeTab === "Costs" ? "tab-link active" : "tab-link"}
            onClick={() => this.changeTab("Costs")}
          >
            Costs
          </li>
          <li
            className={
              activeTab === "Verifiers" ? "tab-link active" : "tab-link"
            }
            onClick={() => this.changeTab("Verifiers")}
          >
            Verifiers
          </li>
        </ul>
      )
    } else if (role === "doer" || role === "verifier") {
      return (
        <ul className="tab-list">
          <li
            className={
              activeTab === "Overview" ? "tab-link active" : "tab-link"
            }
            onClick={() => this.changeTab("Overview")}
          >
            Overview
          </li>
          <li
            className={
              activeTab === "Instructions" ? "tab-link active" : "tab-link"
            }
            onClick={() => this.changeTab("Instructions")}
          >
            Instructions
          </li>
          <li
            className={activeTab === "Updates" ? "tab-link active" : "tab-link"}
            onClick={() => this.changeTab("Updates")}
          >
            Updates
          </li>
        </ul>
      )
    }
  }

  render() {
    const { activeTab } = this.state
    const { attributes, role } = this.props
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

    console.log(this.props);
    

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
      <div className={`scenario-content-wrap ${role}-scenario-content`}>
        {role === "requester" && (
          <header className="scenario-content-superheader">
            <h3 className="mission-status-header">
              <span className="mission-status-label">Mission Status: </span>
              <span className="mission-status">Being verified</span>
            </h3>
            <ul className="verification-list">
              <li className="verification">
                <div className="verification-label">
                  Location is in Pearlington, Mississippi
                </div>
                <div className="verification-status">
                  <span className="status-name">Verified</span>
                  <span className="status-icon verified">
                    <Icon icon={faCheck} />
                  </span>
                </div>
              </li>
              <li className="verification">
                <div className="verification-label">
                  Verification that roof needs fixing
                </div>
                <div className="verification-status">
                  <span className="status-name">Pending</span>
                  <span className="status-icon">
                    <Icon icon={faEllipsisH} />
                  </span>
                </div>
              </li>
            </ul>
          </header>
        )}

        <figure className="scenario-content-image-wrap">
          <img src={image} alt={event} className="scenario-content-image" />
        </figure>

        <Link className="btn back-btn" to={this.getBackLink()}>
          <Icon icon={faArrowCircleUp} />
        </Link>

        <header className="scenario-content-header">
          <h4 className="scenario-title">
            {`${toFirstCap(verb)} ${toFirstCap(requester_firstname)}'s ${noun}`}
          </h4>
        </header>

        <section className="scenario-content-body">
          {this.tabs()}
          <div className="tab-wrap scenario-tab-wrap">
            <article
              className={activeTab === "Overview" ? "tab active" : "tab"}
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
              className={activeTab === "Instructions" ? "tab active" : "tab"}
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
            <article className={activeTab === "Updates" ? "tab active" : "tab"}>
              Updates
            </article>
            <article className={activeTab === "Costs" ? "tab active" : "tab"}>
              Costs
            </article>
            <article
              className={activeTab === "Verifiers" ? "tab active" : "tab"}
            >
              Verifiers
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
        <Footer>{this.callToActionBtn()}</Footer>
      </div>
    )
  }
}
