/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"
import { faDollarSign } from "@fortawesome/fontawesome-free-solid"

// Page elements
import Page from "./Page"
import Main from "../components/Main"
import Footer from "../components/Footer"
import SessionSetting from "../components/SessionSetting"

// Inputs
import InputIconWrap from "../components/inputs/InputIconWrap"
import Submit from "../components/inputs/Submit"

// Utilities
import Database from "../resources/Database"
/*** [end of imports] ***/

export default class DonatorFlow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: Cookies.get("userId") || 1,
      userData: null
    }
  }

  componentDidMount = () => {
    Database.getUserById({ id: this.state.userId })
      .then(result => {
        // console.log("User successfully found:", result)
        this.setState({
          currentUserData: result.body.data.attributes
        })
      })
      .catch(error => {
        // console.error("Error getting user:", error)
        this.setState({
          currentUserData: null
        })
      })
  }

  beginMission = params => {
    const { userId } = this.state
    const json = {
      // No where to put address info or custom message
      data: {
        type: "users",
        id: userId,
        attributes: {
          default_total_session_donation: params.default_total_session_donation,
          default_swipe_donation: "1" // params.default_swipe_donation
        }
      }
    }

    Database.updateUser({ id: userId }, json)
      .then(result => {
        // console.log("User successfully updated:", result)

        this.props.history.push("/feed/donator")
      })
      .catch(error => {
        // console.error("Error updating user:", error)
      })
  }

  render() {
    let buttonObj = {
      labelPhrase: "View Missions",
      clas: "footer-btn feed-btn",
      onSubmit: this.beginMission,
      onSubmitParams: {
        default_total_session_donation: "selectMaxDonationAmount"
        // default_swipe_donation: "1"
      }
    }

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
          <Submit {...buttonObj} />
        </Footer>
      </Page>
    )
  }
}
