/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/fontawesome-free-solid"

// Page elements
import Page from "./Page"
import Main from "../components/Main"
import Footer from "../components/Footer"
import SessionSetting from "../components/SessionSetting"
import SessionCard from "../components/SessionCard"

// Utilities
import { gradientStyle } from "../resources/Util"
/*** [end of imports] ***/

export default class DoerFlow extends Component {
  state = {
    workAbroad: false,
    workDistance: 40,
    distanceMax: 100
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
    const { workAbroad, workDistance, distanceMax } = this.state

    let sliderStyle = gradientStyle({
      dividend: workDistance,
      divisor: distanceMax,
      startColor: "#f39c12",
      endColor: "rgba(0, 0, 0, 0.1)"
    })

    return (
      <Page clas="flow-page doer-flow-page">
        <Main>
          <SessionSetting headerLabel="Jobs I want">
            <SessionCard clas="trending-card" cardTitle="Description">
              <div className="card-content">
                <ul className="tag-list">
                  <li className="tag active-tag tag-button">#Painting</li>
                  <li className="tag active-tag tag-button">#Roofing</li>
                  <li className="tag inactive-tag tag-button">#Transport</li>
                  <li className="tag inactive-tag tag-button">#Coding</li>
                  <li className="tag inactive-tag tag-button">#FirstAid</li>
                  <li className="tag inactive-tag tag-button">#Childcare</li>
                </ul>
              </div>
            </SessionCard>

            <SessionCard clas="trending-card" cardTitle="Time Frame">
              <ul className="tag-list">
                <li className="tag active-tag tag-button">#Urgent</li>
                <li className="tag active-tag tag-button">#Today</li>
                <li className="tag active-tag tag-button">#1-2Days</li>
                <li className="tag inactive-tag tag-button">#ThisWeek</li>
              </ul>
            </SessionCard>

            <SessionCard cardTitle="Distance">
              <div className="card-area location-city">
                <div className="location-label">From</div>
                <div className="location-current">Pearlington, MI</div>
                <div className="location-icon">
                  <Icon icon={faChevronRight} />
                </div>
              </div>

              <div className="card-area home-and-abroad-toggle">
                <div className="toggle-row">
                  <div className="toggle-label">Max Travel</div>
                  <div
                    className={workAbroad ? "toggle on" : "toggle"}
                    onClick={() => this.toggleWorkAbroad()}
                  >
                    <div className="toggle-button" />
                  </div>
                </div>

                <div
                  className={
                    true
                      ? "card-area travel-distance"
                      : "card-area travel-distance disabled-card-area"
                  }
                >
                  <label
                    className="travel-range-label range-label"
                    htmlFor="travelDistanceSlider"
                  >
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
        </Main>

        <Footer>
          <Link to="/feed/doer" className="btn footer-btn feed-btn">
            View Jobs
          </Link>
        </Footer>
      </Page>
    )
  }
}
