/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import createHistory from "history/createBrowserHistory"
import Icon from "@fortawesome/react-fontawesome"
import {
  faChevronDown,
  faCaretUp,
  faCaretRight,
  faCaretLeft,
  faHandPointUp
} from "@fortawesome/fontawesome-free-solid"

// Local JS
import Database from "../resources/Database"
import {
  getUrlPiece,
  toFirstCap,
  moneyfy,
  gradientPercent
} from "../resources/Util"

// Logo image
import logo from "../../img/logo.svg"
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
      previewDismissed: false,
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
        yTransform: 0,
        touchStartX: 0,
        touchStartY: 0,
        lastTouchX: 0,
        lastTouchY: 0,
        style: { transform: "translateX(0) translateY(0)" },
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
  }

  dismissPreview = () => {
    this.setState({
      previewStyle: {
        opacity: 0,
        zIndex: 0
      },
      previewDismissed: true
    })
  }

  handleTouchStart = e => {
    this.setState({
      touchStartX: e.targetTouches[0].clientX,
      touchStartY: e.targetTouches[0].clientY,
      style: {
        transform: "translateX(0) translateY(0)",
        zIndex: 10
      }
    })
  }
  handleTouchMove = e => {
    const {
      touchStartX,
      touchStartY,
      upThreshold,
      previewDismissed
    } = this.state

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
            transform: `translateX(${xDif}px) translateY(${yDif}px)`
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
              transform: `translateX(${xDif}px) translateY(${yDif}px)`
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
              transform: `translateX(${xDif}px) translateY(${yDif}px)`
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
      transform: "translateX(0) translateY(-80vh)"
    })
  }
  swipedRight = () => {
    this.setState({
      transform: "translateX(100%) translateY(0)"
    })
    // const { transitionTiming, lastUrlSegment } = this.state
    // const { id } = this.props.scenario
    // setTimeout(() => {
    //   this.acceptScenario({ scenarioId: id })
    //   history.push(`/${id}/${lastUrlSegment}/`)
    //   window.location = `/${id}/${lastUrlSegment}/`
    // }, transitionTiming)
  }
  swipedLeft = () => {
    this.setState({
      transform: "translateX(-100%) translateY(0)"
    })
    // const { lastUrlSegment } = this.state
    // const { id } = this.props.scenario
    // let adType
    // if (lastUrlSegment === "doer") adType = "1"
    // else if (lastUrlSegment === "requester") adType = "2"
    // else if (lastUrlSegment === "donator") adType = "3"
    // else if (lastUrlSegment === "verifier") adType = "4"
    // })
    // this.dismissScenario({ scenarioId: id, adType: adType })
  }
  resetSwipePos = () => {
    this.setState({
      style: {
        transform: "translateX(0) translateY(0)",
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
    const {
      style,
      previewStyle,
      upStyle,
      leftStyle,
      rightStyle,
      lastUrlSegment
    } = this.state
    const { id, attributes } = this.props.scenario
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
        className="scenario"
        id={`scenario_${id}`}
        style={style}
        onTouchStart={e => this.handleTouchStart(e)}
        onTouchMove={e => this.handleTouchMove(e)}
        onTouchEnd={e => this.handleTouchEnd(e)}
      >
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
              onClick={() => this.dismissPreview()}
            >
              Start Mission
            </button>
          </div>
        </div>
        <div className="pseudo-up" style={upStyle}>
          <div className="action up-action">
            <div className="pseudo-main-text">Fund</div>
            <div className="pseudo-sub-text">full amount</div>
            <div className="arrow arrow-up">
              <Icon icon={faCaretUp} />
            </div>
          </div>
        </div>
        <div className="pseudo-before" style={leftStyle}>
          <div className="action right-action">
            <div className="pseudo-main-text">Donate</div>
            <div className="pseudo-sub-text">$0.20</div>
            <div className="arrow arrow-right">
              <Icon icon={faCaretRight} />
            </div>
          </div>
        </div>
        <div className="pseudo-after" style={rightStyle}>
          <div className="action left-action">
            <div className="pseudo-main-text">Dismiss</div>
            <div className="pseudo-sub-text">don't fund</div>
            <div className="arrow arrow-left">
              <Icon icon={faCaretLeft} />
            </div>
          </div>
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

          <div className="scenario-description">
            {customMessage ||
              "My roof was blown off in Hurricane Katrina. I need your help to fix it. Can have more info here to help tell the story and convince people to do this."}
          </div>

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
                {moneyfy(donated)} / {moneyfy(funding_goal)}
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
            </div>

            <div className="scenario-task-wrap">
              <h4>Jobs:</h4>
              <ul className="goals-list">
                <li className="goal-icon complete-goal">
                  <img src={logo} alt="Goal" />
                </li>
                <li className="goal-icon complete-goal">
                  <img src={logo} alt="Goal" />
                </li>
                <li className="goal-icon">
                  <img src={logo} alt="Goal" />
                </li>
                <li className="goal-icon">
                  <img src={logo} alt="Goal" />
                </li>
                <li className="goal-icon">
                  <img src={logo} alt="Goal" />
                </li>
              </ul>
            </div>
          </footer>
        </div>
        <a className="btn accept-scenario-btn" href={`/${id}/info/`}>
          <Icon icon={faChevronDown} />
        </a>
      </article>
    )
  }
}
