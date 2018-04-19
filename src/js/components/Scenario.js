/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import createHistory from "history/createBrowserHistory"
import Icon from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/fontawesome-free-solid"

// Local JS
import Database from "../resources/Database"
import { getUrlPiece, toFirstCap } from "../resources/Util"
/*** [end of imports] ***/

const history = createHistory()

export default class Scenario extends Component {
  constructor(props) {
    super(props)

    this.state = {
      xTransform: 0,
      touchStartX: 0,
      lastTouchX: 0,
      style: { transform: "translateX(0)" },
      beforeStyle: {
        opacity: 0,
        zIndex: 0
      },
      afterStyle: {
        opacity: 0,
        zIndex: 0
      },
      swipeThreshold: 150,
      transitionTiming: 100,
      lastUrlSegment: getUrlPiece()
    }

    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  componentDidMount = () => {
    if (this.props.feedReset) {
      this.setState({
        xTransform: 0,
        touchStartX: 0,
        lastTouchX: 0,
        style: { transform: `translateX(0)` },
        beforeStyle: {
          opacity: 0,
          zIndex: 0
        },
        afterStyle: {
          opacity: 0,
          zIndex: 0
        }
      })
    }
  }

  handleTouchStart = e => {
    this.setState({
      touchStartX: e.targetTouches[0].clientX,
      style: {
        transform: `translateX(0)`,
        zIndex: 10
      }
    })
  }
  handleTouchMove = e => {
    const { touchStartX } = this.state
    let currentTouchX = e.targetTouches[0].clientX
    let xDif = currentTouchX - touchStartX

    if (xDif > 0) {
      this.setState({
        xTransform: xDif,
        lastTouchX: currentTouchX,
        style: {
          transform: `translateX(${xDif}px)`
        },
        beforeStyle: {
          opacity: 1,
          zIndex: 5
        },
        afterStyle: {
          opacity: 0,
          zIndex: 0
        }
      })
    } else {
      this.setState({
        xTransform: xDif,
        lastTouchX: currentTouchX,
        style: {
          transform: `translateX(${xDif}px)`
        },
        beforeStyle: {
          opacity: 0,
          zIndex: 0
        },
        afterStyle: {
          opacity: 1,
          zIndex: 5
        }
      })
    }
  }
  handleTouchEnd = e => {
    const { touchStartX, lastTouchX, swipeThreshold } = this.state

    let xDif = lastTouchX === 0 ? 0 : lastTouchX - touchStartX

    if (Math.abs(xDif) > swipeThreshold) {
      if (touchStartX < lastTouchX) this.swipedRight()
      else this.swipedLeft()
    } else {
      this.resetSwipePos()
    }
  }

  swipedRight = () => {
    const { transitionTiming, lastUrlSegment } = this.state
    const { id } = this.props.scenario

    this.setState({
      style: {
        transform: "translateX(100%)",
        marginBottom: "-15rem" // Currently this is an approximation of the element height
      }
    })
    setTimeout(() => {
      this.acceptScenario({ scenarioId: id })
      history.push(`/${id}/${lastUrlSegment}/`)
      window.location = `/${id}/${lastUrlSegment}/`
    }, transitionTiming)
  }
  swipedLeft = () => {
    const { lastUrlSegment } = this.state
    const { id } = this.props.scenario

    let adType

    if (lastUrlSegment === "doer") adType = "1"
    else if (lastUrlSegment === "requester") adType = "2"
    else if (lastUrlSegment === "donator") adType = "3"
    else if (lastUrlSegment === "verifier") adType = "4"

    this.setState({
      style: {
        transform: "translateX(-100%)",
        marginBottom: "-15rem" // Currently this is an approximation of the element height
      }
    })
    this.dismissScenario({ scenarioId: id, adType: adType })
  }
  resetSwipePos = () => {
    this.setState({
      style: {
        transform: "translateX(0)",
        zIndex: 10
      },
      beforeStyle: {
        opacity: 0,
        zIndex: 0
      },
      afterStyle: {
        opacity: 0,
        zIndex: 0
      }
    })
  }

  dismissScenario = params => {
    let json = {
      data: {
        type: "user_ad_interactions",
        attributes: {},
        relationships: {
          user: {
            data: {
              type: "users",
              id: "1"
            }
          },
          scenario: {
            data: {
              id: params.scenarioId,
              type: "scenarios"
            }
          },
          ad_type: {
            data: {
              id: params.adType,
              type: "ad_types"
            }
          },
          interaction_type: {
            data: {
              id: "2",
              type: "interaction_types"
            }
          }
        }
      }
    }

    Database.createUserAdInteraction(json)
      .then(result => {
        // console.log("User ad interaction successfully created:", result)
        this.props.removeFromFeed()
      })
      .catch(error => {
        // console.error("Error creating user ad interaction:", error)
      })
  }
  acceptScenario = params => {
    const { lastUrlSegment } = this.state
    let ad_type

    if (lastUrlSegment === "doer") ad_type = "1"
    else if (lastUrlSegment === "requester") ad_type = "2"
    else if (lastUrlSegment === "donator") ad_type = "3"
    else if (lastUrlSegment === "verifier") ad_type = "4"

    let json = {
      data: {
        type: "user_ad_interactions",
        attributes: {},
        relationships: {
          user: {
            data: {
              type: "users",
              id: "1"
            }
          },
          scenario: {
            data: {
              id: params.scenarioId,
              type: "scenarios"
            }
          },
          ad_type: {
            data: {
              id: ad_type,
              type: "ad_types"
            }
          },
          interaction_type: {
            data: {
              id: "1",
              type: "interaction_types"
            }
          }
        }
      }
    }

    Database.createUserAdInteraction(json)
      .then(result => {
        // console.log("User ad interaction successfully created:", result)
      })
      .catch(error => {
        // console.error("Error creating user ad interaction:", error)
      })
  }

  render() {
    const { style, beforeStyle, afterStyle, lastUrlSegment } = this.state
    const { scenario } = this.props
    const { id, attributes } = scenario
    const {
      event,
      image,
      requester_firstname,
      donated,
      noun,
      verb,
      funding_goal,
      customMessage
    } = attributes

    return (
      <article
        className={`scenario ${lastUrlSegment}-scenario`}
        id={`scenario_${id}`}
        style={style}
        onTouchStart={e => this.handleTouchStart(e)}
        onTouchMove={e => this.handleTouchMove(e)}
        onTouchEnd={e => this.handleTouchEnd(e)}
      >
        <div className="pseudo-before" style={beforeStyle}>
          <p>Accept</p>
          <Icon icon="thumbs-up" />
        </div>
        <div className="pseudo-after" style={afterStyle}>
          <p>Dismiss</p>
          <Icon icon="ban" />
        </div>
        <figure className="scenario-image-wrap">
          <img src={image} alt={event} className="scenario-image" />
          <p className="scenario-image-caption">{event}</p>
        </figure>
        <div className="scenario-body">
          <header className="scenario-header">
            <h4 className="scenario-title">
              {`${toFirstCap(verb)} ${toFirstCap(
                requester_firstname
              )}'s ${noun}`}
            </h4>
          </header>

          <div className="scenario-description">{customMessage}</div>

          <div className="scenario-tags">
            <ul className="tag-list">
              <li className="tag">
                <a href="" className="tag-link">
                  #Donations
                </a>
              </li>
              <li className="tag">
                <a href="" className="tag-link">
                  #Jobs
                </a>
              </li>
              <li className="tag">
                <a href="" className="tag-link">
                  #Painting
                </a>
              </li>
              <li className="tag">
                <a href="" className="tag-link">
                  #Roofing
                </a>
              </li>
              <li className="tag">
                <a href="" className="tag-link">
                  #HurricaneKatrina
                </a>
              </li>
            </ul>
          </div>

          <footer className="scenario-footer">
            <div className="scenario-funding-goal">
              <h4>Funding goal:</h4>
              <div className="funding-goal-label">
                ${parseInt(donated, 10).toFixed(2)} / ${parseInt(
                  funding_goal,
                  10
                ).toFixed(2)}
              </div>
              <div
                className="funding-progress-slider"
                id={`${event}_fundingGoal`}
                style={{
                  background: `linear-gradient(to right, #24e051, #24e051 ${(
                    parseInt(donated, 10) /
                    funding_goal *
                    100
                  ).toFixed(0)}%, rgba(0, 0, 0, 0.1) ${(
                    parseInt(donated, 10) /
                    funding_goal *
                    100
                  ).toFixed(0)}%, rgba(0, 0, 0, 0.1))`
                }}
              />
            </div>
            <div className="scenario-task-wrap">
              <h4>Jobs:</h4>
              <div className="goals-list">Materials, Transportation, Volunteers</div>
            </div>
          </footer>
        </div>
        <a
          className="btn accept-scenario-btn"
          href={`/${id}/${lastUrlSegment}/`}
        >
          <Icon icon={faChevronDown} />
        </a>
      </article>
    )
  }
}
