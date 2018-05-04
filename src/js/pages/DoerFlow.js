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

// Utilities
import { gradientStyle } from "../resources/Util"
/*** [end of imports] ***/

export default class DoerFlow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timeFrame: "urgent", // "urgent" || "semi-urgent" || "important"
      workFromHome: false,
      workAbroad: false,
      workDistance: 40,
      distanceMax: 100
    }

    this.setTimeframe = this.setTimeframe.bind(this)
    this.toggleWorkFromHome = this.toggleWorkFromHome.bind(this)
    this.toggleWorkAbroad = this.toggleWorkAbroad.bind(this)
    this.setWorkdistance = this.setWorkdistance.bind(this)
  }

  setTimeframe = timeFrame => {
    this.setState({
      timeFrame
    })
  }
  toggleWorkFromHome = () => {
    this.setState({
      workFromHome: !this.state.workFromHome
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
    const {
      timeFrame,
      workFromHome,
      workAbroad,
      workDistance,
      distanceMax
    } = this.state

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
            <article className="card trending-card">
              <h4 className="card-title">Description</h4>
              <center>
              <ul className="tag-list">
                <li className="tag active-tag tag-button">#Painting</li>
                <li className="tag active-tag tag-button">#Roofing</li>
                <li className="tag inactive-tag tag-button">#Transport</li>
                <li className="tag inactive-tag tag-button">#Coding</li>
                <li className="tag inactive-tag tag-button">#FirstAid</li>
                <li className="tag inactive-tag tag-button">#Childcare</li>
              </ul>
              </center>
            </article>
            <br/>

            <article className="card trending-card">
              <h4 className="card-title">Time Frame</h4>
              <ul className="tag-list">
                  <li className="tag active-tag tag-button">#Urgent</li>
                  <li className="tag active-tag tag-button">#Today</li>
                  <li className="tag active-tag tag-button">#1-2Days</li>
                  <li className="tag inactive-tag tag-button">#ThisWeek</li>
              </ul>
            </article>
            <br/>

            <article className="card">
            <h4 className="card-title">Distance</h4>
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
                    (true)
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


            </article>
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
