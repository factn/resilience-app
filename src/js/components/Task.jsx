/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import {
  faThumbsDown,
  faComment,
  faThumbsUp
} from "@fortawesome/fontawesome-free-solid"
/*** [end of imports] ***/

export default class Info extends Component {
  state = {
    xTransform: 0,
    touchStartX: 0,
    lastTouchX: 0,
    leftSwipeThreshold: -16 * 5, // 5rem per button
    rightSwipeThreshold: 16 * 5 * 2, // 5rem per button
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
        transform: "translateX(0)"
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
          transform: `translateX(${rightSwipeThreshold}px)`
        }
      })
    } else if (xDif <= leftSwipeThreshold) {
      this.setState({
        style: {
          transform: `translateX(${leftSwipeThreshold}px)`
        }
      })
    } else {
      this.setState({
        style: {
          transform: `translateX(${xDif}px)`
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
        transform: "translateX(0)"
      }
    })
  }

  render() {
    const { style, moving } = this.state
    const { name, status, reviewStatus, finishedDate } = this.props

    return (
      <section className={moving ? "task-wrap moving" : "task-wrap"}>
        <div className="before-task-actions">
          <div className="task-action orange-action">
            <Icon icon={faThumbsDown} className="task-action-icon" />
            <div className="task-label">Not quite</div>
          </div>
          <div className="task-action gray-action">
            <Icon icon={faComment} className="task-action-icon" />
            <div className="task-label">Comment</div>
          </div>
        </div>
        <div
          className={moving ? "task moving" : "task"}
          style={style}
          onTouchStart={e => this.handleTouchStart(e)}
          onTouchMove={e => this.handleTouchMove(e)}
          onTouchEnd={e => this.handleTouchEnd(e)}>
          <div className="task-name">{name}</div>
          <div className={status !== "In progress" ? "status light-status" : "status"}>
            {status === "To review" && reviewStatus}
            {status === "Finished" && `Finished ${finishedDate}`}
            {status === "In progress" && "In progress"}
          </div>
        </div>
        <div className="after-task-actions">
          <div className="task-action green-action">
            <Icon icon={faThumbsUp} className="task-action-icon" />
            <div className="task-label">Finished!</div>
          </div>
        </div>
      </section>
    )
  }
}
