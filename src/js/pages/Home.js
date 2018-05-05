/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
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
            <Link className="bright-link" to="/login">
              Login
            </Link>
            <span> / </span>
            <Link className="bright-link" to="/account">
              Sign up
            </Link>
          </div>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="WAGL" />
            </Link>
          </div>
        </Header>

        <div className="subheader-home">
          <div className="subheader-line">Help with disaster relief.</div>
          <div className="subheader-line">Donate money / do a job.</div>
        </div>

        <Main>
          <header className="home-header">Choose your mission</header>
          <div className="home-buttons">
            <Link to="/donator" className="btn home-btn square-btn donate-btn">
              <span>Donate</span>
              <div className="button-icon">
                <Icon icon={faChevronRight} />
              </div>
            </Link>
            <Link to="/doer" className="btn home-btn square-btn do-btn">
              <span>Do a job</span>
              <div className="button-icon">
                <Icon icon={faChevronRight} />
              </div>
            </Link>
            <Link to="/feed/verifier" className="btn home-btn square-btn verify-btn">
              <span>Verify others</span>
              <div className="button-icon">
                <Icon icon={faChevronRight} />
              </div>
            </Link>
          </div>
        </Main>

        <Footer>
          <div className="button-label">Post a request</div>
          <Link to="/requester" className="btn footer-btn request-btn">
            Get Help
          </Link>
        </Footer>
      </div>
    )
  }
}
