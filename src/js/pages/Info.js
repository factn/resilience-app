/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { invalidateRequests } from "redux-bees"
import Icon from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faMapMarkerAlt,
  faArrowCircleUp,
  faEllipsisH
} from "@fortawesome/fontawesome-free-solid"

// Components
import Page from "./Page"
import Main from "../components/Main"
import Loader from "../components/Loader"
import MiniMap from "../components/MiniMap"
import Footer from "../components/Footer"
import Notification from "../components/Notification"

// Local JS Utilities
import Database from "../resources/Database"
import { toFirstCap, moneyfy, gradientStyle } from "../resources/Util"
/*** [end of imports] ***/

export default class Info extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scenarioId: this.props.match.params.scenarioId || 1,
      role: this.props.match.params.role || "info",
      tab: this.props.match.params.tab || "overview",
      scenarioData: null,
      childrenScenarioData: null,
      buttonOverride: false,
      materialsDone: null,
      transportDone: null,
      roofCovered: null,
      roofSecured: null,
      initialJobState: {},
      notificationScenarioId: null,
      notificationOpen: false,
      dataRefreshRate: 5000 // Every 5 seconds check for map pin changes
    }
  }

  componentDidMount = () => {
    this.checkScenarioUpdates()
  }
  checkScenarioUpdates = () => {
    const { dataRefreshRate, scenarioId } = this.state

    setInterval(() => {
      Database.getScenarioWithChildren({ id: scenarioId })
        .then(result => {
          // console.info("Success getting scenario:", result)

          this.setState({
            scenarioData: result.body.data
          })
          this.setChildrenScenarioData(
            result.body.data.relationships.children_scenario.data
          )

          invalidateRequests(Database.getScenario)
        })
        .catch(error => {
          // console.error("Error getting scenarios:", error)
          this.setState({
            scenarioData: null
          })
        })
    }, dataRefreshRate)
  }

  setChildrenScenarioData = list => {
    let childrenScenarioData = {}
    let completedChildren = 0

    for (let i = 0, l = list.length; i < l; i++) {
      childrenScenarioData[list[i].id] = {}
    }

    for (let id in childrenScenarioData) {
      Database.getScenarioWithProofs({ id: id })
        .then(result => {
          const { data } = result.body
          const { is_complete } = data.attributes
          let tmp = this.state.initialJobState

          // console.info("Success getting child scenario:", data)

          childrenScenarioData[id] = data
          completedChildren++

          if (typeof this.state.initialJobState[id] !== "undefined") {
            if (is_complete !== this.state.initialJobState[id]) {
              tmp[id] = is_complete
              this.setState({
                initialJobState: tmp,
                notificationOpen: true,
                notificationScenarioId: id
              })
            }
          } else {
            tmp[id] = is_complete
            this.setState({
              initialJobState: tmp
            })
          }
        })
        .catch(error => {
          // console.error("Error getting child scenario:", error)
        })
    }

    let checkCompletedChildren = setInterval(() => {
      if (completedChildren === 4) {
        clearInterval(checkCompletedChildren)

        this.setState({
          childrenScenarioData
        })
      }
    })
  }
  getBackLink = () => {
    const { role } = this.state

    if (role === "donator" || role === "doer" || role === "verifer")
      return `/feed/${role}`
    else if (role === "requester") return "/requester"
    else return "/"
  }
  changeTab = tab => {
    this.setState({
      tab
    })
  }
  callToActionBtn = () => {
    const {
      role,
      materialsDone,
      transportDone,
      roofCovered,
      roofSecured,
      scenarioId
    } = this.state

    if (role === "donator") {
      return (
        <Link to="/feed/donator" className="btn footer-btn feed-btn">
          Donate
        </Link>
      )
    } else if (role === "doer") {
      if (materialsDone) {
        if (transportDone) {
          if (roofCovered) {
            if (roofSecured) {
              return (
                <Link
                  to={`/${scenarioId}/doer/confirmation/fix/roof`}
                  className="btn footer-btn feed-btn"
                >
                  Complete Mission
                </Link>
              )
            } else {
              return (
                <Link
                  to={`/${scenarioId}/doer/confirmation/fix/roof`}
                  className="btn footer-btn feed-btn"
                >
                  Secure Roof
                </Link>
              )
            }
          } else {
            return (
              <Link
                to={`/${scenarioId}/doer/confirmation/patch/roof`}
                className="btn footer-btn feed-btn"
              >
                Cover Roof
              </Link>
            )
          }
        } else {
          return (
            <Link
              to={`/${scenarioId}/doer/confirmation/get/transportation`}
              className="btn footer-btn feed-btn"
            >
              Provide Transport
            </Link>
          )
        }
      } else {
        return (
          <Link
            to={`/${scenarioId}/doer/confirmation/get/materials`}
            className="btn footer-btn feed-btn"
          >
            Bring Materials
          </Link>
        )
      }
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
    const { role, tab } = this.state

    if (role === "donator" || role === "info" || role === "requester") {
      return (
        <ul className="tab-list">
          <li
            className={tab === "overview" ? "tab-link active" : "tab-link"}
            onClick={() => this.changeTab("overview")}
          >
            Overview
          </li>
          <li
            className={tab === "instructions" ? "tab-link active" : "tab-link"}
            onClick={() => this.changeTab("instructions")}
          >
            Instructions
          </li>
          <li
            className={tab === "verifiers" ? "tab-link active" : "tab-link"}
            onClick={() => this.changeTab("verifiers")}
          >
            Verifiers
          </li>
        </ul>
      )
    } else if (role === "doer" || role === "verifier") {
      return (
        <ul className="tab-list">
          <li
            className={tab === "overview" ? "tab-link active" : "tab-link"}
            onClick={() => this.changeTab("overview")}
          >
            Overview
          </li>
          <li
            className={tab === "instructions" ? "tab-link active" : "tab-link"}
            onClick={() => this.changeTab("instructions")}
          >
            Instructions
          </li>
          <li
            className={tab === "updates" ? "tab-link active" : "tab-link"}
            onClick={() => this.changeTab("updates")}
          >
            Updates
          </li>
        </ul>
      )
    }
  }
  jobs = () => {
    const { childrenScenarioData, buttonOverride } = this.state

    let hasShownDesc = false
    return (
      <Fragment>
        {childrenScenarioData &&
          Object.entries(childrenScenarioData).map(([key, childScenario]) => {
            const { noun, verb, is_complete } = childScenario.attributes
            let label,
              button,
              detailDesc = ""

            if (noun === "materials" && verb === "get") {
              if (is_complete) {
                label = "Materials on site"
                if (!buttonOverride) {
                  this.setState({
                    materialsDone: true,
                    buttonOverride: true
                  })
                }
              } else {
                label = "Can you bring materials?"
                detailDesc = "You'll need a 20ft square tarp and 8 zipties."
              }
            } else if (noun === "transportation" && verb === "get") {
              if (is_complete) {
                label = "Workers on site"
                if (!buttonOverride) {
                  this.setState({
                    transportDone: true,
                    buttonOverride: true
                  })
                }
              } else {
                label = "Can you provide transport?"
                detailDesc = "See the location on the map"
              }
            } else if (noun === "roof" && verb === "patch") {
              if (is_complete) {
                label = "Roof covered"
                if (!buttonOverride) {
                  this.setState({
                    roofCovered: true,
                    buttonOverride: true
                  })
                }
              } else {
                label = "Roof covered?"
                detailDesc =
                  "Ensure the tarp covers all areas and don't allow rain in."
              }
            } else if (noun === "roof" && verb === "fix") {
              if (is_complete) {
                label = "Roof fixed"
                if (!buttonOverride) {
                  this.setState({
                    roofSecured: true,
                    buttonOverride: true
                  })
                }
              } else {
                label = "Roof covering secured?"
                detailDesc =
                  "Ensure that the tarp is secured on all corners to protect against hurricane winds."
              }
            }

            if (detailDesc !== "") {
              if (hasShownDesc) {
                detailDesc = ""
              }
              hasShownDesc = true
            }

            if (is_complete) {
              button = (
                <div className="done-job-icon">
                  <Icon icon={faCheck} />
                </div>
              )
            } else {
              button = <button className="btn btn-lite do-job-btn">Yes</button>
            }

            return (
              <div className="card job-card" key={key}>
                <div className="card-label">{label}</div>
                {button}
                {detailDesc}
              </div>
            )
          })}
      </Fragment>
    )
  }

  render() {
    if (this.state.scenarioData) {
      const {
        scenarioId,
        scenarioData,
        role,
        tab,
        notificationOpen,
        notificationScenarioId
      } = this.state
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
        custom_message
      } = scenarioData.attributes

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
        <Page>
          <Notification
            open={notificationOpen}
            parentId={scenarioId}
            childId={notificationScenarioId}
            dismissal={() => {
              this.setState({
                notificationOpen: false
              })
            }}
          />
          <Main>
            <div className={`scenario-content-wrap ${role}-scenario-content`}>
              {role === "requester" && (
                <header className="scenario-content-superheader">
                  <h3 className="mission-status-header">
                    <span className="mission-status-label">
                      Mission Status:{" "}
                    </span>
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
                <img
                  src={image}
                  alt={event}
                  className="scenario-content-image"
                />
                <figcaption className="scenario-content-image-caption">
                  <Link className="btn back-btn" to={this.getBackLink()}>
                    <Icon icon={faArrowCircleUp} />
                  </Link>
                </figcaption>
              </figure>

              <header className="scenario-content-header">
                <h4 className="scenario-title">
                  {`${toFirstCap(verb)} ${toFirstCap(
                    requester_firstname
                  )}'s ${noun}`}
                </h4>
              </header>

              <section className="scenario-content-body">
                {this.tabs()}
                <div className="tab-wrap scenario-tab-wrap">
                  <article
                    className={tab === "overview" ? "tab active" : "tab"}
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
                        <div className="location-name">
                          Pearlington, Louisiana
                        </div>
                        <div className="location-icon">
                          <Icon icon={faMapMarkerAlt} />
                        </div>
                      </div>
                    </section>

                    <div className="scenario-description">
                      {custom_message ||
                        "My roof was damaged in Hurricane Katrina. I need your help to cover it. Can have more info here to help tell the story and convince people to do this."}
                    </div>

                    <section className="scenario-tags">
                      <div className="scenario-event-location">{event}</div>
                      <div className="scenario-severity">Urgent</div>
                    </section>
                  </article>
                  <article
                    className={tab === "instructions" ? "tab active" : "tab"}
                  >
                    <header className="job-status-header">
                      <h4>
                        <span className="job-status-label">Job Status: </span>
                        <span>Workers arriving on site</span>
                      </h4>
                    </header>
                    {this.jobs()}
                  </article>
                  <article className={tab === "updates" ? "tab active" : "tab"}>
                    Updates
                  </article>
                  <article
                    className={tab === "verifiers" ? "tab active" : "tab"}
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
            </div>
          </Main>
          <Footer>{this.callToActionBtn()}</Footer>
        </Page>
      )
    } else {
      return (
        <Page>
          <Main>
            <Loader />
          </Main>
        </Page>
      )
    }
  }
}
