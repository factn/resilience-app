/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
/*** [end of imports] ***/


export default class Info extends Component {
  state = {
    xTransform: 0,
    touchStartX: 0,
    lastTouchX: 0,
    swipeThreshold: 128,
    transitionTiming: 100,
    style: {
      transform: "translateX(0)"
    }
  }

  handleTouchStart = e => {
    this.setState({
      touchStartX: e.targetTouches[0].clientX,
      style: {
        transform: "translateX(0)"
      }
    })
  }

  handleTouchMove = e => {
    const { touchStartX } = this.state

    const currentTouchX = e.targetTouches[0].clientX
    const xDif = currentTouchX - touchStartX

    this.setState({
      xTransform: xDif,
      lastTouchX: currentTouchX,
      style: {
        transform: `translateX(${xDif}px)`
      }
    })
  }

  handleTouchEnd = e => {
    const { touchStartX, lastTouchX, swipeThreshold } = this.state

    let xDif = lastTouchX === 0 ? 0 : lastTouchX - touchStartX

    if (xDif >= swipeThreshold) {
      this.resetSwipePos()
      
    } else {
      this.resetSwipePos()
    }
  }

  render () {
    const { name, status, reviewStatus, finishedDate } = this.props

    return (
      <div className="task">
        <div className="task-name">{name}</div>
        <div className="status">
          {status === "To review" && reviewStatus}
          {status === "Finished" && `Finished ${finishedDate}`}
          {status === "In progress" && "In progress"}
        </div>
      </div>
    )
  }
}