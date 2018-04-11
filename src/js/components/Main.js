/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import Database from "../resources/Database"
import Scenario from "./Scenario"
import HeaderTabs from "./HeaderTabs"
import ScenarioContent from "./ScenarioContent"
import Loader from "./Loader"
import Form from "./Form"
/*** [end of imports] ***/

export default class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			scenarioData: null
		}
	}

	componentDidMount = () => {
		let { pageStyle, scenarioId, userId } = this.props

		if (pageStyle === "home-tab") {
			Database.getScenarios()
				.then(result => {
					console.info("Database call complete:", result.body.data)
					this.setState({
						scenarioData: result.body.data
					})
				})
				.catch(error => {
					// console.error("Error getting scenarios:", error)
					this.setState({
						scenarioData: null
					})
				})
		} else {
			if (scenarioId) {
				Database.getScenario({ id: scenarioId })
					.then(result => {
						// console.info("Database call complete:", result.body.data)
						this.setState({
							scenarioData: result.body.data
						})
					})
					.catch(error => {
						// console.error("Error getting scenarios:", error)
						this.setState({
							scenarioData: null
						})
					})
			} else if (userId) {
				Database.getUserById({ id: userId })
					.then(result => {
						// console.info("Database call complete:", result.body.data)
						this.setState({
							scenarioData: result.body.data
						})
					})
					.catch(error => {
						// console.error("Error getting user:", error)
						this.setState({
							scenarioData: null
						})
					})
			} else {
				this.setState({
					scenarioData: null
				})
			}
		}
	}

	scenarioContent = () => {
		let { pageStyle } = this.props

		console.log(this.state.scenarioData)

		if (this.state.scenarioData) {
			if (pageStyle === "home-tab") {
				return (
					<section className="scenario-feed-wrap">
						{this.state.scenarioData
							.slice(0, 3)
							.map(scenario => (
								<Scenario scenario={scenario} key={scenario.id} />
							))}
					</section>
				)
			} else {
				return <ScenarioContent {...this.state.scenarioData} />
			}
		} else {
			if (pageStyle === "home-tab") {
				return (
					<section className="scenario-feed-wrap">
						<Loader />
					</section>
				)
			} else {
				return <Loader />
			}
		}
	}

	render() {
		let {
			pageStyle,
			openMapPicker,
			lastClickedLat,
			lastClickedLon,
			scenarioId,
			userId
		} = this.props

		if (pageStyle === "modal") {
			return (
				<main className="page app-main modal-page">
					<Form
						openMapPicker={openMapPicker}
						lastClickedLat={lastClickedLat}
						lastClickedLon={lastClickedLon}
						scenarioId={scenarioId}
						userId={userId}
					/>
				</main>
			)
		} else if (pageStyle === "home-tab") {
			return (
				<main className="page app-main home-tab-page">
					<HeaderTabs />
					{this.scenarioContent()}
				</main>
			)
		} else {
			// Flow
			return (
				<main className="page app-main page-scenario-wrap">
					{this.scenarioContent()}
					<Form
						openMapPicker={openMapPicker}
						lastClickedLat={lastClickedLat}
						lastClickedLon={lastClickedLon}
						scenarioId={scenarioId}
						userId={userId}
					/>
				</main>
			)
		}
	}
}
