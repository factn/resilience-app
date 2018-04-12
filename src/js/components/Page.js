/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"

// Local JS
import Database from "../resources/Database"

// Header
import Header from "./Header"
import NavMenu from "./NavMenu"
import Profile from "./Profile"

// Main
import Form from "./Form"
import HeaderTabs from "./HeaderTabs"
import Scenario from "./Scenario"
import ScenarioContent from "./ScenarioContent"
import Loader from "./Loader"

// Footer
import GoogleMaps from "./GoogleMaps"
import Footer from "./Footer"
/*** [end of imports] ***/

export default class Page extends Component {
	constructor(props) {
		super(props)

		this.state = {
			scenarioData: null,
			mapPickerIsOpen: false,
			lastClickedLat: null,
			lastClickedLon: null,
			pageStyle: "",
			title: "",
			navMenu: true,
			scenarioId: 1,
			userId: 1
		}

		// Bindings
		this.openMapPicker = this.openMapPicker.bind(this)
		this.closeMapPicker = this.closeMapPicker.bind(this)
	}

	componentDidMount = () => {
		let { pageStyle, scenarioId, userId } = this.props

		if (pageStyle === "home-tab") {
			Database.scenarioFeed()
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

	render() {
		let {
			pageStyle,
			title,
			navMenu,
			scenarioId,
			userId,
			lastClickedLat,
			lastClickedLon,
			mapPickerIsOpen
		} = this.state

		return (
			<div className="page-full-wrapper">
				<Header>
					{navMenu && (
						<NavMenu>
							<Profile userId={userId} />
						</NavMenu>
					)}
					<h1 className="title">{title}</h1>
				</Header>

				{pageStyle === "modal" && (
					<Fragment>
						<main className="page app-main modal-page">
							<Form
								openMapPicker={this.openMapPicker}
								lastClickedLat={lastClickedLat}
								lastClickedLon={lastClickedLon}
								scenarioId={scenarioId}
								userId={userId}
							/>
						</main>
						<GoogleMaps
							zoomLevel={14}
							closeMapPicker={this.closeMapPicker}
							mapPickerIsOpen={mapPickerIsOpen}
						/>
					</Fragment>
				)}

				{pageStyle === "home-tab" && (
					<Fragment>
						<main className="page app-main home-tab-page">
							<HeaderTabs />
							<section className="scenario-feed-wrap">
								{this.state.scenarioData ? (
									this.state.scenarioData.map(scenario => (
										<Scenario scenario={scenario} key={scenario.id} />
									))
								) : (
									<Loader />
								)}
							</section>
						</main>
						<Footer />
					</Fragment>
				)}

				{pageStyle === "flow" && (
					<Fragment>
						<main className="page app-main page-scenario-wrap">
							{this.state.scenarioData ? (
								<ScenarioContent {...this.state.scenarioData} />
							) : (
								<Loader />
							)}
							<Form
								openMapPicker={this.openMapPicker}
								lastClickedLat={lastClickedLat}
								lastClickedLon={lastClickedLon}
								scenarioId={scenarioId}
								userId={userId}
							/>
						</main>
						<GoogleMaps
							zoomLevel={14}
							closeMapPicker={this.closeMapPicker}
							mapPickerIsOpen={mapPickerIsOpen}
						/>
					</Fragment>
				)}
			</div>
		)
	}
}
