/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import Icon from "@fortawesome/react-fontawesome"
import createHistory from "history/createBrowserHistory"

// Local JS
import FormInput from "./FormInput"
import Database from "../resources/Database"
import { getUrlPiece, getBase64 } from "../resources/Util"
/*** [end of imports] ***/

const history = createHistory()

export default class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			refreshes: 0,
			lastUrlSegment: getUrlPiece(),
			eventData: [],
			nounData: [],
			verbData: []
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
						onSubmit: this.submitLogin,
						onSubmitParams: { email: "login_email", password: "login_pw" },
						goToPath: "/",
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
						labelPhrase: "Confirm Password",
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
						onSubmit: this.submitCreateAccount,
						onSubmitParams: {
							email: "account_email",
							firstname: "account_first-name",
							lastname: "account_last-name",
							latitude: "account_user-location_lat",
							longitude: "account_user-location_lon",
							password: "account_pw",
							password_confirmation: "account_confirm-pw"
						},
						goToPath: "/",
						responseType: "neutral"
					}
				]
			},
			"edit-account": {
				inputs: [
					{
						inputType: "scenario-id"
					},
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
						labelPhrase: "New Password",
						labelIcon: "key",
						requiredField: true
					},
					{
						inputType: "password",
						inputID: "confirm-pw",
						labelPhrase: "Confirm New Password",
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
						onSubmit: this.submitEditAccount,
						onSubmitParams: {
							scenarioId: "edit-account_scenario-id",
							email: "edit-account_email",
							firstname: "edit-account_first-name",
							lastname: "edit-account_last-name",
							latitude: "edit-account_user-location_lat",
							longitude: "edit-account_user-location_lon",
							password: "edit-account_pw",
							password_confirmation: "edit-account_confirm-pw"
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
						responseType: "neutral",
						onSubmit: this.submitPreferences
					}
				]
			},
			thanks: {
				inputs: [
					{
						inputType: "custom",
						disabledField: false,
						customJSX: (
							<div className="custom-content">
								<h2>Tell everyone!</h2>
								<div className="addthis_inline_share_toolbox" />
							</div>
						)
					},
					{
						inputType: "submit",
						labelPhrase: "Do more",
						labelIcon: "hand-point-right",
						goToPath: scenarioId => `/${scenarioId}/info`,
						responseType: "neutral"
					}
				]
			},
			info: {
				inputs: [
					{
						inputType: "custom",
						disabledField: false,
						customJSX: (
							<div className="custom-content">
								<h2>Get people involved!</h2>
								<div className="addthis_inline_share_toolbox" />
							</div>
						)
					},
					{
						inputType: "submit",
						labelPhrase: "Home",
						labelIcon: "home",
						goToPath: "/",
						responseType: "neutral"
					}
				]
			},
			requester: {
				inputs: [
					{
						inputType: "scenario-id"
					},
					{
						inputType: "select",
						inputID: "event-name",
						labelPhrase: "What disaster has effected you?",
						labelIcon: "cloud",
						options: [],
						requiredField: false
					},
					{
						inputType: "split-input",
						labelPhrase: "What do you need help with?",
						requiredField: true,
						inputs: [
							{
								inputType: "select",
								inputID: "verb",
								options: [],
								requiredField: false
							},
							{
								inputType: "select",
								inputID: "noun",
								options: [],
								requiredField: false
							}
						]
					},
					{
						inputType: "number",
						inputID: "donation-amount",
						labelPhrase: "What is your donation goal?",
						// labelIcon: "hand-holding-usd",
						requiredField: true
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
						inputType: "text",
						inputID: "custom-message",
						labelPhrase: "Anything else you'd like to say?",
						labelIcon: "i-cursor",
						requiredField: false
					},
					{
						inputType: "submit",
						labelPhrase: "Send someone",
						labelIcon: "check",
						onSubmit: this.submitRequest,
						onSubmitParams: {
							event: "requester_event-name",
							image: "requester_photo",
							requester_firstname: "requester_first-name",
							requesterlat: "requester_location_lat",
							requesterlon: "requester_location_lon",
							noun: "requester_noun",
							verb: "requester_verb",
							customMessage: "requester_custom-message",
							fundingGoal: "requester_donation-amount",
							scenarioId: "requester_scenario-id"
						},
						goToPath: scenarioId => `/${scenarioId}/info`,
						responseType: "neutral"
					}
				]
			},
			donator: {
				inputs: [
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
			},
			doer: {
				inputs: [
					{
						inputType: "scenario-id"
					},
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
						onSubmit: this.submitDo,
						onSubmitParams: {
							doerlat: "doer_location_lat",
							doerlon: "doer_location_lon",
							scenarioId: "doer_scenario-id"
						},
						goToPath: scenarioId => `/${scenarioId}/thanks`,
						responseType: "neutral"
					}
				]
			},
			verifier: {
				inputs: [
					{
						inputType: "scenario-id"
					},
					{
						inputType: "file",
						inputID: "proof",
						labelPhrase: "Upload proof",
						labelIcon: "image",
						requiredField: false
					},
					{
						inputType: "submit",
						labelPhrase: "Verify this user",
						labelIcon: "check",
						onSubmit: this.submitVerification,
						onSubmitParams: {
							scenarioId: "verifier_scenario-id",
							image: "verifier_proof"
						},
						goToPath: "/verifier",
						responseType: "positive"
					},
					{
						inputType: "submit",
						labelPhrase: "I don't know them",
						labelIcon: "times",
						onSubmit: this.dismissScenario,
						onSubmitParams: {
							scenarioId: "verifier_scenario-id"
						},
						goToPath: scenarioId => `/${scenarioId}/info`,
						responseType: "negative"
					}
				]
			}
		}

		// Bindings
		this.toggleCustomDonationAmount = this.toggleCustomDonationAmount.bind(this)
		this.togglePaymentTypeFields = this.togglePaymentTypeFields.bind(this)
	}

	componentDidMount = () => {
		Database.getEvents()
			.then(result => {
				// console.info("Events call complete:", result.body.data)
				this.pages.requester.inputs[1].options = result.body.data // Bad implementation, need to find a better way to get this information where it belongs
				this.setState({
					eventData: result.body.data
				})
			})
			.catch(error => {
				// console.error("Error getting events:", error)
			})

		Database.getNouns()
			.then(result => {
				// console.info("Nouns call complete:", result.body.data)
				this.pages.requester.inputs[2].inputs[1].options = result.body.data // Bad implementation, need to find a better way to get this information where it belongs
				this.setState({
					nounData: result.body.data
				})
			})
			.catch(error => {
				// console.error("Error getting nouns:", error)
			})

		Database.getVerbs()
			.then(result => {
				// console.info("Verbs call complete:", result.body.data)
				this.pages.requester.inputs[2].inputs[0].options = result.body.data // Bad implementation, need to find a better way to get this information where it belongs
				this.setState({
					verbData: result.body.data
				})
			})
			.catch(error => {
				// console.error("Error getting verbs:", error)
			})
	}

	submitLogin = params => {
		let json = {
			email: params.email,
			password: params.password
		}

		Database.attemptLogin(json)
			.then(result => {
				// console.log("Login complete:", result)

				if (params.path) {
					history.push(params.path)
					window.location = params.path
				}
			})
			.catch(error => {
				// console.error("Error getting user:", error)
			})
	}
	submitCreateAccount = params => {
		let json = {
			data: {
				type: "users",
				attributes: {
					email: params.email,
					firstname: params.firstname,
					lastname: params.lastname,
					latitude: params.latitude,
					longitude: params.longitude,
					password: params.password,
					password_confirmation: params.password_confirmation
				}
			}
		}

		Database.createUser(json)
			.then(result => {
				// console.log("User successfully created:", result)

				if (params.path) {
					history.push(params.path)
					window.location = params.path
				}
			})
			.catch(error => {
				// console.error("Error creating user:", error)
			})
	}
	submitEditAccount = params => {
		let json = {
			data: {
				id: params.scenarioId,
				type: "users",
				attributes: {
					email: params.email,
					firstname: params.firstname,
					lastname: params.lastname,
					latitude: params.latitude,
					longitude: params.longitude
					// password: params.password,
					// password_confirmation: params.password_confirmation
				}
			}
		}

		Database.updateUser(json)
			.then(result => {
				// console.log("User successfully created:", result)

				if (params.path) {
					history.push(params.path)
					window.location = params.path
				}
			})
			.catch(error => {
				// console.error("Error creating user:", error)
			})
	}
	submitPreferences = params => {}
	submitRequest = params => {
		let relatedEventId
		let relatedNounId
		let relatedVerbId
		let imageString = getBase64(params.image)

		for (let i in this.state.eventData) {
			if (params.event === this.state.eventData[i].attributes.description) {
				relatedEventId = this.state.eventData[i].id
			}
		}
		for (let i in this.state.nounData) {
			if (params.noun === this.state.nounData[i].attributes.description) {
				relatedNounId = this.state.nounData[i].id
			}
		}
		for (let i in this.state.verbData) {
			if (params.verb === this.state.verbData[i].attributes.description) {
				relatedVerbId = this.state.verbData[i].id
			}
		}

		let json = {
			data: {
				type: "scenarios",
				attributes: {
					funding_goal: params.fundingGoal,
					image: imageString
				},
				relationships: {
					event: {
						data: {
							type: "events",
							id: relatedEventId || "1"
						}
					},
					noun: {
						data: {
							type: "nouns",
							id: relatedNounId || "1"
						}
					},
					verb: {
						data: {
							type: "verbs",
							id: relatedVerbId || "1"
						}
					},
					requester: {
						data: {
							type: "users",
							id: this.state.currentUserId || "1"
						}
					},
					doer: {
						data: {
							type: "users",
							id: "1"
						}
					}
				}
			}
		}

		Database.createScenario(json)
			.then(result => {
				// console.log("Scenario successfully created:", result)

				this.acceptScenario({ scenarioId: result.body.data.id })
				if (params.path) {
					history.push(params.path)
					window.location = params.path
				}
			})
			.catch(error => {
				// console.error("Error creating scenario:", error)
			})
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
	submitDo = params => {
		let json = {
			data: {
				type: "scenarios",
				id: params.scenarioId,
				attributes: {},
				relationships: {
					doer: {
						data: {
							type: "users",
							id: this.state.currentUserId || "1"
						}
					}
				}
			}
		}

		Database.updateScenario({ id: params.scenarioId }, json)
			.then(result => {
				// console.log("Scenario successfully updated:", result)

				this.acceptScenario({ scenarioId: params.scenarioId })
				if (params.path) {
					history.push(params.path)
					window.location = params.path
				}
			})
			.catch(error => {
				// console.error("Error updating scenario:", error)
			})
	}
	submitVerification = params => {
		let image_string = getBase64(params.image)

		let json = {
			data: {
				type: "proofs",
				attributes: {
					image: image_string
				},
				relationships: {
					scenario: {
						data: {
							type: "scenarios",
							id: params.scenarioId
						}
					}
				}
			}
		}

		Database.createProof(json)
			.then(result => {
				// console.log("Proof successfully created:", result)

				this.acceptScenario({ scenarioId: params.scenarioId })
				if (params.path) {
					history.push(params.path)
					window.location = params.path
				}
			})
			.catch(error => {
				// console.error("Error updating proof:", error)
			})
	}
	dismissScenario = params => {
		let { lastUrlSegment } = this.state
		let ad_type

		if (lastUrlSegment === "doer") ad_type = "1"
		else if (lastUrlSegment === "requester") ad_type = "2"
		else if (lastUrlSegment === "donator") ad_type = "3"
		else if (lastUrlSegment === "verifier") ad_type = "4"

		let json = {
			data: {
				type: "user_ad_interactions",
				attributes: {},
				relationships: {
					user: {
						data: {
							type: "users",
							id: "1"
						}
					},
					scenario: {
						data: {
							id: params.scenarioId,
							type: "scenarios"
						}
					},
					ad_type: {
						data: {
							id: ad_type,
							type: "ad_types"
						}
					},
					interaction_type: {
						data: {
							id: "2",
							type: "interaction_types"
						}
					}
				}
			}
		}

		Database.createUserAdInteraction(json)
			.then(result => {
				// console.log("User ad interaction successfully created:", result)
			})
			.catch(error => {
				// console.error("Error creating user ad interaction:", error)
			})
	}
	acceptScenario = params => {
		let { lastUrlSegment } = this.state
		let ad_type

		if (lastUrlSegment === "doer") ad_type = "1"
		else if (lastUrlSegment === "requester") ad_type = "2"
		else if (lastUrlSegment === "donator") ad_type = "3"
		else if (lastUrlSegment === "verifier") ad_type = "4"

		let json = {
			data: {
				type: "user_ad_interactions",
				attributes: {},
				relationships: {
					user: {
						data: {
							type: "users",
							id: "1"
						}
					},
					scenario: {
						data: {
							id: params.scenarioId,
							type: "scenarios"
						}
					},
					ad_type: {
						data: {
							id: ad_type,
							type: "ad_types"
						}
					},
					interaction_type: {
						data: {
							id: "1",
							type: "interaction_types"
						}
					}
				}
			}
		}

		Database.createUserAdInteraction(json)
			.then(result => {
				// console.log("User ad interaction successfully created:", result)
			})
			.catch(error => {
				// console.error("Error creating user ad interaction:", error)
			})
	}
	toggleCustomDonationAmount = turnedOn => {
		let { inputs } = this.pages.donator

		if (turnedOn) {
			inputs[2].requiredField = true
			inputs[2].disabledField = false
		} else {
			inputs[2].requiredField = false
			inputs[2].disabledField = true
		}

		this.setState({
			refreshes: this.state.refreshes + 1
		})
	}
	togglePaymentTypeFields = turnedOn => {
		let { inputs } = this.pages.donator

		for (let i = 5, l = inputs.length; i < l; i++) {
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
