/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import Database from "./Database"
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
			scenarioData: {}
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
						scenarioData: {}
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
						scenarioData: {}
					})
				})
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

		let adFeed, adModalContent

		if (Object.keys(this.state.scenarioData).length > 0) {
			if (pageStyle === "home-tab") {
				adFeed = (
					<section className="ad-feed-wrap">
						{this.state.scenarioData
							.slice(0, 3)
							.map(scenario => <Ad scenario={scenario} key={scenario.id} />)}
					</section>
				)
			} else {
				adModalContent = <AdModalContent {...this.state.scenarioData} />
			}
		} else {
			if (pageStyle === "home-tab") {
				adFeed = (
					<section className="ad-feed-wrap">
						<Loader />
					</section>
				)
			} else {
				adModalContent = <Loader />
			}
		}

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
					{adFeed}
				</main>
			)
		} else {
			// Flow
			return (
				<main className="page app-main page-adcontent-wrap">
					{adModalContent}
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
