/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { invalidateRequests } from "redux-bees"
import Icon from "@fortawesome/react-fontawesome"
import { faCheck, faMapMarkerAlt, faArrowCircleUp, faEllipsisH } from "@fortawesome/fontawesome-free-solid"

// Page wrapper
import Page from "./Page"

// Page elements
import Loader from "../components/Loader"
import MiniMap from "../components/MiniMap"

// Local JS Utilities
import Database from "../resources/Database"
import { toFirstCap, moneyfy, gradientStyle } from "../resources/Util"

// Images
import genericAvatar from "../../img/fb-profile.jpg"
/*** [end of imports] ***/

export default class Info extends Component {
  state = {
    scenarioId: this.props.match.params.scenario_id || 1,
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
    missionComplete: false,
    missionCompleteOpen: false,
    dataRefreshRate: 5000 // Every 5 seconds check for map pin changes
  }

  componentDidMount = () => {
    Database.getScenarioWithChildren({ id: this.state.scenarioId })
      .then(result => {
        const { data, included } = result.body
        // console.info("Success getting scenario:", data, included)

        this.setState({
          scenarioData: data,
          childrenScenarioData: included
        })
        this.createRefresh()

        invalidateRequests(Database.getScenarioWithChildren)
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)

        this.setState({
          scenarioData: null,
          childrenScenarioData: null
        })
      })
  }
  componentWillUnmount = () => {
    clearInterval(this.autoRefresh)
  }

  createRefresh = () => {
    const { dataRefreshRate, scenarioId } = this.state

    this.autoRefresh = setInterval(() => {
      if (!this.checkForMissionComplete()) {
        Database.getScenarioWithChildren({ id: scenarioId })
          .then(result => {
            const { data, included } = result.body
            // console.info("Success getting scenario:", data, included)

            this.setState({
              scenarioData: data,
              childrenScenarioData: included
            })

            invalidateRequests(Database.getScenarioWithChildren)
          })
          .catch(error => {
            // console.error("Error getting scenarios:", error)

            this.setState({
              scenarioData: null,
              childrenScenarioData: null
            })
          })
      } else {
        clearInterval(this.autoRefresh)
      }
    }, dataRefreshRate)
  }

  getBackLink = () => {
    const { role } = this.state

    if (role === "donator" || role === "doer" || role === "verifer") return `/feed/${role}`
    else if (role === "requester") return "/requester"
    else return "/"
  }
  changeTab = tab => {
    this.setState({
      tab
    })
  }
  callToActionBtn = () => {
    const { role, materialsDone, transportDone, roofCovered, roofSecured, scenarioId } = this.state

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
                <Link to={`/${scenarioId}/doer/confirmation/fix/roof`} className="btn footer-btn feed-btn">
                  Complete Mission
                </Link>
              )
            } else {
              return (
                <Link to={`/${scenarioId}/doer/confirmation/fix/roof`} className="btn footer-btn feed-btn">
                  Secure Roof
                </Link>
              )
            }
          } else {
            return (
              <Link to={`/${scenarioId}/doer/confirmation/patch/roof`} className="btn footer-btn feed-btn">
                Cover Roof
              </Link>
            )
          }
        } else {
          return (
            <Link to={`/${scenarioId}/doer/confirmation/get/transportation`} className="btn footer-btn feed-btn">
              Provide Transport
            </Link>
          )
        }
      } else {
        return (
          <Link to={`/${scenarioId}/doer/confirmation/get/materials`} className="btn footer-btn feed-btn">
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
  jobs = () => {
    const { childrenScenarioData, buttonOverride } = this.state

    let hasShownDesc = false
    return (
      <Fragment>
        {childrenScenarioData ? (
          Object.entries(childrenScenarioData).map(([key, childScenario]) => {
            const { noun, verb, is_complete } = childScenario.attributes
            let label
            let detailDesc = ""

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
                detailDesc = "Ensure the tarp covers all areas and don't allow rain in."
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
                detailDesc = "Ensure that the tarp is secured on all corners to protect against hurricane winds."
              }
            }

            if (detailDesc !== "") {
              if (hasShownDesc) {
                detailDesc = ""
              }
              hasShownDesc = true
            }

            return (
              <div className="card job-card" key={key}>
                <div className="card-label">{label}</div>
                {is_complete && (
                  <div className="done-job-icon">
                    <Icon icon={faCheck} />
                  </div>
                )}
                {detailDesc}
              </div>
            )
          })
        ) : (
          <Loader />
        )}
      </Fragment>
    )
  }
  checkForMissionComplete = () => {
    const { initialJobState, missionComplete } = this.state
    let completeCount = 0

    for (let job in initialJobState) {
      if (initialJobState[job].complete) {
        completeCount++
      }
    }

    if (completeCount >= 4 && !missionComplete) {
      this.setState({
        missionComplete: true,
        missionCompleteOpen: true
      })
      return true
    }
    return false
  }
  dismissMissionComplete = () => {
    this.setState({
      missionCompleteOpen: false
    })
  }
  dismissNotification = () => {
    this.setState({
      notificationOpen: false
    })
  }
  buildUpdates = () => {
    const { scenarioData, childrenScenarioData, missionComplete } = this.state
    const { created_at, requester_firstname, doer_firstname, is_complete, updated_at } = scenarioData.attributes

    let updates = []

    updates.push({
      role: "requester",
      firstName: toFirstCap(requester_firstname),
      avatar: genericAvatar,
      message: "Mission started",
      timestamp: new Date(created_at).toDateString()
    })

    for (let update = 0, len = childrenScenarioData.length; update < len; update++) {
      if (childrenScenarioData[update].attributes.is_complete) {
        updates.push({
          role: "doer",
          firstName: toFirstCap(doer_firstname),
          avatar: genericAvatar,
          message: "Task complete",
          timestamp: new Date(childrenScenarioData[update].attributes.updated_at).toDateString()
        })
      }
    }

    if (missionComplete || is_complete) {
      updates.push({
        role: "system",
        message: "Mission complete!",
        timestamp: new Date(updated_at).toDateString()
      })
    }

    return updates
  }

  render() {
    if (this.state.scenarioData) {
      const {
        scenarioId,
        scenarioData,
        role,
        tab,
        notificationOpen,
        notificationScenarioId,
        missionCompleteOpen
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

      const notificationProps = {
        notification: true,
        notificationOpen,
        parentScenarioId: scenarioId,
        childScenarioId: notificationScenarioId,
        dismissNotification: this.dismissNotification
      }

      const missionCompleteProps = {
        missionComplete: true,
        missionCompleteImage: image,
        missionCompleteOpen,
        dismissMissionComplete: this.dismissMissionComplete
      }

      return (
        <Page {...notificationProps} {...missionCompleteProps} footer={this.callToActionBtn()}>
          <div className={`scenario-content-wrap ${role}-scenario-content`}>
            {role === "requester" && (
              <header className="scenario-content-superheader">
                <h3 className="mission-status-header">
                  <span className="mission-status-label">Mission Status: </span>
                  <span className="mission-status">Being verified</span>
                </h3>
                <ul className="verification-list">
                  <li className="verification">
                    <div className="verification-label">Location is in Pearlington, Mississippi</div>
                    <div className="verification-status">
                      <span className="status-name">Verified</span>
                      <span className="status-icon verified">
                        <Icon icon={faCheck} />
                      </span>
                    </div>
                  </li>
                  <li className="verification">
                    <div className="verification-label">Verification that roof needs fixing</div>
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
              <figcaption className="scenario-content-image-caption">
                <Link className="btn back-btn" to={this.getBackLink()}>
                  <Icon icon={faArrowCircleUp} />
                </Link>
              </figcaption>
            </figure>

            <header className="scenario-content-header">
              <h4 className="scenario-title">{`${toFirstCap(verb)} ${toFirstCap(requester_firstname)}'s ${noun}`}</h4>
            </header>

            <section className="scenario-content-body">
              <ul className="tab-list">
                <li
                  className={tab === "overview" ? "tab-link active" : "tab-link"}
                  onClick={() => this.changeTab("overview")}>
                  Overview
                </li>
                <li
                  className={tab === "instructions" ? "tab-link active" : "tab-link"}
                  onClick={() => this.changeTab("instructions")}>
                  Instructions
                </li>
                <li
                  className={tab === "updates" ? "tab-link active" : "tab-link"}
                  onClick={() => this.changeTab("updates")}>
                  Updates
                </li>
              </ul>

              <div className="tab-wrap scenario-tab-wrap">
                <article className={tab === "overview" ? "tab active" : "tab"}>
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
                    {custom_message ||
                      "My roof was damaged in Hurricane Katrina. I need your help to cover it. Can have more info here to help tell the story and convince people to do this."}
                  </div>

                  <section className="scenario-tags">
                    <div className="scenario-event-location">{event}</div>
                    <div className="scenario-severity">Urgent</div>
                  </section>
                </article>

                <article className={tab === "instructions" ? "tab active" : "tab"}>
                  <header className="job-status-header">
                    <h4>
                      <span className="job-status-label">Job Status: </span>
                      <span>Workers arriving on site</span>
                    </h4>
                  </header>
                  {this.jobs()}
                </article>

                <article className={tab === "updates" ? "updates-wrap tab active" : "updates-wrap tab"}>
                  {this.buildUpdates().map((update, _index) => <Update {...update} key={`update${_index}`} />)}
                </article>

                <article className={tab === "verifiers" ? "tab active" : "tab"} />
              </div>
            </section>

            <MiniMap initialCenter={mapPos} pins={doerPins} />

            <footer className="scenario-footer">
              <div className="funding-goal-label">
                <span>To fully fund </span>
                <span className="dollar-amount">{moneyfy(funding_goal - donated)}</span>
              </div>
              <div className="funding-progress-slider" id={`${event}_fundingGoal`} style={fundingGoalSliderStyle} />
              <div className="funding-goal-label">
                Target <span className="dollar-amount">{moneyfy(funding_goal)}</span>
              </div>
              <div className="funding-goal-summary">450 donators, {moneyfy(donated)} donated</div>
            </footer>
          </div>
        </Page>
      )
    } else {
      return (
        <Page>
          <Loader />
        </Page>
      )
    }
  }
}

const Update = props => (
  <article className={`update ${props.role}-update`}>
    <aside className="update-avatar-wrap">
      <div className="update-user-info">
        <div className="user-avatar" style={{ backgroundImage: `url("${props.avatar || genericAvatar}")` }} />
        <div className="user-name">{props.firstName}</div>
      </div>
    </aside>
    <section className="update-message">
      <div className="message-pin" />
      <div className="message-content">{props.message}</div>
      <div className="message-timestamp">{props.timestamp}</div>
    </section>
  </article>
)
