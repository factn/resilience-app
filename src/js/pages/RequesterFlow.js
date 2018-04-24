/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/fontawesome-free-solid"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"
import GoogleMaps from "../components/GoogleMaps"
/*** [end of imports] ***/

export default class RequesterFlow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      remainingCharacterCount: 512
    }
  }

  updateCharacterCount = e => {
    const { value } = e.target

    this.setState({
      remainingCharacterCount: 512 - value.length
    })
  }

  render() {
    const { remainingCharacterCount } = this.state

    return (
      <div className="page flow-page requester-flow-page">
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
              <h3>What do you need?</h3>
            </header>
            <article className="card input-card title-card">
              <input type="text" placeholder="Enter a title" />
            </article>
            <article className="card input-card message-card">
              <textarea
                placeholder="Enter a description"
                maxLength="512"
                rows="3"
                onChange={e => this.updateCharacterCount(e)}
              />
              <div className="remaining-character-count">
                {remainingCharacterCount} characters left
              </div>
            </article>
          </section>
          <section className="session-settings">
            <header className="settings-header">
              <h3>Where is it?</h3>
            </header>
            <article className="card">
              <div className="input-with-icon-wrap">
                <label className="input-icon" htmlFor="requestLocation">
                  <Icon icon={faMapMarkerAlt} />
                </label>
                <input
                  className="input-field"
                  type="text"
                  id="requestLocation"
                  placeholder="Enter address"
                />
              </div>
              <GoogleMaps />
            </article>
          </section>
        </Main>
        <Footer>
          <Link to="/feed/donator" className="btn footer-btn feed-btn">
            Start Mission
          </Link>
        </Footer>
      </div>
    )
  }
}
