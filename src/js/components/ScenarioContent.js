/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import Database from "../resources/Database"
import MiniMap from "./MiniMap"
import { getUrlPiece, toFirstCap } from "../resources/Util"
/*** [end of imports] ***/

export default class ScenarioContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lastUrlSegment: getUrlPiece(),
      lat: this.props.attributes.doerlat,
      lon: this.props.attributes.doerlon,
      subtasks: null,
      mapRefresh: 5000 // Every 5 seconds check for map pin changes
    }
  }

  getPins = () => {
    const { id } = this.props
    const { mapRefresh } = this.state

    setTimeout(() => {
      Database.getScenario({ id: id })
        .then(result => {
          const { doerlat, doerlon } = result.body.data.attributes
          this.setState({
            lat: doerlat,
            lon: doerlon
          })
          return [{ doerlat, doerlon }]
        })
        .catch(error => {
          // console.error("Error getting scenarios:", error)
          const { doerlat, doerlon } = this.props.attributes
          this.setState({
            lat: doerlat,
            lon: doerlon
          })
          return [{ doerlat, doerlon }]
        })
    }, mapRefresh)
  }
  getCheckboxes = () => {
    Database.getSubtasks({ id: this.props.scenarioId })
      .then(result => {
        // console.log("Subtasks found:", result)
        this.setState({
          subtasks: null
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          subtasks: null
        })
      })
  }

  render() {
    const { lastUrlSegment } = this.state
    const { id, attributes } = this.props
    const {
      requesterlat,
      requesterlon,
      event,
      image,
      donated,
      funding_goal,
      requester_firstname,
      noun
    } = attributes

    return (
      <div className="scenario-content-wrap">
        <div className="scenario-content-image-wrap">
          <img src={image} alt={event} className="scenario-content-image" />
          <p className="scenario-image-caption">{event}</p>
        </div>
        <div className="scenario-content-body">
        <header className="scenario-content-header"><h4>Help with {toFirstCap(requester_firstname)}'s {noun}</h4></header>
          <div className="funding-progress-wrap">
            <label className="funding-progress-label goal-label">
              Funding goal: ${parseInt(donated, 10).toFixed(2)} / ${parseInt(
                funding_goal,
                10
              ).toFixed(2)}
            </label>
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
            <label className="funding-progress-label complete-label">
              {(parseInt(donated, 10) / funding_goal * 100).toFixed(0)}%
              complete
            </label>
          </div>
          <div className="goal-progress-wrap">
            <div className="goal input-wrap checkbox-input-wrap complete-goal">
              <span className="input-label" htmlFor={`materials_${id}`}>
                Materials
              </span>
              <input
                className="form-input"
                type="checkbox"
                id={`materials_${id}`}
                checked={false}
                disabled
              />
            </div>
            <div className="goal input-wrap checkbox-input-wrap">
              <span className="input-label" htmlFor={`transportation_${id}`}>
                Transportation
              </span>
              <input
                className="form-input"
                type="checkbox"
                id={`transportation_${id}`}
                checked={false}
                disabled
              />
            </div>
            <div className="goal input-wrap checkbox-input-wrap">
              <span className="input-label" htmlFor={`volunteers_${id}`}>
                Volunteers
              </span>
              <input
                className="form-input"
                type="checkbox"
                id={`volunteers_${id}`}
                checked={false}
                disabled
              />
            </div>
            <div className="goal input-wrap checkbox-input-wrap">
              <span className="input-label" htmlFor={`mission_complete_${id}`}>
                Mission complete
              </span>
              <input
                className="form-input"
                type="checkbox"
                id={`mission_complete_${id}`}
                checked={false}
                disabled
              />
            </div>
          </div>
        </div>
        {lastUrlSegment !== "requester" &&
          lastUrlSegment !== "info" && (
            <MiniMap initialCenter={{ lat: requesterlat, lng: requesterlon }} />
          )}
        {lastUrlSegment === "info" && (
          <MiniMap
            initialCenter={{ lat: requesterlat, lng: requesterlon }}
            pins={this.getPins()}
          />
        )}
      </div>
    )
  }
}
