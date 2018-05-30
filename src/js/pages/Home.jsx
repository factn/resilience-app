/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/fontawesome-free-solid"

// Page wrapper
import Page from "./Page"

// Logo image
import logo from "../../img/logo.svg"
/*** [end of imports] ***/

export default class Home extends Component {
  render() {
    const header = (
      <Fragment>
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
      </Fragment>
    )

    const subheader = (
      <div className="subheader-home">
        <div className="subheader-line">Help with disaster relief.</div>
        <div className="subheader-line">Donate money / do a job.</div>
      </div>
    )

    const footer = (
      <Fragment>
        <div className="button-label">Post a request</div>
        <Link to="/requester" className="btn footer-btn request-btn">
          Get Help
        </Link>
      </Fragment>
    )

    return (
      <Page className="home-page" header={header} subheader={subheader} footer={footer}>
        <header className="home-header">Choose your mission</header>
        <div className="home-buttons">
          <Link to="/donor" className="btn home-btn square-btn donate-btn">
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
        </div>
      </Page>
    )
  }
}
