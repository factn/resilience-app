/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import Database from "../resources/Database"
import Ad from "./Ad"
import AdHeader from "./AdHeader"
import AdModalContent from "./AdModalContent"
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
		let { pageStyle, scenarioId } = this.props

		if (pageStyle === "home-tab") {
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
						scenarioData: null
					})
				})
		} else {
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
		}
	}

	adContent = () => {
		let { pageStyle } = this.props

		if (this.state.scenarioData) {
			if (pageStyle === "home-tab") {
				return (
					<section className="ad-feed-wrap">
						{this.state.scenarioData
							.slice(0, 3)
							.map(scenario => <Ad scenario={scenario} key={scenario.id} />)}
					</section>
				)
			} else {
				return <AdModalContent {...this.state.scenarioData} />
			}
		} else {
			if (pageStyle === "home-tab") {
				return (
					<section className="ad-feed-wrap">
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
			scenarioId
		} = this.props

		if (pageStyle === "modal") {
			return (
				<main className="page app-main modal-page">
					<Form
						openMapPicker={openMapPicker}
						lastClickedLat={lastClickedLat}
						lastClickedLon={lastClickedLon}
						scenarioId={scenarioId}
					/>
				</main>
			)
		} else if (pageStyle === "home-tab") {
			return (
				<main className="page app-main home-tab-page">
					<AdHeader />
					{this.adContent()}
				</main>
			)
		} else {
			// Flow
			return (
				<main className="page app-main page-adcontent-wrap">
					{this.adContent()}
					<Form
						openMapPicker={openMapPicker}
						lastClickedLat={lastClickedLat}
						lastClickedLon={lastClickedLon}
						scenarioId={scenarioId}
					/>
				</main>
			)
		}
	}
}
