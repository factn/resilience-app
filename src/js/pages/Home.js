/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/fontawesome-free-solid"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"

// Logo image
import logo from "../../img/logo.svg"
/*** [end of imports] ***/

export default class Home extends Component {
  render() {
    return (
      <div className="page home-page">
        <Header>
          <div className="login-link">
            <a className="bright-link" href="/account">
              Login / Sign up
            </a>
          </div>
          <div className="logo">
            <a href="/">
              <img src={logo} alt="WAGL" />
            </a>
          </div>
        </Header>

        <div className="subheader-home">
          <div className="subheader-line">Help with disaster relief.</div>
          <div className="subheader-line">Donate money / do a job.</div>
        </div>

        <Main>
          <header className="home-header">Choose your mission</header>
          <div className="home-buttons">
            <a href="/donator" className="btn home-btn square-btn donate-btn">
              <span>Donate</span>
              <div className="button-icon">
                <Icon icon={faChevronRight} />
              </div>
            </a>
            <a href="/doer" className="btn home-btn square-btn do-btn">
              <span>Do a job</span>
              <div className="button-icon">
                <Icon icon={faChevronRight} />
              </div>
            </a>
            <a href="/verifier" className="btn home-btn square-btn verify-btn">
              <span>Verify others</span>
              <div className="button-icon">
                <Icon icon={faChevronRight} />
              </div>
            </a>
          </div>
        </Main>

        <Footer>
          <div className="button-label">Post a request</div>
          <a href="/requester" className="btn footer-btn request-btn">
            Get Help
          </a>
        </Footer>
      </div>
    )
  }
}
