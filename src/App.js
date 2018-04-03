/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import faSolid from "@fortawesome/fontawesome-free-solid"
import faBrands from "@fortawesome/fontawesome-free-brands"

// Styles
import "./App.scss"

// Local JS files
import Page from "./js/Page"

// DB import
import DB from "./js/DB"
/*** [end of imports] ***/

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userLoggedIn: false,
			currentUserRole: "donator",
			currentUserId: null,
			currentUserData: {
				email: "",
				firstname: "",
				lastname: "",
				latitude: -41.280789,
				longitude: 174.775187
			},
			databaseReady: false,
			scenarioData: {},
			userData: {},
			nounData: {},
			verbData: {},
			donationData: {},
			eventData: {},
			proofData: {},
			lastUrlSegment: this.getUrlPiece()
		}

		this.pages = {
			login: {
				title: "Login",
				pageStyle: "modal",
				navMenu: false
			},
			account: {
				title: "Create Account",
				pageStyle: "modal",
				navMenu: false
			},
			editAccount: {
				title: "Edit Account",
				pageStyle: "modal",
				navMenu: false
			},
			preferences: {
				title: "Preferences",
				pageStyle: "modal",
				navMenu: true
			},
			thanks: {
				title: "Feel good about yourself",
				pageStyle: "modal",
				navMenu: false,
				adContent: (
					<div className="modal-custom-content-wrap thank-you-modal-custom-content">
						<h4>You just made a huge difference</h4>
						<Icon className="thank-you-icon" icon="thumbs-up" />
					</div>
				)
			}
		}
		this.flows = {
			requester: {
				title: "Help!",
				pageStyle: "flow",
				navMenu: false
			},
			donator: {
				title: "Donate",
				pageStyle: "flow",
				navMenu: false
			},
			doer: {
				title: "Work",
				pageStyle: "flow",
				navMenu: false
			},
			verifier: {
				title: "Verify",
				pageStyle: "flow",
				navMenu: false
			}
		}
		this.tabs = {
			Donate: {
				title: "Donate",
				pageStyle: "home-tab",
				navMenu: true,
				path: "/donator"
			},
			Work: {
				title: "Work",
				pageStyle: "home-tab",
				navMenu: true,
				path: "/doer"
			},
			"Get Help": {
				title: "Get Help",
				pageStyle: "home-tab",
				navMenu: true,
				path: "/requester"
			},
			Verify: {
				title: "Verify",
				pageStyle: "home-tab",
				navMenu: true,
				path: "/verifier"
			}
		}

		this.versionNumber = "0.1.0"
		this.baseURL = "https://lion-uat.herokuapp.com"

		// Bindings
		this.login = this.login.bind(this)

		this.submitRequest = this.submitRequest.bind(this)
		this.submitDonation = this.submitDonation.bind(this)
		this.submitDo = this.submitDo.bind(this)
		this.submitVerification = this.submitVerification.bind(this)

		this.getFullDataBase()
	}

	getUrlPiece = () => {
		let currentUrl = window.location.href.split("/")
		let lastUrlSegment =
			currentUrl[currentUrl.length - 1] !== ""
				? currentUrl[currentUrl.length - 1]
				: currentUrl[currentUrl.length - 2]

		let allowed = [
			"donator",
			"requester",
			"verifier",
			"doer",
			"login",
			"thanks",
			"account",
			"edit-account",
			"preferences"
		]

		if (allowed.indexOf(lastUrlSegment) === -1) return "donator"
		else return lastUrlSegment
	}

	getFullDataBase = () => {
		console.log("Getting database")

		DB.getScenarios()
			.then(result => {
				// console.info("Database call complete:", result.body.data)

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
				// console.info("Users call complete:", result.body.data)

				this.setState({
					userData: result.body.data
				})
			})
			.catch(error => {
				console.error(error)
			})

		DB.getNouns()
			.then(result => {
				// console.info("Nouns call complete:", result.body.data)

				this.setState({
					nounData: result.body.data
				})
			})
			.catch(error => {
				console.error(error)
			})

		DB.getVerbs()
			.then(result => {
				// console.info("Verbs call complete:", result.body.data)

				this.setState({
					verbData: result.body.data
				})
			})
			.catch(error => {
				console.error(error)
			})

		DB.getDonations()
			.then(result => {
				// console.info("Donations call complete:", result.body.data)

				this.setState({
					donationData: result.body.data
				})
			})
			.catch(error => {
				console.error(error)
			})

		DB.getEvents()
			.then(result => {
				// console.info("Events call complete:", result.body.data)

				this.setState({
					eventData: result.body.data
				})
			})
			.catch(error => {
				console.error(error)
			})

		DB.getProofs()
			.then(result => {
				// console.info("Proofs call complete:", result.body.data)

				this.setState({
					proofData: result.body.data
				})
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

	getUser = _email => {
		DB.getUser({ email: _email })
			.then(result => {
				console.log("Get user complete:", result.body.data)

				this.setState({
					currentUserRole: "donator",
					currentUserId: result.body.data.attributes.id,
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

	login = params => {
		// DB call
		DB.getUser({ email: params.email })
			.then(result => {
				console.log("Get user complete:", result.body.data)
				if (result.body.data) {
					this.setState({
						currentUserRole: "donator",
						currentUserId: result.body.data.attributes.id,
						currentUserData: result.body.data.attributes
					})
				} else {
					console.error("User not found for email:", params.email)
				}
			})
			.catch(error => {
				console.error("Error getting user:", error)
			})

		window.location = "/"
	}
	submitRequest = params => {
		this.createScenario(params)
	}
	submitDonation = () => {}
	submitDo = () => {}
	submitVerification = () => {}

	buildLinks = (type, id) => {
		return {
			self: `${this.baseURL}/${type}/${id}`
		}
	}

	render() {
		return (
			<Router>
				<div className="app">
					{/* home */}
					<Route
						path="/"
						exact
						render={() => <Page app={this} {...this.tabs.Donate} />}
					/>

					{/* tabs */}
					{Object.entries(this.tabs).map(([key, val]) => (
						<Route
							key={key}
							path={val.path}
							render={() => <Page app={this} {...val} />}
						/>
					))}

					{/* pages */}
					{Object.entries(this.pages).map(([key, val]) => (
						<Route
							key={key}
							path={`/${key}`}
							render={() => (
								<Page
									app={this}
									funcs={{
										login: this.login,
										submitRequest: this.submitRequest,
										submitDonation: this.submitDonation,
										submitDo: this.submitDo,
										submitVerification: this.submitVerification
									}}
									{...val}
								/>
							)}
						/>
					))}

					{/* scenarios */}
					{Object.entries(this.state.scenarioData).map(([key, val]) => (
						<Route
							key={key}
							path={`/${key}`}
							render={() => (
								<Page
									app={this}
									funcs={{
										login: this.login,
										submitRequest: this.submitRequest,
										submitDonation: this.submitDonation,
										submitDo: this.submitDo,
										submitVerification: this.submitVerification
									}}
									{...val}
								/>
							)}
						/>
					))}
				</div>
			</Router>
		)
	}
}
