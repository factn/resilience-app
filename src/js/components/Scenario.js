/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import createHistory from "history/createBrowserHistory"
import Icon from "@fortawesome/react-fontawesome"
import {
  faCaretUp,
  faCaretRight,
  faCaretLeft,
  faHandPointUp,
  faArrowAltCircleDown,
  faCheck,
  faMapMarkerAlt
} from "@fortawesome/fontawesome-free-solid"

// Local JS
import Database from "../resources/Database"
import { toFirstCap, moneyfy, gradientPercent } from "../resources/Util"

// Logo image
import logo from "../../img/logo.svg"
/*** [end of imports] ***/

const history = createHistory()

export default class Scenario extends Component {
  constructor(props) {
    super(props)

    this.state = {
      xTransform: 0,
      yTransform: 0,
      touchStartX: 0,
      touchStartY: 0,
      lastTouchX: 0,
      lastTouchY: 0,
      style: {
        transform: `translateX(0) translateY(0) scale(${
          this.props.first ? 1 : 0.9
        })`
      },
      previewStyle: {
        opacity: 1,
        zIndex: 5
      },
      upStyle: {
        opacity: 0,
        zIndex: 0
      },
      leftStyle: {
        opacity: 0,
        zIndex: 0
      },
      rightStyle: {
        opacity: 0,
        zIndex: 0
      },
      upThreshold: -32,
      swipeThreshold: 150,
      transitionTiming: 100
    }

    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  componentDidMount = () => {
    this.setState({
      xTransform: 0,
      yTransform: 0,
      touchStartX: 0,
      touchStartY: 0,
      lastTouchX: 0,
      lastTouchY: 0,
      style: {
        transform: `translateX(0) translateY(0) scale(${
          this.props.first ? 1 : 0.9
        })`
      },
      upStyle: {
        opacity: 0,
        zIndex: 0
      },
      leftStyle: {
        opacity: 0,
        zIndex: 0
      },
      rightStyle: {
        opacity: 0,
        zIndex: 0
      },
      firstChecked: false
    })
  }

  handleTouchStart = e => {
    this.setState({
      touchStartX: e.targetTouches[0].clientX,
      touchStartY: e.targetTouches[0].clientY,
      style: {
        transform: `translateX(0) translateY(0) scale(${
          this.props.first ? 1 : 0.9
        })`,
        zIndex: 10
      }
    })
  }
  handleTouchMove = e => {
    const { touchStartX, touchStartY, upThreshold } = this.state
    const { first, previewDismissed } = this.props

    if (previewDismissed) {
      let currentTouchX = e.targetTouches[0].clientX
      let currentTouchY = e.targetTouches[0].clientY
      let xDif = currentTouchX - touchStartX
      let yDif = currentTouchY - touchStartY

      if (yDif < upThreshold) {
        this.setState({
          xTransform: xDif,
          yTransform: yDif,
          lastTouchX: currentTouchX,
          lastTouchY: currentTouchY,
          style: {
            transform: `translateX(${xDif}px) translateY(${yDif}px) scale(${
              first ? 1 : 0.9
            })`
          },
          upStyle: {
            opacity: 1,
            zIndex: 5
          },
          leftStyle: {
            opacity: 0,
            zIndex: 0
          },
          rightStyle: {
            opacity: 0,
            zIndex: 0
          }
        })
      } else {
        if (xDif > 0) {
          this.setState({
            xTransform: xDif,
            yTransform: yDif,
            lastTouchX: currentTouchX,
            lastTouchY: currentTouchY,
            style: {
              transform: `translateX(${xDif}px) translateY(${yDif}px) scale(${
                first ? 1 : 0.9
              })`
            },
            upStyle: {
              opacity: 0,
              zIndex: 0
            },
            leftStyle: {
              opacity: 1,
              zIndex: 5
            },
            rightStyle: {
              opacity: 0,
              zIndex: 0
            }
          })
        } else {
          this.setState({
            xTransform: xDif,
            yTransform: yDif,
            lastTouchX: currentTouchX,
            lastTouchY: currentTouchY,
            style: {
              transform: `translateX(${xDif}px) translateY(${yDif}px) scale(${
                first ? 1 : 0.9
              })`
            },
            upStyle: {
              opacity: 0,
              zIndex: 0
            },
            leftStyle: {
              opacity: 0,
              zIndex: 0
            },
            rightStyle: {
              opacity: 1,
              zIndex: 5
            }
          })
        }
      }
    }
  }
  handleTouchEnd = e => {
    const {
      touchStartX,
      touchStartY,
      lastTouchX,
      lastTouchY,
      swipeThreshold,
      upThreshold
    } = this.state

    let xDif = lastTouchX === 0 ? 0 : lastTouchX - touchStartX
    let yDif = lastTouchY === 0 ? 0 : lastTouchY - touchStartY

    if (Math.abs(xDif) > swipeThreshold || yDif < upThreshold) {
      if (this.props.nextItem) this.props.nextItem()
      if (yDif < upThreshold) {
        this.swipedUp()
      } else {
        if (touchStartX < lastTouchX) this.swipedRight()
        else this.swipedLeft()
      }
    } else {
      this.resetSwipePos()
    }
  }

  swipedUp = () => {
    this.setState({
      style: {
        transitionProperty: "transform margin, opacity, top, filter",
        transform: `translateX(0) translateY(-80vh) scale(${
          this.props.first ? 1 : 0.9
        })`,
        opacity: 0
      }
    })
  }
  swipedRight = () => {
    const { transitionTiming } = this.state
    const { id } = this.props.scenario

    this.setState({
      style: {
        transitionProperty: "transform margin, opacity, top, filter",
        transform: `translateX(100%) translateY(0) scale(${
          this.props.sfirst ? 1 : 0.9
        })`,
        opacity: 0
      }
    })

    setTimeout(() => {
      this.acceptScenario({ scenarioId: id })
    }, transitionTiming)
  }
  swipedLeft = () => {
    const { scenario, first } = this.props
    const { id } = scenario

    this.setState({
      style: {
        transitionProperty: "transform margin, opacity, top, filter",
        transform: `translateX(-100%) translateY(0) scale(${first ? 1 : 0.9})`,
        opacity: 0
      }
    })

    this.dismissScenario({ scenarioId: id })
  }
  resetSwipePos = () => {
    this.setState({
      style: {
        transform: `translateX(0) translateY(0) scale(${
          this.props.first ? 1 : 0.9
        })`,
        zIndex: 10
      },
      upStyle: {
        opacity: 0,
        zIndex: 0
      },
      leftStyle: {
        opacity: 0,
        zIndex: 0
      },
      rightStyle: {
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
              id: params.adType || "3",
              type: "ad_types"
            }
          },
          interaction_type: {
            data: {
              id: "2", // dismissal
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
              id: "3",
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
    const {
      style,
      previewStyle,
      upStyle,
      leftStyle,
      rightStyle,
      firstChecked
    } = this.state
    const { first, scenario, previewDismissed } = this.props
    const { id, attributes } = scenario
    const {
      event,
      image,
      requester_firstname,
      requester_lastname,
      donated,
      noun,
      verb,
      funding_goal,
      customMessage
    } = attributes

    if (first && !firstChecked) {
      this.setState({
        firstChecked: true,
        style: {
          transform: "translateX(0) translateY(0) scale(1)"
        }
      })
    }

    return (
      <article
        className={first ? "scenario first" : "scenario"}
        id={`scenario_${id}`}
        style={style}
        onTouchStart={e => this.handleTouchStart(e)}
        onTouchMove={e => this.handleTouchMove(e)}
        onTouchEnd={e => this.handleTouchEnd(e)}
      >
        {first &&
          !previewDismissed && (
            <div className="pseudo-preview" style={previewStyle}>
              <div className="action up-action">
                <div className="pseudo-main-text">Fund</div>
                <div className="pseudo-sub-text">full amount</div>
                <div className="arrow arrow-up">
                  <Icon icon={faCaretUp} />
                </div>
              </div>
              <div className="action right-action">
                <div className="pseudo-main-text">Donate</div>
                <div className="pseudo-sub-text">$0.20</div>
                <div className="arrow arrow-right">
                  <Icon icon={faCaretRight} />
                </div>
              </div>
              <div className="action left-action">
                <div className="pseudo-main-text">Dismiss</div>
                <div className="pseudo-sub-text">don't fund</div>
                <div className="arrow arrow-left">
                  <Icon icon={faCaretLeft} />
                </div>
              </div>
              <div className="touch-icon">
                <Icon icon={faHandPointUp} />
              </div>
              <div className="action down-action">
                <button
                  className="btn btn-lite preview-dismiss-btn"
                  onClick={() => this.props.dismissPreview()}
                >
                  Start Mission
                </button>
              </div>
            </div>
          )}
        <div className="pseudo-up" style={upStyle}>
          <div className="action down-action">
            <div className="pseudo-main-text">Fund</div>
            <div className="pseudo-sub-text">full amount</div>
            <div className="arrow arrow-up">
              <Icon icon={faCaretUp} />
            </div>
          </div>
        </div>
        <div className="pseudo-before" style={leftStyle}>
          <div className="action left-action">
            <div className="pseudo-main-text">Donate</div>
            <div className="pseudo-sub-text">$0.20</div>
            <div className="arrow arrow-right">
              <Icon icon={faCaretRight} />
            </div>
          </div>
        </div>
        <div className="pseudo-after" style={rightStyle}>
          <div className="action right-action">
            <div className="pseudo-main-text">Dismiss</div>
            <div className="pseudo-sub-text">don't fund</div>
            <div className="arrow arrow-left">
              <Icon icon={faCaretLeft} />
            </div>
          </div>
        </div>
        <figure className="scenario-image-wrap">
          <img src={image} alt={event} className="scenario-image" />
        </figure>
        <div className="scenario-body">
          <header className="scenario-header">
            <h4 className="scenario-title">
              {`${toFirstCap(verb)} ${toFirstCap(
                requester_firstname
              )}'s ${noun}`}
            </h4>
          </header>

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
          <div className="scenario-severity">Urgent
          </div></section>

          <footer className="scenario-footer">
            <div className="funding-goal-label">
              To fully fund{" "}
              <span className="dollar-amount">{moneyfy(funding_goal - donated)}</span>
            </div>
            <div
              className="funding-progress-slider"
              id={`${event}_fundingGoal`}
              style={{
                background: `linear-gradient(to right, #24e051, #24e051 ${gradientPercent(
                  donated,
                  funding_goal
                )}%, #fff ${gradientPercent(donated, funding_goal)}%, #fff)`
              }}
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
        <a className="btn accept-scenario-btn" href={`/${id}/info/`}>
          <Icon icon={faArrowAltCircleDown} />
        </a>
      </article>
    )
  }
}
