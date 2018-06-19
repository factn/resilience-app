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
import SessionSetting from "../components/SessionSetting"
import SessionCard from "../components/SessionCard"

// Inputs
import Image from "../components/inputs/Image"
import TextArea from "../components/inputs/TextArea"
import Submit from "../components/inputs/Submit"

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
    reviewedChildren: [],
    leftToReview: 0,
    requesterData: null,
    buttonOverride: false,
    materialsDone: null,
    transportDone: null,
    roofCovered: null,
    roofSecured: null,
    notificationScenarioId: null,
    notificationOpen: false,
    missionComplete: false,
    newUpdateOpen: false,
    taskListOpen: false,
    dataRefreshRate: 5000 // Every 5 seconds check for map pin changes
  }

  componentDidMount = () => {
    Database.getScenarioWithChildren({ id: this.state.scenarioId })
      .then(result => {
        this.setState({
          scenarioData: result.body.data,
          childrenScenarioData:
            this.state.role === "doer" ? this.assignHashtags(result.body.included) : result.body.included
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
      Database.getScenarioWithChildren({ id: scenarioId })
        .then(result => {
          this.setState({
            scenarioData: result.body.data,
            childrenScenarioData:
              this.state.role === "doer" ? this.assignHashtags(result.body.included) : result.body.included
          })

          invalidateRequests(Database.getScenarioWithChildren)
        })
        .catch(error => {
          this.setState({
            scenarioData: null,
            childrenScenarioData: null
          })
        })
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

  assignHashtags = childrenScenarioData => {
    let hashtags = {
      logistics: [],
      driving: [],
      roofing: []
    }

    for (let i = 0, l = childrenScenarioData.length; i < l; i++) {
      let { noun, verb, is_complete } = childrenScenarioData[i].attributes

      if (!is_complete) {
        if ((verb === "organise" && noun === "materials") || (verb === "collect" && noun === "donations")) {
          hashtags.logistics.push(childrenScenarioData[i])
        } else if (
          (verb === "pick up" && noun === "volunteer labour") ||
          (verb === "pick up" && noun === "materials")
        ) {
          hashtags.driving.push(childrenScenarioData[i])
        } else {
          hashtags.roofing.push(childrenScenarioData[i])
        }
      }
    }

    return hashtags
  }

  toggleTaskList = () => {
    this.setState({
      taskListOpen: !this.state.taskListOpen
    })
  }

  taskCategoryCounts = () => {
    const { childrenScenarioData, reviewedChildren, leftToReview } = this.state

    let output = {
      finished: 0,
      toReview: 0
    }

    for (let i = 0, l = childrenScenarioData.length; i < l; i++) {
      if (reviewedChildren.indexOf(childrenScenarioData[i].id) > -1) {
        output.finished++
      } else if (childrenScenarioData[i].attributes.is_complete) {
        output.toReview++
      }
    }

    if (leftToReview === 0) {
      if (output.toReview > reviewedChildren.length) {
        this.setState({
          leftToReview: output.toReview - reviewedChildren.length
        })
      }
    }

    return (
      <div className="task-category-counts">
        {output.finished > 0 && <span className="finished">{output.finished} finished, </span>}
        {output.toReview > 0 && <span className="to-review">{output.toReview} to review</span>}
      </div>
    )
  }

  // Requester actions
  requesterApproveAction = params => {
    const { userId } = this.state
    const imageString = getBase64(params.image)
    let reviewedChildren = this.state.reviewedChildren
    reviewedChildren.push(params.id)

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
      .then(result => {
        this.setState({
          reviewedChildren,
          leftToReview: this.state.leftToReview - 1
        })
      })
      .catch(error => {})
  }
  requesterDenyAction = params => {
    const { userId } = this.state
    const imageString = getBase64(params.image)
    let reviewedChildren = this.state.reviewedChildren
    reviewedChildren.push(params.id)

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
      .then(result => {
        this.setState({
          reviewedChildren,
          leftToReview: this.state.leftToReview - 1
        })
      })
      .catch(error => {})
  }
  requesterCommentAction = params => {
    let reviewedChildren = this.state.reviewedChildren
    reviewedChildren.push(params.id)
    this.setState({
      reviewedChildren
    })
  }

  // Doer actions
  doerFinishAction = params => {
    const json = {
      data: {
        type: "scenarios",
        id: params.id,
        relationships: {
          doer: {
            data: {
              type: "users",
              id: this.state.userId || "1"
            }
          }
        }
      }
    }

    Database.updateScenario({ id: params.id }, json)
      .then(result => {
        this.props.history.push(`/${this.state.scenarioId}/doer/confirmation/${params.id}`)
      })
      .catch(error => {})
  }
  doerRemoveAction = params => {
    const json = {
      data: {
        type: "scenarios",
        id: params.id
      }
    }
    Database.destroyScenario({ id: params.id }, json)
      .then(result => {})
      .catch(error => {})
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
  sendFinalVerification = params => {
    const { scenarioId, userId } = this.state
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
              id: scenarioId
            }
          },
          verifier: {
            data: {
              type: "users",
              id: userId
            }
          }
        }
      }
    }

    Database.createVouch(json)
      .then(result => {})
      .catch(error => {})
  }

  render() {
    const { scenarioData, requesterData, childrenScenarioData } = this.state

    if (scenarioData && requesterData && childrenScenarioData) {
      const {
        scenarioId,
        role,
        notificationOpen,
        notificationScenarioId,
        missionComplete,
        taskListOpen,
        reviewedChildren,
        leftToReview
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
        <Page className={`info-page ${role}-info-page`} {...notificationProps} footer={footer}>
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
              {doer_firstname ? (
                <span className="mission-status">In Progress</span>
              ) : (
                <span className="mission-status">Looking for Workers</span>
              )}
            </div>

            {role === "requester" && (
              <div className="scenario-action-buttons">
                <div className="edit-mission-btn">
                  <Icon icon={faEdit} className="action-button-icon" />
                  <span className="action-button-label">Edit mission</span>
                </div>
                <div className="workers-btn">
                  <img src={logo} className="action-button-image" alt="Workers" />
                  <span className="action-button-label">{doer_firstname ? "1 Worker" : "0 Workers"}</span>
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

                    <section
                      className={leftToReview > 0 ? "task-box review-task-box" : "task-box review-task-box empty"}>
                      {leftToReview > 0 ? (
                        childrenScenarioData &&
                        childrenScenarioData.map(child => {
                          if (child.attributes.is_complete && reviewedChildren.indexOf(child.id) === -1) {
                            return (
                              <Task
                                avatar={avatar}
                                name={child.attributes.custom_message}
                                price={50}
                                actions={actions}
                                key={`task_to_review_${child.id}`}
                              />
                            )
                          }
                          return <Fragment />
                        })
                      ) : (
                        <div className="no-tasks">No tasks to review at this time</div>
                      )}
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
                        <header className="task-overview" onClick={() => this.toggleTaskList()}>
                          <div className="task-overview-left">
                            <span className="task-number">{childrenScenarioData.length}</span>
                            <span> Tasks</span>
                          </div>
                          <div className="task-overview-right">
                            <div className="donation-amount">{moneyfy(donated, 2)}</div>
                            {this.taskCategoryCounts()}
                          </div>
                        </header>

                        <div className={taskListOpen ? "task-list-collapse-wrap open" : "task-list-collapse-wrap"}>
                          <div className="task-list review-list">
                            <h5 className="task-list-title">To Review</h5>
                            {childrenScenarioData &&
                              childrenScenarioData.map((child, _index) => {
                                if (child.attributes.is_complete) {
                                  return (
                                    <Task
                                      avatar={avatar}
                                      name={child.attributes.custom_message}
                                      price={50}
                                      actions={actions}
                                      key={_index}
                                    />
                                  )
                                }
                              })}
                          </div>
                          <div className="task-list finished-list">
                            <h5 className="task-list-title">Finished</h5>
                            {childrenScenarioData &&
                              childrenScenarioData.map((child, _index) => {
                                if (child.attributes.is_complete && reviewedChildren.indexOf(child.id) > -1) {
                                  return (
                                    <Task
                                      avatar={avatar}
                                      name={child.attributes.custom_message}
                                      price={50}
                                      actions={actions}
                                      key={_index}
                                    />
                                  )
                                }
                              })}
                          </div>
                          <div className="task-list in-progress-list">
                            <h5 className="task-list-title">In Progress</h5>
                            {childrenScenarioData &&
                              childrenScenarioData.map((child, _index) => {
                                if (!child.attributes.is_complete) {
                                  return (
                                    <Task
                                      avatar={avatar}
                                      name={child.attributes.custom_message}
                                      price={50}
                                      actions={actions}
                                      key={_index}
                                    />
                                  )
                                }
                              })}
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

            {role === "doer" &&
              (missionComplete ? (
                <section className="task-wrapper review-tasks">
                  <SessionSetting headerLabel="Include a message">
                    <SessionCard className="input-card message-card">
                      <TextArea inputID="description" />
                    </SessionCard>
                  </SessionSetting>

                  <SessionSetting headerLabel="Add a photo">
                    <Image />
                  </SessionSetting>

                  <Submit
                    labelPhrase="Send & Complete Mission"
                    onSubmit={this.sendFinalVerification}
                    onSubmitParams={{
                      description: "description",
                      image: "photo"
                    }}
                  />
                </section>
              ) : (
                <section className="task-wrapper review-tasks">
                  <header className="task-wrap-header">
                    <Icon icon={faClipboardCheck} className="task-wrap-header-icon" />
                    <span className="task-wrap-title"> Task List</span>
                  </header>

                  <section className="task-box doer-task-box">
                    <div className="task-box-hashtag">#Logistics</div>
                    {childrenScenarioData &&
                      childrenScenarioData.logistics.map(child => (
                        <Task
                          noAvatar
                          name={child.attributes.custom_message}
                          taskId={child.id}
                          price={25}
                          actions={actions}
                          key={`task${child.id}`}
                        />
                      ))}
                  </section>

                  <section className="task-box doer-task-box">
                    <div className="task-box-hashtag">#Driving</div>
                    {childrenScenarioData &&
                      childrenScenarioData.driving.map(child => (
                        <Task
                          noAvatar
                          name={child.attributes.custom_message}
                          taskId={child.id}
                          price={25}
                          actions={actions}
                          key={`task${child.id}`}
                        />
                      ))}
                  </section>

                  <section className="task-box doer-task-box">
                    <div className="task-box-hashtag">#Roofing</div>
                    {childrenScenarioData &&
                      childrenScenarioData.roofing.map(child => (
                        <Task
                          noAvatar
                          name={child.attributes.custom_message}
                          taskId={child.id}
                          price={25}
                          actions={actions}
                          key={`task${child.id}`}
                        />
                      ))}
                  </section>
                </section>
              ))}
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
