/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import faSolid from "@fortawesome/fontawesome-free-solid"
import brands from "@fortawesome/fontawesome-free-brands"

// Styles
import "./App.scss"

// Local JS files
import Page from "./js/Page"

// DB import
import Database from "./js/Database"
import ImageUpload from "./js/ImageUpload"
/*** [end of imports] ***/

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userLoggedIn: false,
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
				navMenu: false
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
		Database.getScenarios()
			.then(result => {
				// console.info("Database call complete:", result.body.data)

				this.setState({
					databaseReady: true,
					scenarioData: result.body.data
				})
			})
			.catch(error => {
				console.error("Error getting scenarios:", error)

				this.setState({
					databaseReady: false,
					scenarioData: {}
				})
			})

		Database.getUsers()
			.then(result => {
				// console.info("Users call complete:", result.body.data)

				this.setState({
					userData: result.body.data
				})
			})
			.catch(error => {
				console.error("Error getting users:", error)

				this.setState({
					userData: {}
				})
			})

		Database.getNouns()
			.then(result => {
				// console.info("Nouns call complete:", result.body.data)

				this.setState({
					nounData: result.body.data
				})
			})
			.catch(error => {
				console.error("Error getting nouns:", error)

				this.setState({
					nounData: {}
				})
			})

		Database.getVerbs()
			.then(result => {
				// console.info("Verbs call complete:", result.body.data)

				this.setState({
					verbData: result.body.data
				})
			})
			.catch(error => {
				console.error("Error getting verbs:", error)

				this.setState({
					verbData: {}
				})
			})

		Database.getDonations()
			.then(result => {
				// console.info("Donations call complete:", result.body.data)

				this.setState({
					donationData: result.body.data
				})
			})
			.catch(error => {
				console.error("Error getting donations:", error)

				this.setState({
					donationData: {}
				})
			})

		Database.getEvents()
			.then(result => {
				// console.info("Events call complete:", result.body.data)

				this.setState({
					eventData: result.body.data
				})
			})
			.catch(error => {
				console.error("Error getting events:", error)

				this.setState({
					eventData: {}
				})
			})

		Database.getProofs()
			.then(result => {
				// console.info("Proofs call complete:", result.body.data)

				this.setState({
					proofData: result.body.data
				})
			})
			.catch(error => {
				console.error("Error getting proofs:", error)

				this.setState({
					proofData: {}
				})
			})
	}

	login = params => {
		let json = { email: params.email }

		Database.getUser(json)
			.then(result => {
				console.log("Get user complete:", result.body.data)
				if (result.body.data) {
					console.log("Ding!")
					let res = result.body.data

					this.setState({
						currentUserId: res.id,
						currentUserData: res.attributes
					})
				} else {
					console.error("User not found for email:", params.email)
				}
			})
			.catch(error => {
				console.error("Error getting user:", error)
			})
	}
	submitRequest = params => {
		let relatedEventId
		let relatedNounId
		let relatedVerbId

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
					funding_goal: params.fundingGoal
				},
				relationships: {
					event: {
						data: {
							type: "events",
							id: relatedEventId
						}
					},
					noun: {
						data: {
							type: "nouns",
							id: relatedNounId
						}
					},
					verb: {
						data: {
							type: "verbs",
							id: relatedVerbId
						}
					},
					requester: {
						data: {
							type: "users",
							id: this.state.currentUserId || 1
						}
					},
					doer: {
						data: {
							type: "users",
							id: 1
						}
					}
				}
			}
		}

		Database.createScenario(json)
			.then(result => {
				console.log("Scenario successfully created:", result)

				// let newScenarioCreated

				// let imageUploadJson = {
				// 	data: {
				// 		type: "scenarios",
				// 		id: newScenarioCreated.id,
				// 		attributes: {
				// 			image: params.image
				// 		},
				// 		relationships: newScenarioCreated.relationships
				// 	}
				// }

				// ImageUpload.addImageToScenario(imageUploadJson)
				// 	.then(result => {
				// 		console.log("Proof successfully updated:", result)

				// 		this.getFullDataBase()
				// 	})
				// 	.catch(error => {
				// 		console.error("Error updating proof:", error)
				// 	})
			})
			.catch(error => {
				console.error("Error creating scenario:", error)
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
							id: 1
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
				this.getFullDataBase()
			})
			.catch(error => {
				console.error("Error creating donation:", error)
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
							id: this.state.currentUserId || 0
						}
					}
				}
			}
		}

		Database.updateScenario(json)
			.then(result => {
				console.log("Scenario successfully updated:", result)
				this.getFullDataBase()
			})
			.catch(error => {
				console.error("Error updating scenario:", error)
			})
	}
	submitVerification = params => {
		let json = {
			data: {
				type: "proofs",
				attributes: {},
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
				console.log("Proof successfully updated:", result)

				let imageUploadJson = {
					data: {
						type: "proofs",
						attributes: {
							image: params.image
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

				ImageUpload.addImageToScenario(imageUploadJson)
					.then(result => {
						console.log("Proof successfully updated:", result)

						this.getFullDataBase()
					})
					.catch(error => {
						console.error("Error updating proof:", error)
					})
			})
			.catch(error => {
				console.error("Error updating proof:", error)
			})
	}

	buildLinks = (type, id) => {
		return {
			self: `${this.baseURL}/${type}/${id}`
		}
	}

	render() {
		let funcs = {
			login: this.login,
			submitRequest: this.submitRequest,
			submitDonation: this.submitDonation,
			submitDo: this.submitDo,
			submitVerification: this.submitVerification
		}

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
							render={() => <Page app={this} funcs={funcs} {...val} />}
						/>
					))}

					{/* scenarios */}
					{Object.entries(this.state.scenarioData).map(([key, val]) => (
						<Route
							key={key}
							path={`/${val.id}`}
							render={() => <Page app={this} funcs={funcs} {...val} />}
						/>
					))}
				</div>
			</Router>
		)
	}
}
