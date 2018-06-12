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
  faEllipsisH,
  faPlusCircle,
  faChevronCircleRight,
  faClock,
  faPhone,
  faCommentAlt
} from "@fortawesome/fontawesome-free-solid"

// Page wrapper
import Page from "./Page"

// Page elements
import Loader from "../components/Loader"
import MiniMap from "../components/MiniMap"
import Task from "../components/Task"

// Inputs
import TextArea from "../components/inputs/TextArea"

// Local JS Utilities
import Database from "../resources/Database"
import { toFirstCap, moneyfy } from "../resources/Util"

// Images
import genericAvatar from "../../img/fb-profile.jpg"
import hon3yIcon from "../../img/hon3y.png"
/*** [end of imports] ***/

export default class Info extends Component {
  state = {
    scenarioId: this.props.match.params.scenario_id || 1,
    role: this.props.match.params.role || "info",
    tab: this.props.match.params.tab || "overview",
    scenarioData: null,
    childrenScenarioData: null,
    requesterData: null,
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
    newUpdateOpen: false,
    taskListOpen: false,
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

        this.mountRequesterData(this.state.scenarioId)
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

  mountRequesterData = id => {
    Database.getScenarioRequester({ id })
      .then(result => {
        const { included } = result.body
        // console.info("Success getting scenario requester:", included)

        this.setState({
          requesterData: included[0]
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)

        this.setState({
          requesterData: null
        })
      })
  }

  getBackLink = () => {
    const { role } = this.state

    if (role === "donor" || role === "doer") return `/feed/${role}`
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

    if (role === "donor") {
      return (
        <Link to="/feed/donor" className="btn footer-btn feed-btn">
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

  showNewUpdate = () => {
    this.setState({
      newUpdateOpen: true
    })
  }

  toggleTaskList = () => {
    this.setState({
      taskListOpen: !this.state.taskListOpen
    })
  }

  postNewUpdate = params => {
    // TODO: submit update message and add to the updates list

    this.setState({
      newUpdateOpen: false
    })
  }

  render() {
    const { scenarioData, requesterData } = this.state

    if (scenarioData && requesterData) {
      const {
        scenarioId,
        role,
        tab,
        notificationOpen,
        notificationScenarioId,
        missionCompleteOpen,
        newUpdateOpen,
        taskListOpen
      } = this.state

      const {
        event,
        image,
        requester_firstname,
        requester_lastname,
        requesterlat,
        requesterlon,
        doer_firstname,
        doerlat,
        doerlon,
        noun,
        verb,
        custom_message,
        updated_at,
        donated
      } = scenarioData.attributes

      const { avatar } = requesterData.attributes

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
                  <span className="mission-status">Being vouched</span>x
                </h3>
                <ul className="vouch-list">
                  <li className="vouch">
                    <div className="vouch-label">Location is in Pearlington, Mississippi</div>
                    <div className="vouch-status">
                      <span className="status-name">Vouched</span>
                      <span className="status-icon vouched">
                        <Icon icon={faCheck} />
                      </span>
                    </div>
                  </li>
                  <li className="vouch">
                    <div className="vouch-label">Vouch that roof needs fixing</div>
                    <div className="vouch-status">
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
                      <div className="user-vouched-status">
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

                  <MiniMap initialCenter={mapPos} pins={doerPins} />

                  <h4 className="task-box-title">Workers</h4>

                  <section className="task-box">
                    <header className="tasks-header">
                      <div className="user-avatar-wrap">
                        <Link to={`/reputation/${requesterData.id}`}>
                          <div
                            className="user-avatar"
                            style={{
                              backgroundImage: `url("${avatar || genericAvatar}")`
                            }}
                          />
                        </Link>
                      </div>

                      <div className="user-info">
                        <div className="user-name">
                          <Link to={`/reputation/${requesterData.id}`}>{doer_firstname || "John"}</Link>
                        </div>
                        <div className="user-hon3y">
                          <img src={hon3yIcon} alt="HON3Y" className="hon3y-icon" />
                          <span className="hon3y-score"> 4.35</span>
                        </div>
                      </div>

                      <div className="mission-info">
                        <Icon icon={faClock} className="time-left-icon" />
                        <div className="time-left-label">Time left:</div>
                        <div className="time-left">48:00 hours</div>
                        <div className="time-joined">Joined this mission {new Date(updated_at).toDateString()}</div>
                      </div>
                    </header>

                    <article className="tasks-body">
                      <header className="task-overview">
                        <div className="task-overview-left">
                          <span className="task-number">6</span>
                          <span> Tasks</span>
                          <div className="notification-button">1</div>
                        </div>
                        <div className="task-overview-right">
                          <div className="donation-amount">{moneyfy(donated, 2)}</div>
                          <div className="task-category-counts" onClick={() => this.toggleTaskList()}>2 to review, 2 completed, 2 in progress</div>
                        </div>
                      </header>

                      <div className={taskListOpen ? "task-list-collapse-wrap open" : "task-list-collapse-wrap"}>
                        <div className="task-list review-list">
                          <h5 className="task-list-title">To Review</h5>
                          <Task name="Organize materials" status="To review" reviewStatus="Vouch that I'm done" />
                          <Task name="Collect donations for materials" status="To review" reviewStatus="Vouch that I'm done" />
                        </div>
                        <div className="task-list finished-list">
                          <h5 className="task-list-title">Finished</h5>
                          <Task name="Pick up volunteer labor" status="Finished" finishedDate="23/4/18" />
                          <Task name="Pick up materials" status="Finished" finishedDate="23/4/18" />
                        </div>
                        <div className="task-list in-progress-list">
                          <h5 className="task-list-title">In Progress</h5>
                          <Task name="Patch roof" status="In progress" />
                          <Task name="Paint and seal roof" status="In progress" />
                        </div>
                      </div>
                    </article>

                    <footer className="tasks-footer">
                      <ul className="tasks-footer-actions">
                        <li className="tasks-footer-action">Contact</li>
                        <li className="tasks-footer-action">
                          <Icon icon={faCommentAlt} className="action-icon" />
                        </li>
                        <li className="tasks-footer-action">
                          <Icon icon={faPhone} className="action-icon" />
                        </li>
                      </ul>
                    </footer>
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

                <article className={tab === "updates" ? "tab active" : "tab"}>
                  <div className={newUpdateOpen ? "add-post-wrap open" : "add-post-wrap"}>
                    <button className="btn add-post-btn" onClick={() => this.showNewUpdate()}>
                      <span>New update </span>
                      <Icon icon={faPlusCircle} />
                    </button>
                    <section className={newUpdateOpen ? "new-update-wrap open" : "new-update-wrap"}>
                      <TextArea labelPhrase="Enter your message" inputID="update_message" />
                      <button
                        className="btn post-update-btn"
                        onClick={() =>
                          this.postNewUpdate({
                            update_message: document.getElementById("update_message").value
                          })
                        }>
                        <span>Post </span>
                        <Icon icon={faChevronCircleRight} />
                      </button>
                    </section>
                  </div>

                  <section className={newUpdateOpen ? "updates-wrap" : "updates-wrap open"}>
                    {this.buildUpdates().map((update, _index) => <Update {...update} key={`update${_index}`} />)}
                  </section>
                </article>

                <article className={tab === "advocates" ? "tab active" : "tab"} />
              </div>
            </section>
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
