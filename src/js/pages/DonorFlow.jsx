/*** IMPORTS ***/
// Module imports
import React, { Component } from "react";
import Cookies from "js-cookie";
import { faDollarSign } from "@fortawesome/fontawesome-free-solid";
import Icon from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import StripeCheckout from "react-stripe-checkout";

// Page wrapper
import Page from "./Page";

// Page elements
import SessionSetting from "../components/SessionSetting";
import SessionCard from "../components/SessionCard";

// Inputs
import InputIconWrap from "../components/inputs/InputIconWrap";
import Submit from "../components/inputs/Submit";

// Utilities
import Database from "../resources/Database";
/*** [end of imports] ***/

export default class DonatorFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: Cookies.get("userId") || 1,
      donationAmount: 1
    };

    this.handleChange = this.handleChange.bind(this);
  }

  beginMission = params => {
    const { userId } = this.state;
    const { default_total_session_donation, default_swipe_donation } = params;
    const json = {
      // No where to put address info or custom message
      data: {
        type: "users",
        id: userId,
        attributes: {
          default_total_session_donation,
          default_swipe_donation: default_swipe_donation || "1"
        }
      }
    };

    Database.updateUser({ id: userId }, json)
      .then(result => {
        this.props.history.push("/feed/donor");
      })
      .catch(error => {});
  };

  handleChange(e) {
    this.setState({ donationAmount: e.target.value });
  }

  onToken = token => {
    fetch("/v1/tokens", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  render() {
    let buttonObj = {
      labelPhrase: "View Missions",
      clas: "footer-btn feed-btn",
      onSubmit: this.beginMission,
      onSubmitParams: {
        default_total_session_donation: "selectMaxDonationAmount"
        // default_swipe_donation: "1"
      }
    };

    const footer = <Submit {...buttonObj} />;

    return (
      <Page className="flow-page donator-flow-page" footer={footer}>
        <SessionSetting headerLabel="Total I want to spend">
          <SessionCard className="session-card" cardTitle="Choose an amount to donate, or enter your own">
            <InputIconWrap id="selectMaxDonationAmount" icon={faDollarSign}>
              <input
                className="input-field"
                type="number"
                id="selectMaxDonationAmount"
                placeholder="Enter amount"
                onChange={this.handleChange}
              />
            </InputIconWrap>
      

            {/* user-defined amount checkout*/}
            <StripeCheckout
              name="Three Comma Co."
              description="Helping each other out in times of need"
              image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
              ComponentClass="div"
              panelLabel="Give Money"
              amount={this.state.donationAmount}
              currency="USD"
              locale="us"
              email="info@vidhub.co"
              billingAddress={false}
              zipCode={false}
              allowRememberMe
              token={this.onToken}
              stripeKey="my_PUBLISHABLE_stripekey"
              opened={this.onOpened}
              closed={this.onClosed}
              reconfigureOnUpdate={false}
              triggerEvent="onTouchTap"
            >
              <button className="btn stripe-btn">Donate Now</button>
            </StripeCheckout>
          </SessionCard>
        </SessionSetting>

         {/* 0.20 amount checkout*/}
        <SessionSetting headerLabel="Donate" className="donation-settings">
          <SessionCard className="donation-card">
            <div className="button-grid">
            <StripeCheckout
            name="Three Comma Co."
            description="Helping each other out in times of need"
            image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
            ComponentClass="div"
            panelLabel="Give Money"
            amount={0.20}
            currency="USD"
            locale="us"
            email="info@vidhub.co"
            billingAddress={false}
            zipCode={false}
            allowRememberMe
            token={this.onToken}
            stripeKey="my_PUBLISHABLE_stripekey"
            opened={this.onOpened}
            closed={this.onClosed}
            reconfigureOnUpdate={false}
            triggerEvent="onTouchTap"
              >
              <button className="btn square-btn">$0.20</button>
              </StripeCheckout>

              {/* 1.00 amount checkout*/}
              <StripeCheckout
              name="Three Comma Co."
              description="Helping each other out in times of need"
              image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
              ComponentClass="div"
              panelLabel="Give Money"
              amount={1.00}
              currency="USD"
              locale="us"
              email="info@vidhub.co"
              billingAddress={false}
              zipCode={false}
              allowRememberMe
              token={this.onToken}
              stripeKey="my_PUBLISHABLE_stripekey"
              opened={this.onOpened}
              closed={this.onClosed}
              reconfigureOnUpdate={false}
              triggerEvent="onTouchTap"
                >
                <button className="btn square-btn">$1.00</button>
                </StripeCheckout>

                {/* 5.00 amount checkout*/}
                <StripeCheckout
                name="Three Comma Co."
                description="Helping each other out in times of need"
                image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
                ComponentClass="div"
                panelLabel="Give Money"
                amount={5.00}
                currency="USD"
                locale="us"
                email="info@vidhub.co"
                billingAddress={false}
                zipCode={false}
                allowRememberMe
                token={this.onToken}
                stripeKey="my_PUBLISHABLE_stripekey"
                opened={this.onOpened}
                closed={this.onClosed}
                reconfigureOnUpdate={false}
                triggerEvent="onTouchTap"
                  >
                  <button className="btn square-btn">$5.00</button>
                  </StripeCheckout>

                  {/* 10.00 amount checkout*/}
                  <StripeCheckout
                  name="Three Comma Co."
                  description="Helping each other out in times of need"
                  image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
                  ComponentClass="div"
                  panelLabel="Give Money"
                  amount={10.00}
                  currency="USD"
                  locale="us"
                  email="info@vidhub.co"
                  billingAddress={false}
                  zipCode={false}
                  allowRememberMe
                  token={this.onToken}
                  stripeKey="my_PUBLISHABLE_stripekey"
                  opened={this.onOpened}
                  closed={this.onClosed}
                  reconfigureOnUpdate={false}
                  triggerEvent="onTouchTap"
                    >
                    <button className="btn square-btn">$10.00</button>
                    </StripeCheckout>
                    
             
            </div>
            <div className="donation-clarification">
              To each mission I swipe right on
            </div>
          </SessionCard>
        </SessionSetting>

        {/* <SessionSetting className="user-settings">
            <div className="future-setting">
              <input className="setting-input" type="checkbox" id="saveFutureDonationSettings" />
              <label className="setting-label" htmlFor="saveFutureDonationSettings">
                Save this donation setting for my next session
              </label>
            </div>
          </SessionSetting> */}
      </Page>
    );
  }
}

