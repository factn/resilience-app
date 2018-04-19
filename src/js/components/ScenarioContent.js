/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import Database from "../resources/Database"
import {
  getUrlPiece,
  toFirstCap,
  moneyfy,
  gradientPercent
} from "../resources/Util"
/*** [end of imports] ***/

export default class ScenarioContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lastUrlSegment: getUrlPiece(),
      lat: this.props.attributes.doerlat,
      lon: this.props.attributes.doerlon,
      subtasks: null,
      mapRefresh: 5000, // Every 5 seconds check for map pin changes
      activeTab: "Overview"
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
  changeTab = tabName => {
    this.setState({
      activeTab: tabName
    })
  }

  render() {
    const { activeTab } = this.state
    const { attributes } = this.props
    const {
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

        <header className="scenario-content-header">
          <h4>
            Help with {toFirstCap(requester_firstname)}'s {noun}
          </h4>
        </header>

        <section className="scenario-content-body">
          <ul className="scenario-tab-list">
            <li
              className={
                activeTab === "Overview"
                  ? "scenario-tab-link active"
                  : "scenario-tab-link"
              }
              onClick={() => this.changeTab("Overview")}
            >
              Overview
            </li>
            <li
              className={
                activeTab === "Updates"
                  ? "scenario-tab-link active"
                  : "scenario-tab-link"
              }
              onClick={() => this.changeTab("Updates")}
            >
              Updates
            </li>
            <li
              className={
                activeTab === "Workers"
                  ? "scenario-tab-link active"
                  : "scenario-tab-link"
              }
              onClick={() => this.changeTab("Workers")}
            >
              Workers
            </li>
          </ul>
          <div className="scenario-tab-wrap">
            <article
              className={
                activeTab === "Overview"
                  ? "scenario-tab active"
                  : "scenario-tab"
              }
            >
              Overview
            </article>
            <article
              className={
                activeTab === "Updates" ? "scenario-tab active" : "scenario-tab"
              }
            >
              Updates
            </article>
            <article
              className={
                activeTab === "Workers" ? "scenario-tab active" : "scenario-tab"
              }
            >
              Workers
            </article>
          </div>
        </section>

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
                )}%, rgba(0, 0, 0, 0.1) ${gradientPercent(
                  donated,
                  funding_goal
                )}%, rgba(0, 0, 0, 0.1))`
              }}
            />
          </div>

          <div className="scenario-task-wrap">
            <h4>Jobs:</h4>
            <div className="goals-list">
              Materials, Transportation, Volunteers
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
