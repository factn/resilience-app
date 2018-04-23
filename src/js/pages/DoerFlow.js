/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faDollarSign } from "@fortawesome/fontawesome-free-solid"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"
/*** [end of imports] ***/

export default class DoerFlow extends Component {
  render() {
    return (
      <div className="page flow-page doer-flow-page">
        <Header>
          <div className="login-link">
            <a className="bright-link" href="/login">
              Login / Sign up
            </a>
          </div>
        </Header>
        <Main>
          <section className="session-settings">
            <header className="settings-header">
              <h3>Jobs I want to do</h3>
            </header>
            <article className="card trending-card">
              <h4>Select from trending jobs</h4>
              <ul className="tag-list">
                <li className="tag inactive-tag">#Painting</li>
                <li className="tag active-tag">#Roofing</li>
                <li className="tag inactive-tag">#Transport</li>
                <li className="tag inactive-tag">#Coding</li>
                <li className="tag inactive-tag">#FirstAid</li>
                <li className="tag inactive-tag">#Childcare</li>
              </ul>
            </article>
          </section>
          <section className="timeframe-settings">
            <header className="settings-header">
              <h4>Time frame</h4>
            </header>
            <article className="card btn-card active">
              <h4>Urgent Jobs (next 24 hours)</h4>
            </article>
            <article className="card btn-card">
              <h4>Semi-Urgent Jobs (next 1-2 days)</h4>
            </article>
            <article className="card btn-card">
              <h4>Important Jobs (within the next week)</h4>
            </article>
          </section>
          <section className="location-settings">
            <header className="settings-header">
              <h4>Location</h4>
            </header>
            <article className="card">
              <div className="card-area location-city">
                <div className="location-label">Location</div>
                <div className="location-current">Pearlington, MI</div>
              </div>
              <div className="card-area home-and-abroad-toggle">
                <div className="toggle-row">
                  <div className="toggle-label">I want to work from home</div>
                  <div className="toggle" />
                </div>
                <div className="toggle-row">
                  <div className="toggle-label">I'm willing to travel</div>
                  <div className="toggle" />
                </div>
              </div>
              <div className="card-area travel-distance">
                <div className="travel-range-title">Distance I can travel</div>
                <label
                  className="travel-range-label range-label"
                  htmlFor="travelDistanceSlider"
                >
                  40km
                </label>
                <input
                  type="range"
                  className="range-slider"
                  id="travelDistanceSlider"
                  min="0"
                  max="1000"
                  value="40"
                />
              </div>
            </article>
          </section>
        </Main>
        <Footer>
          <Link to="/feed" className="btn footer-btn feed-btn">
            Start Mission
          </Link>
        </Footer>
      </div>
    )
  }
}
