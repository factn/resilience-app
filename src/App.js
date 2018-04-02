/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import faSolid from "@fortawesome/fontawesome-free-solid"

// Styles
import "./App.scss"

// Local JS files
import Page from "./js/Page"
import AdModalContent from "./js/AdModalContent"

// DB import
import DB from "./js/DB"
/*** [end of imports] ***/

export default class App extends Component {
	constructor(props) {
		super(props)

		this.defaultUserData = {
			email: "",
			firstname: "",
			lastname: "",
			latitude: -41.280789,
			longitude: 174.775187
		}

		this.state = {
			// mapAPIKey: "AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w",
			menuIsOpen: false,
			modalIsOpen: false,
			userLoggedIn: false,
			currentUserRole: "donator",
			currentUserId: null,
			currentUserData: this.defaultUserData,
			currentScenarioId: 0,
			refreshes: 0,
			mapPickerIsOpen: false,
			databaseReady: false,
			scenarioData: {},
			userData: {},
			lastClickedLat: null,
			lastClickedLon: null
		}
		this.settings = {
			zoomLevel: 14,
			defaultDonationAmount: "$3",
			thankYouTimer: 2000
		}
		this.pages = {
			login: {
				pageStyle: "modal",
				title: "Login",
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
						onSubmit: this.login,
						onSubmitParams: { email: "login_email", password: "login_pw" },
						responseType: "neutral"
					}
				]
			},
			account: {
				pageStyle: "modal",
				title: "Create Account",
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
						onSubmit: this.createUserAccount,
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
				pageStyle: "modal",
				title: "Edit Account",
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
						onSubmit: this.updateUserAccount,
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
				pageStyle: "modal",
				title: "Preferences",
				inputs: [
					{
						inputType: "submit",
						labelPhrase: "Save settings",
						labelIcon: "cogs",
						onSubmit: this.updatePreferences,
						responseType: "neutral"
					}
				]
			},
			requester: {
				pageStyle: "modal",
				title: "Help!",
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
						onSubmit: this.submitRequest,
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
				pageStyle: "modal",
				title: "Donate",
				inputs: [
					{
						inputType: "radio-row",
						requiredField: true,
						labelPhrase: "Donation amount",
						radioRowName: "donation-amount-options",
						radios: [
							{
								inputID: "preset-amount",
								labelPhrase: this.settings.defaultDonationAmount,
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
							creditCardSec: "donator_cc-sec"
						},
						responseType: "neutral"
					}
				]
			},
			doer: {
				pageStyle: "modal",
				title: "Do Work",
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
						onSubmit: this.submitDo,
						onSubmitParams: {
							doerlat: "doer_location_lat",
							doerlon: "doer_location_lon"
						},
						responseType: "neutral"
					}
				]
			},
			verifier: {
				pageStyle: "modal",
				title: "Verify",
				inputs: [
					{
						inputType: "submit",
						labelPhrase: "Verify this user",
						labelIcon: "check",
						onSubmit: this.submitVerification,
						onSubmitParams: { userVerified: true },
						responseType: "positive"
					},
					{
						inputType: "submit",
						labelPhrase: "I don't know them",
						labelIcon: "times",
						onSubmit: this.submitVerification,
						onSubmitParams: { userVerified: false },
						responseType: "negative"
					}
				]
			},
			thanks: {
				pageStyle: "modal",
				title: "Feel good about yourself",
				adContent: (
					<div className="modal-custom-content-wrap thank-you-modal-custom-content">
						<h4>You just made a huge difference</h4>
						<Icon className="thank-you-icon" icon="thumbs-up" />
					</div>
				)
			}
		}

		this.versionNumber = "0.1.0"
		this.baseURL = "https://lion-uat.herokuapp.com"

		// Bindings
		this.openMenu = this.openMenu.bind(this)
		this.closeMenu = this.closeMenu.bind(this)

		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)

		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
		this.createUserAccount = this.createUserAccount.bind(this)
		this.updateUserAccount = this.updateUserAccount.bind(this)

		this.updatePreferences = this.updatePreferences.bind(this)

		this.toggleCustomDonationAmount = this.toggleCustomDonationAmount.bind(this)
		this.togglePaymentTypeFields = this.togglePaymentTypeFields.bind(this)

		this.openMapPicker = this.openMapPicker.bind(this)
		this.closeMapPicker = this.closeMapPicker.bind(this)

		this.submitRequest = this.submitRequest.bind(this)
		this.submitDonation = this.submitDonation.bind(this)
		this.submitDo = this.submitDo.bind(this)
		this.submitVerification = this.submitVerification.bind(this)

		this.getFullDataBase()
	}

	getFullDataBase = () => {
		console.log("Getting database")

		DB.getScenarios()
			.then(result => {
				console.info("Database call complete:", result.body.data)

				this.setState({
					databaseReady: true,
					scenarioData: result.body.data
				})
			})
			.catch(error => {
				console.error(error)

				this.setState({
					databaseReady: false,
					scenarioData: {}
				})
			})

		DB.getUsers()
			.then(result => {
				console.info("Users call complete:", result.body.data)

				this.getUser(1)
			})
			.catch(error => {
				console.error(error)
			})

		DB.getNouns()
			.then(result => {
				console.info("Nouns call complete:", result.body.data)
			})
			.catch(error => {
				console.error(error)
			})

		DB.getVerbs()
			.then(result => {
				console.info("Verbs call complete:", result.body.data)
			})
			.catch(error => {
				console.error(error)
			})
	}

	getScenario = _id => {
		DB.getScenario({ id: _id })
			.then(result => {
				console.log(result)
			})
			.catch(error => {
				let errors = error.body.errors

				if (typeof errors === "object") {
					console.error("Error getting scenario:")
					for (let i in errors) {
						console.error(errors[i])
					}
				} else if (typeof errors === "string")
					console.error("Error getting scenario: " + errors)
				else console.error("Error getting scenario:", errors)
			})
	}
	createScenario = obj => {
		DB.createScenario({
			data: {
				type: "scenarios",
				attributes: obj
			}
		})
			.then(result => {
				console.log("Scenario successfully created:", result)
				this.getFullDataBase()
			})
			.catch(error => {
				console.error("Error creating scenario:", error)
			})
	}
	updateScenario = (_id, obj) => {
		let _type = "scenarios"

		DB.updateScenario(
			{ id: _id },
			{
				data: {
					id: _id,
					type: _type,
					links: this.buildLinks(_type, _id),
					attributes: obj
				}
			}
		)
			.then(result => {
				console.log(result)
				this.getFullDataBase()
			})
			.catch(error => {
				console.error("Error updating scenario:", error)
			})
	}
	deleteScenario = _id => {
		DB.destroyScenario({ id: _id })
			.then(result => {
				console.log(result)
				this.getFullDataBase()
			})
			.catch(error => {
				console.error("Error deleting scenario:", error)
			})
	}

	getUser = _id => {
		DB.getUser({ id: _id })
			.then(result => {
				console.log("Get user complete:", result.body.data)

				this.setState({
					currentUserRole: "donator",
					currentUserId: _id,
					currentUserData: result.body.data.attributes
				})
			})
			.catch(error => {
				console.error("Error getting user:", error)
			})
	}
	createUser = obj => {
		DB.createUser({
			data: {
				type: "users",
				attributes: obj
			}
		})
			.then(result => {
				console.log("User successfully created:", result)
				this.getFullDataBase()
			})
			.catch(error => {
				console.error("Error creating user:", error)
			})
	}
	updateUser = (_id, obj) => {
		let _type = "users"

		DB.updateUser(
			{ id: _id },
			{
				data: {
					id: _id,
					type: _type,
					links: this.buildLinks(_type, _id),
					attributes: obj
				}
			}
		)
			.then(result => {
				console.log(result)
				this.getFullDataBase()
			})
			.catch(error => {
				console.error("Error updating user:", error)
			})
	}
	deleteUser = _id => {
		DB.destroyUser({ id: _id })
			.then(result => {
				console.log(result)
				this.getFullDataBase()
			})
			.catch(error => {
				console.error("Error deleting user:", error)
			})
	}

	buildLinks = (type, id) => {
		;`${this.baseURL}/${type}/${id}`
	}

	openMenu = () => {
		this.setState({ menuIsOpen: true })
	}
	closeMenu = () => {
		this.setState({ menuIsOpen: false })
	}

	openModal = (modalName, adModalContent = null, uniquePath = "") => {
		window.scrollTo(0, 0)

		if (adModalContent)
			this.pages[modalName].adContent = <AdModalContent {...adModalContent} />

		this.setState({
			menuIsOpen: false,
			modalIsOpen: true,
			openModalName: modalName,
			currentScenarioId:
				uniquePath !== "" ? uniquePath : this.state.currentScenarioId
		})
	}
	closeModal = () => {
		this.setState({
			modalIsOpen: false,
			openModalName: "",
			mapPickerIsOpen: false
		})
	}
	dismissAd = _id => {
		this.updateScenario(_id, { dismissed: true })
	}

	login = loginData => {
		let { email, password } = loginData
		// Needs verification here
		let verified = true

		if (verified) {
			// success
			this.getUser(1) // This will need to be found based on email lookup and set the currentUser fields
			this.setState({ userLoggedIn: true })
			this.closeModal()
		} else {
			// failure
			console.error("User information denied")
		}
	}
	logout = () => {
		this.setState({
			userLoggedIn: false,
			currentUserData: this.defaultUserData
		})
	}
	createUserAccount = obj => {
		console.log("New user submitted:", obj)

		this.createUser(obj)
		this.closeModal()
	}
	updateUserAccount = obj => {
		console.log("User updated:", obj)

		this.updateUser(this.state.currentUserId, obj)

		this.closeModal()
	}

	updatePreferences = prefs => {
		for (let _pref in prefs) {
		}
		this.closeModal()
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

	openMapPicker = () => {
		this.setState({ mapPickerIsOpen: true })
	}
	closeMapPicker = (lat, lon) => {
		this.setState({
			mapPickerIsOpen: false,
			lastClickedLat: lat,
			lastClickedLon: lon
		})
	}

	submitRequest = obj => {
		console.log("New scenario submitted:", obj)

		this.createScenario(obj)
		this.closeModal()
	}
	submitDonation = () => {
		// donation happens here
		this.updateScenario()
		this.openModal("thanks")
		setTimeout(() => {
			this.closeModal()
		}, this.settings.thankYouTimer)
	}
	submitDo = () => {
		this.closeModal()
	}
	submitVerification = isVerified => {
		this.closeModal()
	}

	contextChange = newContext => {
		this.setState({
			currentUserRole: newContext
		})
	}

	render() {
		return (
			<Router>
				<div className="app">
					<Route
						path="/login/"
						render={() => <Page app={this} {...this.pages["login"]} />}
					/>
					<Route
						path="/account/"
						render={() => <Page app={this} {...this.pages["account"]} />}
					/>
					<Route
						path="/edit-account/"
						render={() => <Page app={this} {...this.pages["editAccount"]} />}
					/>
					<Route
						path="/preferences/"
						render={() => <Page app={this} {...this.pages["preferences"]} />}
					/>
					<Route
						path="/scenario/:id/"
						render={() => (
							<Page
								app={this}
								{...this.state.scenarioData[this.state.currentScenarioId]} // this.state.scenarioData[id]
							/>
						)}
					/>
					<Route
						path="/thanks/"
						render={() => <Page app={this} {...this.pages["thanks"]} />}
					/>
					<Route path="/donator/" render={() => <Page app={this} />} />
					<Route path="/requester/" render={() => <Page app={this} />} />
					<Route path="/doer/" render={() => <Page app={this} />} />
					<Route path="/verifier/" render={() => <Page app={this} />} />
				</div>
			</Router>
		)
	}
}
