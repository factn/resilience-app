/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import FormInput from "./FormInput"
/*** [end of imports] ***/

export default class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			refreshes: 0
		}
		this.pages = {
			login: {
				inputs: [
					{
						inputType: "email",
						inputID: "email",
						labelPhrase: "Email",
						labelIcon: "at",
						requiredField: true
					},
					{
						inputType: "password",
						inputID: "pw",
						labelPhrase: "Password",
						labelIcon: "key",
						requiredField: true
					},
					{
						inputType: "submit",
						labelPhrase: "Sign In",
						labelIcon: "sign-in-alt",
						// onSubmit: this.props.login,
						onSubmitParams: { email: "login_email", password: "login_pw" },
						responseType: "neutral"
					}
				]
			},
			account: {
				inputs: [
					{
						inputType: "text",
						inputID: "first-name",
						labelPhrase: "First Name",
						labelIcon: "id-card",
						requiredField: true
					},
					{
						inputType: "text",
						inputID: "last-name",
						labelPhrase: "Last Name",
						labelIcon: "id-card",
						requiredField: false
					},
					{
						inputType: "email",
						inputID: "email",
						labelPhrase: "Email",
						labelIcon: "at",
						requiredField: true
					},
					{
						inputType: "password",
						inputID: "pw",
						labelPhrase: "Password",
						labelIcon: "key",
						requiredField: true
					},
					{
						inputType: "password",
						inputID: "confirm-pw",
						labelPhrase: "Password",
						labelIcon: "key",
						requiredField: true
					},
					{
						inputType: "location",
						inputID: "user-location",
						labelPhrase: "Location",
						labelIcon: "map-pin",
						requiredField: false
					},
					{
						inputType: "file",
						inputID: "profile-photo",
						labelPhrase: "Photo",
						labelIcon: "image",
						requiredField: false
					},
					{
						inputType: "submit",
						labelPhrase: "Create Account",
						labelIcon: "user-plus",
						// onSubmit: this.props.createAccount,
						onSubmitParams: {
							email: "account_email",
							firstname: "account_first-name",
							lastname: "account_last-name",
							latitude: "account_user-location_lat",
							longitude: "account_user-location_lon",
							password: "account_pw",
							password_confirmation: "account_confirm-pw"
						},
						responseType: "neutral"
					}
				]
			},
			editAccount: {
				inputs: [
					{
						inputType: "text",
						inputID: "first-name",
						labelPhrase: "First Name",
						labelIcon: "id-card",
						requiredField: true
					},
					{
						inputType: "text",
						inputID: "last-name",
						labelPhrase: "Last Name",
						labelIcon: "id-card",
						requiredField: false
					},
					{
						inputType: "email",
						inputID: "email",
						labelPhrase: "Email",
						labelIcon: "at",
						requiredField: true
					},
					{
						inputType: "password",
						inputID: "pw",
						labelPhrase: "Password",
						labelIcon: "key",
						requiredField: true
					},
					{
						inputType: "password",
						inputID: "confirm-pw",
						labelPhrase: "Password",
						labelIcon: "key",
						requiredField: true
					},
					{
						inputType: "location",
						inputID: "user-location",
						labelPhrase: "Location",
						labelIcon: "map-pin",
						requiredField: false
					},
					{
						inputType: "file",
						inputID: "profile-photo",
						labelPhrase: "Photo",
						labelIcon: "image",
						requiredField: false
					},
					{
						inputType: "submit",
						labelPhrase: "Update Account",
						labelIcon: "save",
						// onSubmit: this.props.editAccount,
						onSubmitParams: {
							email: "editAccount_email",
							firstname: "editAccount_first-name",
							lastname: "editAccount_last-name",
							latitude: "editAccount_user-location_lat",
							longitude: "editAccount_user-location_lon",
							password: "editAccount_pw",
							password_confirmation: "editAccount_confirm-pw"
						},
						responseType: "neutral"
					}
				]
			},
			preferences: {
				inputs: [
					{
						inputType: "submit",
						labelPhrase: "Save settings",
						labelIcon: "cogs",
						responseType: "neutral"
						// onSubmit: this.props.updatePreferences,
					}
				]
			},
			thanks: {
				inputs: []
			},
			requester: {
				inputs: [
					{
						inputType: "text",
						inputID: "event-name",
						labelPhrase: "What disaster has effected you?",
						labelIcon: "cloud",
						requiredField: false
					},
					{
						inputType: "number",
						inputID: "verb",
						labelPhrase: "What do you need help with?",
						requiredField: true
					},
					{
						inputType: "number",
						inputID: "donation-amount",
						labelPhrase: "What is your donation goal?",
						labelIcon: "hand-holding-usd",
						requiredField: true
					},
					{
						inputType: "text",
						inputID: "materials-list",
						labelPhrase: "What materials do you need?",
						requiredField: false
					},
					{
						inputType: "number",
						inputID: "volunteers-amount",
						labelPhrase: "How many volunteers do you need?",
						labelIcon: "people-carry",
						requiredField: false
					},
					{
						inputType: "text",
						inputID: "first-name",
						labelPhrase: "What is your name?",
						labelIcon: "user",
						requiredField: false
					},
					{
						inputType: "file",
						inputID: "photo",
						labelPhrase: "Show us what happened",
						labelIcon: "image",
						requiredField: false
					},
					{
						inputType: "location",
						inputID: "location",
						labelPhrase: "Where are you?",
						labelIcon: "map-pin",
						requiredField: true
					},
					{
						inputType: "submit",
						labelPhrase: "Send someone",
						labelIcon: "check",
						// onSubmit: this.props.submitRequest,
						onSubmitParams: {
							event: "requester_event-name",
							image: "requester_photo",
							requester_firstname: "requester_first-name",
							requesterlat: "requester_location_lat",
							requesterlon: "requester_location_lon",
							verb: "requester_verb"
						},
						responseType: "neutral"
					}
				]
			},
			donator: {
				inputs: [
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
										{/* <Icon className="copy-icon" icon="copy" /> */}
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
						inputType: "number",
						inputID: "cc-expiration-month",
						labelPhrase: "Expiration Month",
						toggleGroup: 3,
						requiredField: false,
						disabledField: true
					},
					{
						inputType: "number",
						inputID: "cc-expiration-year",
						labelPhrase: "Expiration Year",
						toggleGroup: 3,
						requiredField: false,
						disabledField: true
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
						// onSubmit: this.props.submitDonation,
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
							creditCardSec: "donator_cc-sec"
						},
						responseType: "neutral"
					}
				]
			},
			doer: {
				inputs: [
					{
						inputType: "checkbox",
						inputID: "materials",
						labelPhrase: "I'm bringing materials",
						requiredField: false
					},
					{
						inputType: "checkbox",
						inputID: "volunteering",
						labelPhrase: "I'm volunteering",
						requiredField: false
					},
					{
						inputType: "location",
						inputID: "location",
						labelPhrase: "Where are you now?",
						labelIcon: "map-pin",
						requiredField: true
					},
					{
						inputType: "submit",
						labelPhrase: "I'm on my way",
						labelIcon: "thumbs-up",
						// onSubmit: this.props.submitDo,
						onSubmitParams: {
							doerlat: "doer_location_lat",
							doerlon: "doer_location_lon"
						},
						responseType: "neutral"
					}
				]
			},
			verifier: {
				inputs: [
					{
						inputType: "submit",
						labelPhrase: "Verify this user",
						labelIcon: "check",
						onSubmitParams: { userVerified: true },
						responseType: "positive"
					},
					{
						inputType: "submit",
						labelPhrase: "I don't know them",
						labelIcon: "times",
						// onSubmit: this.props.submitVerification,
						onSubmitParams: { userVerified: false },
						responseType: "negative"
					}
				]
			}
		}

		// Bindings
		this.toggleCustomDonationAmount = this.toggleCustomDonationAmount.bind(this)
		this.togglePaymentTypeFields = this.togglePaymentTypeFields.bind(this)
	}

	toggleCustomDonationAmount = turnedOn => {
		let { inputs } = this.pages.donator

		if (turnedOn) {
			inputs[1].requiredField = true
			inputs[1].disabledField = false
		} else {
			inputs[1].requiredField = false
			inputs[1].disabledField = true
		}

		this.setState({
			refreshes: this.state.refreshes + 1
		})
	}
	togglePaymentTypeFields = turnedOn => {
		let { inputs } = this.pages.donator

		for (let i = 4, l = inputs.length; i < l; i++) {
			if (inputs[i].toggleGroup === turnedOn) {
				inputs[i].requiredField = true
				inputs[i].disabledField = false
			} else {
				inputs[i].requiredField = false
				inputs[i].disabledField = true
			}
		}

		this.setState({
			refreshes: this.state.refreshes + 1
		})
	}

	render() {
		let {
			title,
			openMapPicker,
			lastClickedLat,
			lastClickedLon,
			lastUrlSegment
		} = this.props

		return (
			<div className={`${title.toString().toLowerCase()}-form page-form`}>
				{this.pages[lastUrlSegment].inputs.map((_input, _index) => (
					<FormInput
						formName={title}
						inputObj={_input}
						openMapPicker={openMapPicker}
						lat={lastClickedLat}
						lon={lastClickedLon}
						lastUrlSegment={lastUrlSegment}
						key={_index}
					/>
				))}
			</div>
		)
	}
}
