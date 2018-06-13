/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { invalidateRequests } from "redux-bees"
import Icon from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faMapMarkerAlt,
  faEdit,
  faClock,
  faDollarSign,
  faClipboardCheck,
  faPhone,
  faCommentAlt
} from "@fortawesome/fontawesome-free-solid"

// Page wrapper
import Page from "./Page"

// Page elements
import Loader from "../components/Loader"
import MiniMap from "../components/MiniMap"
import Task from "../components/Task"

// Local JS Utilities
import Database from "../resources/Database"
import { toFirstCap, moneyfy } from "../resources/Util"

// Images
import genericAvatar from "../../img/fb-profile.jpg"
import logo from "../../img/logo.svg"
import hon3yIcon from "../../img/hon3y.png"
/*** [end of imports] ***/

export default class Info extends Component {
  state = {
    scenarioId: this.props.match.params.scenario_id || 1,
    role: this.props.match.params.role || "info",
    scenarioData: null,
    childrenScenarioData: null,
    requesterData: null,
    buttonOverride: false,
    materialsDone: null,
    transportDone: null,
    roofCovered: null,
    roofSecured: null,
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

  checkForMissionComplete = () => {
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

  toggleTaskList = () => {
    this.setState({
      taskListOpen: !this.state.taskListOpen
    })
  }

  render() {
    const { scenarioData, requesterData } = this.state

    if (scenarioData && requesterData) {
      const {
        scenarioId,
        role,
        notificationOpen,
        notificationScenarioId,
        missionCompleteOpen,
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
        funding_goal,
        updated_at,
        donated
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

      const { avatar } = requesterData.attributes

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

      const footer = (
        <div className="scenario-footer-wrap">
          <div className="scenario-cost scenario-footer-flex-item">
            <Icon icon={faDollarSign} className="scenario-cost-icon" />
            <div className="scenario-item-text">
              <div className="scenario-item-label">Cost:</div>
              <div className="scenario-item-value">{moneyfy(funding_goal)}</div>
            </div>
          </div>
          <div className="scenario-time scenario-footer-flex-item">
            <Icon icon={faClock} className="scenario-time-icon" />
            <div className="scenario-item-text">
              <div className="scenario-item-label">Time left:</div>
              <div className="scenario-item-value">48:00 hrs</div>
            </div>
          </div>
        </div>
      )

      return (
        <Page className="info-page" {...notificationProps} {...missionCompleteProps} footer={footer}>
          {doer_firstname ? (
            <Fragment>
              <MiniMap initialCenter={mapPos} pins={doerPins} />

              <header className="scenario-content-header">
                <h4 className="scenario-title">{`${toFirstCap(verb)} ${toFirstCap(requester_firstname)}'s ${noun}`}</h4>
              </header>

              <section className="scenario-content-body">
                <div className="mission-status-header">
                  <span className="mission-status-label">Mission Status: </span>
                  <span className="mission-status">In progress</span>
                </div>

                <div className="scenario-action-buttons">
                  <div className="edit-mission-btn">
                    <Icon icon={faEdit} className="action-button-icon" />
                    <span className="action-button-label">Edit mission</span>
                  </div>
                  <div className="workers-btn">
                    <img src={logo} className="action-button-image" alt="Workers" />
                    <span className="action-button-label">1 Worker</span>
                  </div>
                </div>
              </section>

              <section className="task-wrapper review-tasks">
                <header className="task-wrap-header">
                  <Icon icon={faClipboardCheck} className="task-wrap-header-icon" />
                  <span className="task-wrap-title"> Tasks to Review</span>
                </header>
              </section>

              <section className="task-wrapper worker-wrapper">
                <header className="task-wrap-header">
                  <img src={logo} alt="Workers" className="task-wrap-header-image" />
                  <span className="task-wrap-title"> Workers</span>
                </header>
              </section>

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
                      <div className="task-category-counts" onClick={() => this.toggleTaskList()}>
                        2 to review, 2 completed, 2 in progress
                      </div>
                    </div>
                  </header>

                  <div className={taskListOpen ? "task-list-collapse-wrap open" : "task-list-collapse-wrap"}>
                    <div className="task-list review-list">
                      <h5 className="task-list-title">To Review</h5>
                      <Task name="Organize materials" status="To review" reviewStatus="Vouch that I'm done" />
                      <Task
                        name="Collect donations for materials"
                        status="To review"
                        reviewStatus="Vouch that I'm done"
                      />
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
            </Fragment>
          ) : (
            <Fragment>
              <figure className="scenario-content-image-wrap">
                <img src={image} alt={event} className="scenario-content-image" />
              </figure>

              <header className="scenario-content-header">
                <h4 className="scenario-title">{`${toFirstCap(verb)} ${toFirstCap(requester_firstname)}'s ${noun}`}</h4>
              </header>

              <section className="scenario-content-body">
                <div className="mission-status-header">
                  <span className="mission-status-label">Mission Status: </span>
                  <span className="mission-status">Looking for Workers</span>
                </div>

                <div className="scenario-action-buttons">
                  <div className="edit-mission-btn">
                    <Icon icon={faEdit} className="action-button-icon" />
                    <span className="action-button-label">Edit mission</span>
                  </div>
                  <div className="workers-btn">
                    <img src={logo} className="action-button-image" alt="Workers" />
                    <span className="action-button-label">0 Workers</span>
                  </div>
                </div>

                <div className="user-info">
                  <div className="user-avatar-wrap">
                    <div
                      className="user-avatar"
                      style={{
                        backgroundImage: `url("${avatar || genericAvatar}")`
                      }}
                    />
                  </div>

                  <div className="scenario-user">
                    <div className="user-name">
                      {toFirstCap(requester_firstname)} {toFirstCap(requester_lastname)}
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
                </div>

                <div className="scenario-description">
                  {custom_message ||
                    "My roof was damaged in Hurricane Katrina. I need your help to cover it. Can have more info here to help tell the story and convince people to do this."}
                </div>

                <section className="scenario-tags">
                  <div className="scenario-event-location tag">{event}</div>
                  <ul className="tag-list">
                    <li className="tag inactive-tag">#Driving</li>
                    <li className="tag inactive-tag">#Logistics</li>
                    <li className="tag inactive-tag">#Roofing</li>
                  </ul>
                </section>
              </section>
            </Fragment>
          )}
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
