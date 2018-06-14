/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faThumbsDown, faComment, faThumbsUp } from "@fortawesome/fontawesome-free-solid"

// Local JS Utilities
import Database from "../resources/Database"
import { moneyfy } from "../resources/Util"

// Images
import genericAvatar from "../../img/fb-profile.jpg"
/*** [end of imports] ***/

export default class Task extends Component {
  state = {
    xTransform: 0,
    touchStartX: 0,
    lastTouchX: 0,
    leftSwipeThreshold: -16 * 5 * 2, // 5rem per button
    rightSwipeThreshold: 16 * 5, // 5rem per button
    moving: false,
    style: {
      transform: "translateX(0)"
    }
  }

  handleTouchStart = e => {
    this.setState({
      touchStartX: e.targetTouches[0].clientX,
      moving: true,
      style: {
        transform: "translateX(0)",
        transition: "transform 0.1s cubic-bezier(0.73, 0.2, 0.43, 1)"
      }
    })
  }

  handleTouchMove = e => {
    const { touchStartX, leftSwipeThreshold, rightSwipeThreshold } = this.state

    const currentTouchX = e.targetTouches[0].clientX
    const xDif = currentTouchX - touchStartX

    this.setState({
      xTransform: xDif,
      lastTouchX: currentTouchX
    })

    if (xDif >= rightSwipeThreshold) {
      this.setState({
        style: {
          transform: `translateX(${rightSwipeThreshold}px)`,
          transition: "none"
        }
      })
    } else if (xDif <= leftSwipeThreshold) {
      this.setState({
        style: {
          transform: `translateX(${leftSwipeThreshold}px)`,
          transition: "none"
        }
      })
    } else {
      this.setState({
        style: {
          transform: `translateX(${xDif}px)`,
          transition: "none"
        }
      })
    }
  }

  handleTouchEnd = e => {
    const { touchStartX, lastTouchX, leftSwipeThreshold, rightSwipeThreshold } = this.state

    const xDif = lastTouchX - touchStartX

    if (xDif >= rightSwipeThreshold) {
    } else if (xDif <= leftSwipeThreshold) {
    } else {
      this.resetSwipePos()
    }
  }

  resetSwipePos = () => {
    this.setState({
      xTransform: 0,
      touchStartX: 0,
      lastTouchX: 0,
      moving: false,
      style: {
        transform: "translateX(0)",
        transition: "none",
        boxShadow: "none"
      }
    })
  }

  vouch = params => {
    const json = {
      type: "vouches",
      attributes: {
        description: params.comment || ""
      },
      relationships: {
        scenario: {
          data: {
            type: "scenarios",
            id: "1"
          }
        },
        verifier: {
          data: {
            type: "users",
            id: "1"
          }
        }
      }
    }

    Database.createVouch(json)
      .then(result => {
        // console.log("Vouch complete:", result)

        this.setUserCookie(result)
      })
      .catch(error => {
        // console.error("Error vouching:", error)
      })
  }

  render() {
    const { style, moving } = this.state
    const { name, price, avatar } = this.props

    return (
      <section className={moving ? "task-wrap moving" : "task-wrap"}>
        <div className="task-action-wrapper before-task-actions">
          <div className="task-action green-action" onClick={() => this.vouch()}>
            <Icon icon={faThumbsUp} className="task-action-icon" />
            <div className="task-label">Finished!</div>
          </div>
        </div>
        <div
          className={moving ? "task moving" : "task"}
          style={style}
          onClick={() => this.resetSwipePos()}
          onTouchStart={e => this.handleTouchStart(e)}
          onTouchMove={e => this.handleTouchMove(e)}
          onTouchEnd={e => this.handleTouchEnd(e)}>
          <div className="worker-avatar-wrap">
            <div
              className="worker-avatar"
              style={{
                backgroundImage: `url("${avatar || genericAvatar}")`
              }}
            />
          </div>
          <div className="task-name">{name}</div>
          <div className="price">{moneyfy(price, 2)}</div>
        </div>
        <div className="task-action-wrapper after-task-actions">
          <div className="task-action orange-action" onClick={() => this.vouch()}>
            <Icon icon={faThumbsDown} className="task-action-icon" />
            <div className="task-label">Not quite</div>
          </div>
          <div className="task-action gray-action" onClick={() => this.vouch()}>
            <Icon icon={faComment} className="task-action-icon" />
            <div className="task-label">Comment</div>
          </div>
        </div>
      </section>
    )
  }
}
