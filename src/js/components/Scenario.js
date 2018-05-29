/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
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

// Page elements
import TagList from "./TagList"

// Local JS
import Database from "../resources/Database"
import { toFirstCap, moneyfy, gradientStyle } from "../resources/Util"
/*** [end of imports] ***/

export default class Scenario extends Component {
  state = {
    xTransform: 0,
    yTransform: 0,
    touchStartX: 0,
    touchStartY: 0,
    lastTouchX: 0,
    lastTouchY: 0,
    style: {
      transform: `translateX(0) translateY(0) scale(${this.props.first ? 1 : 0.9})`
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
    swipeThreshold: 128,
    transitionTiming: 100
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
        transform: `translateX(0) translateY(0) scale(${this.props.first ? 1 : 0.9})`
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

  actionsBuild = () => {
    const { previewStyle, upStyle, leftStyle, rightStyle } = this.state
    const { first, previewDismissed, feedType, dismissPreview } = this.props

    if (feedType === "donor") {
      return (
        <Fragment>
          {first &&
            !previewDismissed && (
              <div className="pseudo-preview" style={previewStyle}>
                <PreviewAction direction="up" mainText="Fund" subText="full amount" />
                <PreviewAction direction="right" mainText="Donate" subText="$1.00" />
                <PreviewAction direction="left" mainText="Dismiss" subText="don't fund" />
                <TouchIcon />
                <DismissButton dismissPreview={dismissPreview} />
              </div>
            )}
          <PseudoAction direction="up" style={upStyle} mainText="Fund" subText="full amount" />
          <PseudoAction direction="before" style={leftStyle} mainText="Donate" subText="$1.00" />
          <PseudoAction direction="after" style={rightStyle} mainText="Dismiss" subText="don't fund" />
        </Fragment>
      )
    } else if (feedType === "doer") {
      return (
        <Fragment>
          {first &&
            !previewDismissed && (
              <div className="pseudo-preview" style={previewStyle}>
                <PreviewAction direction="right" mainText="Accept" subText="do this job" />
                <PreviewAction direction="left" mainText="Dismiss" subText="don't do job" />
                <TouchIcon />
                <DismissButton dismissPreview={dismissPreview} />
              </div>
            )}
          <PseudoAction direction="before" style={leftStyle} mainText="Accept" subText="do this job" />
          <PseudoAction direction="after" style={rightStyle} mainText="Dismiss" subText="don't do job" />
        </Fragment>
      )
    } else {
      return <Fragment />
    }
  }
  footerBuild = () => {
    const { feedType, scenario } = this.props
    const { event, donated, funding_goal } = scenario.attributes

    let fundingGoalSliderStyle = gradientStyle({
      dividend: donated,
      divisor: funding_goal,
      endColor: "#fff"
    })

    if (feedType === "donor") {
      return (
        <footer className="scenario-footer">
          <div className="funding-top-row">
            <div className="funding-doubler">
              <span>Donations doubled by </span>
              <span className="doubler-name">Home Depot</span>
            </div>
            <div className="funding-goal-label">
              <span>To fully fund </span>
              <span className="dollar-amount">{moneyfy(funding_goal - donated)}</span>
            </div>
          </div>
          <div className="funding-progress-slider" id={`${event}_fundingGoal`} style={fundingGoalSliderStyle} />
          <div className="funding-goal-label">
            Target <span className="dollar-amount">{moneyfy(funding_goal)}</span>
          </div>
          <div className="funding-goal-summary">1 donor(s), {moneyfy(donated)} donated</div>
        </footer>
      )
    } else if (feedType === "doer") {
      const list = [
        {
          label: "Roofing",
          active: true
        },
        {
          label: "Labor",
          active: false
        },
        {
          label: "Painting",
          active: false
        },
        {
          label: "Transport",
          active: false
        },
        {
          label: "Building",
          active: false
        }
      ]

      return (
        <footer className="scenario-footer">
          <div className="tag-list-wrap">
            <span className="tag-list-label">Work needed:</span>
            <TagList list={list} />
          </div>
        </footer>
      )
    } else {
      return <footer className="scenario-footer" />
    }
  }

  handleTouchStart = e => {
    this.setState({
      touchStartX: e.targetTouches[0].clientX,
      touchStartY: e.targetTouches[0].clientY,
      style: {
        transform: `translateX(0) translateY(0) scale(${this.props.first ? 1 : 0.9})`,
        zIndex: 10
      }
    })
  }
  handleTouchMove = e => {
    const { touchStartX, touchStartY } = this.state
    const { first, previewDismissed } = this.props

    if (previewDismissed) {
      let currentTouchX = e.targetTouches[0].clientX
      let currentTouchY = e.targetTouches[0].clientY
      let xDif = currentTouchX - touchStartX
      let yDif = currentTouchY - touchStartY

      if (Math.abs(yDif) > Math.abs(xDif)) {
        this.setState({
          xTransform: xDif,
          yTransform: yDif,
          lastTouchX: currentTouchX,
          lastTouchY: currentTouchY,
          style: {
            transform: `translateX(${xDif}px) translateY(${yDif}px) scale(${first ? 1 : 0.9})`
          },
          upStyle: {
            opacity: yDif < 1,
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
              transform: `translateX(${xDif}px) translateY(${yDif}px) scale(${first ? 1 : 0.9})`
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
              transform: `translateX(${xDif}px) translateY(${yDif}px) scale(${first ? 1 : 0.9})`
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
    const { touchStartX, touchStartY, lastTouchX, lastTouchY, swipeThreshold } = this.state

    let xDif = lastTouchX === 0 ? 0 : lastTouchX - touchStartX
    let yDif = lastTouchY === 0 ? 0 : lastTouchY - touchStartY

    // trying to avoid some false positives:
    let dist = Math.sqrt(xDif * xDif + yDif * yDif)
    let largeMove = Math.abs(dist) >= swipeThreshold
    let isUpDown = Math.abs(yDif) > Math.abs(xDif)

    if (largeMove) {
      if (isUpDown && yDif < swipeThreshold) {
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
    const { transitionTiming } = this.state
    const { scenario } = this.props
    const { donated, funding_goal } = scenario.attributes

    const json = {
      scenarioId: scenario.id
    }

    if (this.adType() === "3") {
      // Donations
      json["amount"] = funding_goal - donated
    }

    this.setState({
      style: {
        transitionProperty: "transform margin, opacity, top, filter",
        transform: `translateX(0) translateY(-80vh) scale(${this.props.first ? 1 : 0.9})`,
        opacity: 0
      }
    })
    if (this.props.nextItem) {
      this.props.nextItem({
        directionSwiped: "up",
        fullFundAmount: funding_goal - donated
      })
    }

    setTimeout(() => {
      this.acceptScenario(json)
    }, transitionTiming)
  }
  swipedRight = () => {
    const { transitionTiming } = this.state
    const { scenario, feedType, standardAmount } = this.props

    const json = {
      scenarioId: scenario.id
    }

    if (this.adType() === "3") json["amount"] = standardAmount

    this.setState({
      style: {
        transitionProperty: "transform margin, opacity, top, filter",
        transform: `translateX(100%) translateY(0) scale(${this.props.first ? 1 : 0.9})`,
        opacity: 0
      }
    })

    if (this.props.nextItem) this.props.nextItem({ directionSwiped: "right" })

    if (feedType === "doer") {
      setTimeout(() => {
        this.props.doerPageRoute()
      }, transitionTiming)
    } else {
      setTimeout(() => {
        this.acceptScenario(json)
      }, transitionTiming)
    }
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

    if (this.props.nextItem) {
      this.props.nextItem({ directionSwiped: "left" })
    }

    this.dismissScenario({ scenarioId: id })
  }
  resetSwipePos = () => {
    this.setState({
      style: {
        transform: `translateX(0) translateY(0) scale(${this.props.first ? 1 : 0.9})`,
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

  adType = () => {
    const { feedType } = this.props

    if (feedType === "doer") return "1"
    else if (feedType === "requester") return "2"
    return "3" // feedType === "donor"
  }
  dismissScenario = params => {
    const json = {
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
              id: this.adType(),
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
    const json = {
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
              id: this.adType(),
              type: "ad_types"
            }
          },
          interaction_type: {
            data: {
              id: "1", // Positive interaction
              type: "interaction_types"
            }
          }
        }
      }
    }

    Database.createUserAdInteraction(json)
      .then(result => {
        // console.log("User ad interaction successfully created:", result)
        if (this.adType() === "3") {
          this.donate({
            amount: params.amount,
            scenarioId: params.scenarioId
          })
        }
      })
      .catch(error => {
        // console.error("Error creating user ad interaction:", error)
      })
  }
  donate = params => {
    const json = {
      data: {
        type: "donations",
        attributes: {
          amount: params.amount
        },
        relationships: {
          scenario: {
            data: {
              id: params.scenarioId,
              type: "scenarios"
            }
          },
          donator: {
            data: {
              type: "users",
              id: "1"
            }
          }
        }
      }
    }

    Database.createDonation(json)
      .then(result => {
        // console.log("Donation successfully created:", result)
      })
      .catch(error => {
        // console.error("Error creating donation:", error)
      })
  }

  render() {
    const { style, firstChecked } = this.state
    const { first, second, scenario } = this.props
    const { id, attributes } = scenario
    const { event, image, requester_firstname, requester_lastname, noun, verb, customMessage } = attributes
    let clas

    if (first && !firstChecked) {
      this.setState({
        firstChecked: true,
        style: {
          transform: "translateX(0) translateY(0) scale(1)"
        }
      })
    }

    if (first) {
      clas = "scenario first"
    } else {
      if (second) {
        clas = "scenario second"
      } else {
        clas = "scenario third"
      }
    }

    return (
      <article
        className={clas}
        id={`scenario_${id}`}
        style={style}
        onTouchStart={e => this.handleTouchStart(e)}
        onTouchMove={e => this.handleTouchMove(e)}
        onTouchEnd={e => this.handleTouchEnd(e)}>
        {this.actionsBuild()}
        <figure className="scenario-image-wrap">
          <img src={image} alt={event} className="scenario-image" />
        </figure>
        <div className="scenario-body">
          <header className="scenario-header">
            <h4 className="scenario-title">{`${toFirstCap(verb)} ${toFirstCap(requester_firstname)}'s ${noun}`}</h4>
          </header>

          <section className="scenario-subheader">
            <div className="user-info">
              <figure className="user-avatar" />
              <div className="user-name">
                <Link to="/reputation/2">
                  {" "}
                  {/* TODO: Put requester id here, may require additional query oddly enough */}
                  {requester_firstname} {requester_lastname}
                </Link>
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
            {customMessage ||
              "My roof was blown off in Hurricane Katrina. I need your help to fix it. Can have more info here to help tell the story and convince people to do this."}
          </div>

          <section className="scenario-tags">
            <div className="scenario-event-location">{event}</div>
            <div className="scenario-severity">Urgent</div>
          </section>

          {this.footerBuild()}
        </div>
        <Link className="btn scenario-footer-btn accept-scenario-btn" to={`/${id}/donor/`}>
          <Icon icon={faArrowAltCircleDown} />
        </Link>
      </article>
    )
  }
}

/* Actions */

const PreviewAction = props => (
  <div className={`action ${props.direction}-action`}>
    <div className="pseudo-main-text">{props.mainText}</div>
    <div className="pseudo-sub-text">{props.subText}</div>
    <div className={`arrow arrow-${props.direction}`}>
      {props.direction === "up" && <Icon icon={faCaretUp} />}
      {props.direction === "right" && <Icon icon={faCaretRight} />}
      {props.direction === "left" && <Icon icon={faCaretLeft} />}
    </div>
  </div>
)

class PseudoAction extends Component {
  render() {
    const { direction, style, mainText, subText } = this.props

    let actionType
    let arrow

    if (direction === "up") {
      actionType = "down"
      arrow = (
        <div className="arrow arrow-up">
          <Icon icon={faCaretUp} />
        </div>
      )
    } else if (direction === "before") {
      actionType = "left"
      arrow = (
        <div className="arrow arrow-right">
          <Icon icon={faCaretRight} />
        </div>
      )
    } else if (direction === "after") {
      actionType = "right"
      arrow = (
        <div className="arrow arrow-left">
          <Icon icon={faCaretLeft} />
        </div>
      )
    }

    return (
      <div className={`pseudo-${direction}`} style={style}>
        <div className={`action ${actionType}-action`}>
          <div className="pseudo-main-text">{mainText}</div>
          <div className="pseudo-sub-text">{subText}</div>
          {arrow}
        </div>
      </div>
    )
  }
}

const DismissButton = props => (
  <div className="action down-action">
    <button className="btn preview-dismiss-btn" onClick={() => props.dismissPreview()}>
      Got it
    </button>
  </div>
)

const TouchIcon = () => (
  <div className="touch-icon">
    <Icon icon={faHandPointUp} />
  </div>
)

/* [ end Actions ] */
