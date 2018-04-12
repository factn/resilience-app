/*** IMPORTS ***/
// Module imports
import React, { Fragment } from "react"
import Icon from "@fortawesome/react-fontawesome"
import createHistory from "history/createBrowserHistory"

// Local JS
import Form from '../components/Form'
import FormInput from "./FormInput"
import Database from "../resources/Database"
import { getUrlPiece } from "../resources/Util"
/*** [end of imports] ***/

const history = createHistory()

export default class DonatorFlow extends Form {
	constructor(props) {
		super(props)

		this.state = {
			lastUrlSegment: getUrlPiece()
		}
		this.inputs = [
			{
				inputType: "scenario-id"
			},
			{
				inputType: "radio-row",
				requiredField: true,
				labelPhrase: "Donation amount",
				radioRowName: "donation-amount-options",
				radios: [
					{
						inputID: "preset-amount",
						labelPhrase: "$3",
						onChange: this.toggleCustomDonationAmount,
						onChangeVal: false
					},
					{
						inputID: "remaining-amount",
						labelPhrase: "Remainder of project",
						onChange: this.toggleCustomDonationAmount,
						onChangeVal: false
					},
					{
						inputID: "custom-amount",
						labelPhrase: "Custom",
						onChange: this.toggleCustomDonationAmount,
						onChangeVal: true
					}
				]
			},
			{
				inputType: "number",
				inputID: "custom-amount-value",
				labelPhrase: "Custom amount",
				labelIcon: "i-cursor",
				requiredField: false,
				disabledField: true
			},
			{ inputType: "hr" },
			{
				inputType: "radio-row",
				labelPhrase: "Payment Method",
				requiredField: true,
				radioRowName: "payment-method-options",
				radios: [
					{
						inputID: "paypal",
						labelPhrase: "PayPal",
						onChange: this.togglePaymentTypeFields,
						onChangeVal: 1
					},
					{
						inputID: "lion-bucks",
						labelPhrase: "Lion-Bucks",
						onChange: this.togglePaymentTypeFields,
						onChangeVal: 2
					},
					{
						inputID: "credit-card",
						labelPhrase: "Credit Card",
						onChange: this.togglePaymentTypeFields,
						onChangeVal: 3
					}
				]
			},
			{
				inputType: "custom",
				toggleGroup: 1,
				disabledField: true,
				customJSX: (
					<Fragment>
						<div className="pseudo-input btn paypal-donate-btn">
							<a
								href="https://www.paypal.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<span className="input-label-phrase">
									Donate via Paypal{" "}
								</span>
								<Icon icon="paypal" className="input-label-icon" />
							</a>
						</div>
					</Fragment>
				)
			},
			{
				inputType: "custom",
				toggleGroup: 2,
				disabledField: true,
				customJSX: (
					<Fragment>
						<label className="input-label">
							<span className="input-label-phrase">Ethereum wallet ID</span>
							<Icon icon="ethereum" className="input-label-icon" />
						</label>
						<div className="pseudo-input">
							<div className="ethereum-wallet-id-transaction-number">
								<span className="wallet-id" id="walletID">
									0x123f681646d4a755815f9cb19e1acc8565a0c2ac
								</span>
								<Icon className="copy-icon" icon="copy" />
							</div>
						</div>
					</Fragment>
				)
			},
			{
				inputType: "number",
				inputID: "cc-number",
				labelPhrase: "Credit card number",
				labelIcon: "credit-card",
				toggleGroup: 3,
				requiredField: false,
				disabledField: true
			},
			{
				inputType: "split-input",
				labelPhrase: "Expiration",
				toggleGroup: 3,
				requiredField: false,
				disabledField: true,
				inputs: [
					{
						inputType: "number",
						inputID: "cc-expiration-month",
						labelPhrase: "Month"
					},
					{
						inputType: "number",
						inputID: "cc-expiration-year",
						labelPhrase: "Year"
					}
				]
			},
			{
				inputType: "number",
				inputID: "cc-sec",
				labelPhrase: "Security number",
				toggleGroup: 3,
				requiredField: false,
				disabledField: true
			},
			{
				inputType: "submit",
				labelPhrase: "Donate",
				labelIcon: "money-bill-alt",
				onSubmit: this.submitDonation,
				onSubmitParams: {
					presetAmount: "donator_preset-amount",
					remainingAmount: "donator_remaining-amount",
					customAmount: "donator_custom-amount",
					customAmountValue: "donator_custom-amount-value",
					paypal: "donator_paypal",
					lionBucks: "donator_lion-bucks",
					creditCard: "donator_credit-card",
					creditCardNumber: "donator_cc-number",
					creditCardMonth: "donator_cc-expiration-month",
					creditCardYear: "donator_cc-expiration-year",
					creditCardSec: "donator_cc-sec",
					scenarioId: "donator_scenario-id"
				},
				goToPath: scenarioId => `/${scenarioId}/thanks`,
				responseType: "neutral"
			}
		]
	}

	submitDonation = params => {
		let amount = 0

		if (params.presetAmount) {
			amount = 3
		} else if (params.remainingAmount) {
			amount = 10
		} else if (params.customAmount) {
			amount = params.customAmountValue
		}

		let json = {
			data: {
				type: "donations",
				attributes: {
					amount: amount
				},
				relationships: {
					donator: {
						data: {
							type: "users",
							id: "1"
						}
					},
					scenario: {
						data: {
							type: "scenarios",
							id: params.scenarioId
						}
					}
				}
			}
		}

		Database.createDonation(json)
			.then(result => {
				console.log("Donation successfully created:", result)

				this.acceptScenario({ scenarioId: result.body.data.id })
				if (params.path) {
					history.push(params.path)
					window.location = params.path
				}
			})
			.catch(error => {
				// console.error("Error creating donation:", error)
			})
	}

	render() {
		let {
			openMapPicker,
			lastClickedLat,
			lastClickedLon,
			scenarioId,
			userId
		} = this.props
		let { lastUrlSegment } = this.state

		return (
			<div className={`${lastUrlSegment}-form page-form`}>
				{this.pages[lastUrlSegment].inputs.map((_input, _index) => (
					<FormInput
						inputObj={_input}
						openMapPicker={openMapPicker}
						lat={lastClickedLat}
						lon={lastClickedLon}
						scenarioId={scenarioId || userId}
						key={_index}
					/>
				))}
			</div>
		)
	}
}
