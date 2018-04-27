/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { faDollarSign } from "@fortawesome/fontawesome-free-solid"

// Page elements
import Page from "./Page"
import Main from "../components/Main"
import Footer from "../components/Footer"
import SessionSetting from "../components/SessionSetting"

// Inputs
import InputIconWrap from "../components/inputs/InputIconWrap"
/*** [end of imports] ***/

export default class DonatorFlow extends Component {
  render() {
    return (
      <Page clas="flow-page donator-flow-page">
        <Main>
          <SessionSetting headerLabel="Total I want to spend">
            <article className="card session-card">
              <h4 className="card-title">In this session</h4>
              <InputIconWrap id="selectMaxDonationAmount" icon={faDollarSign}>
                <input
                  className="input-field"
                  type="number"
                  id="selectMaxDonationAmount"
                  placeholder="Enter amount"
                />
              </InputIconWrap>
              <div className="unlimited-amount-option">
                <span>OR</span>
                <button className="btn btn-lite unlimited-amount-btn">
                  Unlimited Amount
                </button>
              </div>
            </article>
          </SessionSetting>

          <SessionSetting headerLabel="Donate" clas="donation-settings">
            <article className="card donation-card">
              <div className="button-grid">
                <button className="btn square-btn">$0.20</button>
                <button className="btn square-btn">$1.00</button>
                <button className="btn square-btn">$5.00</button>
                <button className="btn square-btn">$10.00</button>
              </div>
              <div className="donation-clarification">
                To each mission I swipe right on
              </div>
            </article>
          </SessionSetting>

          {/* <SessionSetting clas="user-settings">
            <div className="future-setting">
              <input className="setting-input" type="checkbox" id="saveFutureDonationSettings" />
              <label className="setting-label" htmlFor="saveFutureDonationSettings">
                Save this donation setting for my next session
              </label>
            </div>
          </SessionSetting> */}
        </Main>

        <Footer>
          <Link to="/feed/donator" className="btn footer-btn feed-btn">
            Start Mission
          </Link>
        </Footer>
      </Page>
    )
  }
}
