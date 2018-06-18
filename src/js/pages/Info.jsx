/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import Cookies from "js-cookie"
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
  faCommentAlt,
  faUsers,
  faThumbsUp,
  faThumbsDown,
  faComment,
  faTrash
} from "@fortawesome/fontawesome-free-solid"

// Page wrapper
import Page from "./Page"

// Page elements
import Loader from "../components/Loader"
import MiniMap from "../components/MiniMap"
import Task from "../components/Task"

// Local JS Utilities
import Database from "../resources/Database"
import { toFirstCap, moneyfy, getBase64 } from "../resources/Util"

// Images
import genericAvatar from "../../img/fb-profile.jpg"
import logo from "../../img/logo.svg"
import hon3yIcon from "../../img/hon3y.png"
/*** [end of imports] ***/

export default class Info extends Component {
  state = {
    userId: Cookies.get("userId") || 1,
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
        this.setState({
          scenarioData: result.body.data,
          childrenScenarioData: result.body.included
        })

        this.mountRequesterData(this.state.scenarioId)
        this.createRefresh()

        invalidateRequests(Database.getScenarioWithChildren)
      })
      .catch(error => {
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
            this.setState({
              scenarioData: result.body.data,
              childrenScenarioData: result.body.included
            })

            invalidateRequests(Database.getScenarioWithChildren)
          })
          .catch(error => {
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
        this.setState({
          requesterData: result.body.included[0]
        })
      })
      .catch(error => {
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

  // Requester actions
  requesterApproveAction = params => {
    const { userId } = this.state
    const imageString = getBase64(params.image)

    const json = {
      data: {
        type: "vouches",
        attributes: {
          image: imageString || "",
          description: params.description || "",
          rating: 1
        },
        relationships: {
          scenario: {
            data: {
              type: "scenarios",
              id: params.id
            }
          },
          verifier: {
            data: {
              type: "users",
              id: userId || 1
            }
          }
        }
      }
    }

    Database.createVouch(json)
      .then(result => {})
      .catch(error => {})
  }
  requesterDenyAction = params => {
    const { userId } = this.state
    const imageString = getBase64(params.image)

    const json = {
      data: {
        type: "vouches",
        attributes: {
          image: imageString || "",
          description: params.description || "",
          rating: 0
        },
        relationships: {
          scenario: {
            data: {
              type: "scenarios",
              id: params.id
            }
          },
          verifier: {
            data: {
              type: "users",
              id: userId || 1
            }
          }
        }
      }
    }

    Database.createVouch(json)
      .then(result => {})
      .catch(error => {})
  }
  requesterCommentAction = params => {
    return true
  }

  // Doer actions
  doerFinishAction = params => {
    const { userId } = this.state
    const imageString = getBase64(params.image)

    const json = {
      data: {
        type: "vouches",
        attributes: {
          image: imageString || "",
          description: params.description || "",
          rating: params.rating || ""
        },
        relationships: {
          scenario: {
            data: {
              type: "scenarios",
              id: params.id
            }
          },
          verifier: {
            data: {
              type: "users",
              id: userId || 1
            }
          }
        }
      }
    }

    Database.createVouch(json)
      .then(result => {})
      .catch(error => {})
  }
  doerRemoveAction = params => {
    // There isn't enough functionality to this app to do this yet. Will break things :/

    // const json = {
    //   data: {
    //     type: "scenarios",
    //     id: params.id
    //   }
    // }

    // Database.destroyScenario({ id: params.id }, json)
    //   .then(result => {})
    //   .catch(error => {})
  }
  doerEditAction = params => {
    // const json = {
    //   data: {
    //     type: "scenarios",
    //     id: params.id,
    //     attributes: {
    //       params
    //     }
    //   }
    // }

    // Database.updateScenario({ id: params.id }, json)
    //   .then(result => {})
    //   .catch(error => {})
  }

  render() {
    const { scenarioData, requesterData, childrenScenarioData } = this.state

    if (scenarioData && requesterData && childrenScenarioData) {
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

      let actions = []

      if (role === "requester") {
        actions = [
          {
            side: "left",
            color: "green",
            icon: faThumbsUp,
            label: "Finished!",
            clickFunction: this.requesterApproveAction
          },
          {
            side: "right",
            color: "orange",
            icon: faThumbsDown,
            label: "Not quite",
            clickFunction: this.requesterDenyAction
          },
          {
            side: "right",
            color: "gray",
            icon: faComment,
            label: "Comment",
            clickFunction: this.requesterCommentAction
          }
        ]
      } else if (role === "doer") {
        actions = [
          {
            side: "left",
            color: "green",
            icon: faCheck,
            label: "Finish",
            clickFunction: this.doerFinishAction
          },
          {
            side: "right",
            color: "red",
            icon: faTrash,
            label: "Remove",
            clickFunction: this.doerRemoveAction
          },
          {
            side: "right",
            color: "gray",
            icon: faEdit,
            label: "Edit task",
            clickFunction: this.doerEditAction
          }
        ]
      }

      return (
        <Page
          className={`info-page ${role}-info-page`}
          {...notificationProps}
          {...missionCompleteProps}
          footer={footer}>
          {role === "requester" && doer_firstname ? (
            <MiniMap initialCenter={mapPos} pins={doerPins} />
          ) : (
            <figure className="scenario-content-image-wrap">
              <img src={image} alt={event} className="scenario-content-image" />
            </figure>
          )}

          <header className="scenario-content-header">
            <h4 className="scenario-title">{`${toFirstCap(verb)} ${toFirstCap(requester_firstname)}'s ${noun}`}</h4>
          </header>

          <section className="scenario-content-body">
            <div className="mission-status-header">
              <span className="mission-status-label">Mission Status: </span>
              <span className="mission-status">Looking for Workers</span>
            </div>

            {role === "requester" && (
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
            )}

            {((role === "requester" && !doer_firstname) || role === "doer") && (
              <Fragment>
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
              </Fragment>
            )}

            {role === "requester" &&
              (doer_firstname ? (
                <Fragment>
                  <section className="task-wrapper review-tasks">
                    <header className="task-wrap-header">
                      <Icon icon={faClipboardCheck} className="task-wrap-header-icon" />
                      <span className="task-wrap-title"> Tasks to Review</span>
                    </header>

                    <section className="task-box review-task-box">
                      <Task avatar={avatar} name="Organize materials" price={25} actions={actions} />
                    </section>
                  </section>

                  <section className="task-wrapper worker-wrapper">
                    <header className="task-wrap-header">
                      <img src={logo} alt="Workers" className="task-wrap-header-image" />
                      <span className="task-wrap-title"> Workers</span>
                    </header>

                    <section className="task-box">
                      <header className="tasks-header">
                        <div className="worker-avatar-wrap">
                          <Link to={`/profile/${requesterData.id}`}>
                            <div
                              className="worker-avatar"
                              style={{
                                backgroundImage: `url("${avatar || genericAvatar}")`
                              }}
                            />
                          </Link>
                        </div>

                        <div className="worker-info">
                          <div className="worker-name">
                            <Link to={`/profile/${requesterData.id}`}>{toFirstCap(doer_firstname) || "John"}</Link>
                          </div>
                          <div className="worker-hon3y">
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
                              <span className="finished">1 finished</span>
                              <span>, </span>
                              <span className="to-review">1 to review</span>
                            </div>
                          </div>
                        </header>

                        <div className={taskListOpen ? "task-list-collapse-wrap open" : "task-list-collapse-wrap"}>
                          <div className="task-list review-list">
                            <h5 className="task-list-title">To Review</h5>
                            <Task avatar={avatar} name="Organize materials" price={25} actions={actions} />
                            <Task avatar={avatar} name="Collect donations for materials" price={25} actions={actions} />
                          </div>
                          <div className="task-list finished-list">
                            <h5 className="task-list-title">Finished</h5>
                            <Task avatar={avatar} name="Pick up volunteer labor" price={25} actions={actions} />
                            <Task avatar={avatar} name="Pick up materials" price={25} actions={actions} />
                          </div>
                          <div className="task-list in-progress-list">
                            <h5 className="task-list-title">In Progress</h5>
                            <Task avatar={avatar} name="Patch roof" price={25} actions={actions} />
                            <Task avatar={avatar} name="Paint and seal roof" price={25} actions={actions} />
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
                          <li className="tasks-footer-action">
                            <Icon icon={faUsers} className="action-icon" />
                          </li>
                        </ul>
                      </footer>
                    </section>
                  </section>
                </Fragment>
              ) : (
                <section className="scenario-tags">
                  <div className="scenario-event-location tag">{event}</div>
                  <ul className="tag-list">
                    <li className="tag inactive-tag">#Driving</li>
                    <li className="tag inactive-tag">#Logistics</li>
                    <li className="tag inactive-tag">#Roofing</li>
                  </ul>
                </section>
              ))}

            {role === "doer" && (
              <section className="task-wrapper review-tasks">
                <header className="task-wrap-header">
                  <Icon icon={faClipboardCheck} className="task-wrap-header-icon" />
                  <span className="task-wrap-title"> Task List</span>
                </header>

                <section className="task-box doer-task-box">
                  <div className="task-box-hashtag">#Logistics</div>
                  <Task
                    noAvatar
                    name={childrenScenarioData[0].attributes.custom_message}
                    taskId={childrenScenarioData[0].id}
                    price={25}
                    actions={actions}
                  />
                  <Task
                    noAvatar
                    name={childrenScenarioData[1].attributes.custom_message}
                    taskId={childrenScenarioData[1].id}
                    price={15}
                    actions={actions}
                  />
                </section>

                <section className="task-box doer-task-box">
                  <div className="task-box-hashtag">#Driving</div>
                  <Task
                    noAvatar
                    name={childrenScenarioData[2].attributes.custom_message}
                    taskId={childrenScenarioData[2].id}
                    price={20}
                    actions={actions}
                  />
                  <Task
                    noAvatar
                    name={childrenScenarioData[3].attributes.custom_message}
                    taskId={childrenScenarioData[3].id}
                    price={20}
                    actions={actions}
                  />
                </section>

                <section className="task-box doer-task-box">
                  <div className="task-box-hashtag">#Roofing</div>
                  <Task
                    noAvatar
                    name={childrenScenarioData[4].attributes.custom_message}
                    taskId={childrenScenarioData[4].id}
                    price={150}
                    actions={actions}
                  />
                  <Task
                    noAvatar
                    name={childrenScenarioData[5].attributes.custom_message}
                    taskId={childrenScenarioData[5].id}
                    price={80}
                    actions={actions}
                  />
                </section>
              </section>
            )}
          </section>
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
