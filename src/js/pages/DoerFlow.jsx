/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/fontawesome-free-solid"

// Page wrapper
import Page from "./Page"

// Page elements
import SessionSetting from "../components/SessionSetting"
import SessionCard from "../components/SessionCard"
import TagList from "../components/TagList"

// Utilities
import { gradientStyle } from "../resources/Util"
/*** [end of imports] ***/

export default class DoerFlow extends Component {
  state = {
    timeFrame: "urgent", // "urgent" || "semi-urgent" || "important"
    workAbroad: false,
    workDistance: 40,
    distanceMax: 100
  }

  setTimeframe = timeFrame => {
    this.setState({
      timeFrame
    })
  }
  toggleWorkAbroad = () => {
    this.setState({
      workAbroad: !this.state.workAbroad
    })
  }
  setWorkdistance = e => {
    const workDistance = e.target.value

    this.setState({
      workDistance
    })

    return workDistance
  }

  render() {
    const { timeFrame, workAbroad, workDistance, distanceMax } = this.state

    let sliderStyle = gradientStyle({
      dividend: workDistance,
      divisor: distanceMax,
      startColor: "#f39c12",
      endColor: "rgba(0, 0, 0, 0.1)"
    })

    let exampleTagList = [
      {
        label: "Painting",
        active: true
      },
      {
        label: "Roofing",
        active: true
      },
      {
        label: "Transport",
        active: false
      },
      {
        label: "Coding",
        active: false
      },
      {
        label: "FirstAid",
        active: false
      },
      {
        label: "Childcare",
        active: false
      }
    ]

    const footer = (
      <Link to="/feed/doer" className="btn footer-btn feed-btn">
        View Jobs
      </Link>
    )

    return (
      <Page className="flow-page doer-flow-page" footer={footer}>
        <SessionSetting headerLabel="Jobs I want to do">
          <SessionCard className="trending-card" cardTitle="Select from trending jobs">
            <div className="card-content">
              <TagList list={exampleTagList} />
            </div>
          </SessionCard>

          <SessionSetting headerLabel="Time frame" clas="timeframe-settings">
            <article
              className={
                timeFrame === "urgent"
                  ? "card btn-card active"
                  : "card btn-card"
              }
              onClick={() => this.setTimeframe("urgent")}
            >
              <h4>Urgent Jobs (next 24 hours)</h4>
            </article>
            <article
              className={
                timeFrame === "semi-urgent"
                  ? "card btn-card active"
                  : "card btn-card"
              }
              onClick={() => this.setTimeframe("semi-urgent")}
            >
              <h4>Semi-Urgent Jobs (next 1-2 days)</h4>
            </article>
            <article
              className={
                timeFrame === "important"
                  ? "card btn-card active"
                  : "card btn-card"
              }
              onClick={() => this.setTimeframe("important")}
            >
              <h4>Important Jobs (within the next week)</h4>
            </article>
          </SessionSetting>

          <SessionCard cardTitle="Location">
            <div className="card-area location-city">
              <div className="location-label">Location</div>
              <div className="location-current">Pearlington, MI</div>
              <div className="location-icon">
                <Icon icon={faChevronRight} />
              </div>
            </div>

            <div className="card-area home-and-abroad-toggle">
              <div className="toggle-row">
                <div className="toggle-label">Max Travel</div>
                <div className={workAbroad ? "toggle on" : "toggle"} onClick={() => this.toggleWorkAbroad()}>
                  <div className="toggle-button" />
                </div>
              </div>

              <div className={workAbroad ? "card-area travel-distance" : "card-area travel-distance disabled-card-area"}>
                <label className="travel-range-label range-label" htmlFor="travelDistanceSlider">
                  {workDistance} miles
                </label>
                <input
                  type="range"
                  className="range-slider"
                  id="travelDistanceSlider"
                  min="0"
                  max={distanceMax}
                  step="10"
                  value={workDistance}
                  onChange={e => this.setWorkdistance(e)}
                  style={sliderStyle}
                />
              </div>
            </div>
          </SessionCard>
        </SessionSetting>
      </Page>
    )
  }
}
