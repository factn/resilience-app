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
import Page from "./js/components/Page"

// DB import
import Database from "./js/resources/Database"
/*** [end of imports] ***/

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			scenarioData: {},
			nounData: {},
			verbData: {},
			eventData: {}
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
	}

	componentDidMount = () => {
		Database.getScenarios()
			.then(result => {
				// console.info("Database call complete:", result.body.data)
				this.setState({
					scenarioData: result.body.data
				})
			})
			.catch(error => {
				// console.error("Error getting scenarios:", error)
				this.setState({
					scenarioData: {}
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
				// console.error("Error getting nouns:", error)
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
				// console.error("Error getting verbs:", error)
				this.setState({
					verbData: {}
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
				// console.error("Error getting events:", error)
				this.setState({
					eventData: {}
				})
			})
	}

	render() {
		return (
			<Router>
				<div className="app">
					{/* home */}
					<Route path="/" exact render={() => <Page {...this.tabs.Donate} />} />

					{/* tabs */}
					{Object.entries(this.tabs).map(([key, val]) => (
						<Route key={key} path={val.path} render={() => <Page {...val} />} />
					))}

					{/* pages */}
					{Object.entries(this.pages).map(([key, val]) => (
						<Route
							key={key}
							path={`/${key}`}
							render={() => <Page {...val} />}
						/>
					))}

					{/* scenarios */}
					{Object.entries(this.state.scenarioData).map(([key, val]) => (
						<Route
							key={key}
							path={`/${val.id}`}
							render={() => <Page {...val} />}
						/>
					))}
				</div>
			</Router>
		)
	}
}
