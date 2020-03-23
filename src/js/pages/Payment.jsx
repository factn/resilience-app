/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"

// Page wrapper
import Page from "./Page"
import Submit from "../components/inputs/Submit"
import SessionCard from "../components/SessionCard"

// Local JS Utilities
import { moneyfy } from "../resources/Util"

// Image
import genericAvatar from "../../img/fb-profile.jpg"
import hon3y from "../../img/hon3y.png"
/*** [end of imports] ***/

export default class Payment extends Component {
  state = {
    scenarioId: this.props.match.params.scenario_id || "1",
    userId: Cookies.get("userId") || "1",
    paymentDialogueIsOpen: false
  }

  openPaymentDialogue = () => {
    this.setState({
      paymentDialogueIsOpen: true
    })
  }

  submitPayment = params => {
    // const json = {}

    // Database.makePayment(json)
    //   .then(result => {
    this.props.history.push(`/${this.state.scenarioId}/requester/`)
    // })
    // .catch(error => {})
  }

  render() {
    const { paymentDialogueIsOpen } = this.state

    return (
      <Page className={paymentDialogueIsOpen ? "flow-page payment-page dialogue-open" : "flow-page payment-page"}>
        <header className="payment-header">
          <h3 className="payment-title">Payment</h3>
        </header>

        <section className="subtitle-box">
          <div className="doer-avatar-wrap">
            <div
              className="doer-avatar"
              style={{
                backgroundImage: `url("${genericAvatar}")`
              }}
            />
          </div>
          <div className="doer-name">Pay John</div>
        </section>

        <section className="itemized-items-wrap">
          <ul className="itemized-list">
            <li className="payment-item itemized-list-row">
              <div className="description itemized-list-description">Organize materials</div>
              <div className="price itemized-list-price">{moneyfy(25)}</div>
            </li>
            <li className="payment-item itemized-list-row">
              <div className="description itemized-list-description">Collect donations for materials</div>
              <div className="price itemized-list-price">{moneyfy(15)}</div>
            </li>
            <li className="payment-item itemized-list-row">
              <div className="description itemized-list-description">Pick up volunteer labor</div>
              <div className="price itemized-list-price">{moneyfy(20)}</div>
            </li>
            <li className="payment-item itemized-list-row">
              <div className="description itemized-list-description">Pick up materials</div>
              <div className="price itemized-list-price">{moneyfy(20)}</div>
            </li>
            <li className="payment-item itemized-list-row">
              <div className="description itemized-list-description">Patch roof</div>
              <div className="price itemized-list-price">{moneyfy(150)}</div>
            </li>
            <li className="payment-item itemized-list-row">
              <div className="description itemized-list-description">Paint &amp; seal roof</div>
              <div className="price itemized-list-price">{moneyfy(80)}</div>
            </li>
          </ul>
          <div className="grand-total itemized-list-row">
            <div className="total-label itemized-list-description">Total</div>
            <div className="total-price itemized-list-price">{moneyfy(300)}</div>
          </div>
        </section>

        <section className="card submit-payment-card">
          <div className="hon3y-logo-wrap">
            <img src={hon3y} alt="HON3Y" className="hon3y-logo" />
          </div>
          <div className="j4r-label">J4R!</div>
          <Submit labelPhrase="Make payment" clas="open-payment-btn" onSubmit={this.openPaymentDialogue} />
        </section>

        <section className="payment-dialogue-back">
          <div className="payment-dialogue">
            <header className="payment-dialogue-header">
              <div className="hon3y-logo-wrap">
                <img src={hon3y} alt="HON3Y" className="hon3y-logo" />
              </div>
              <div className="j4r-label">J4R!</div>
            </header>

            <h3 class="payment-subtitle">Authorize payment of $300</h3>

            <SessionCard className="input-card password-card">
              <input type="password" placeholder="Enter your password" id="password" />
            </SessionCard>

            <Submit labelPhrase="Authorize payment" clas="submit-payment-btn" onSubmit={this.submitPayment} />
          </div>
        </section>
      </Page>
    )
  }
}
