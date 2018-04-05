/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"

// Local JS
import Main from "./Main"
import Header from "./Header"
import GoogleMaps from "./GoogleMaps"
import Footer from "./Footer"
/*** [end of imports] ***/

export default class Page extends Component {
	constructor(props) {
		super(props)

		this.state = {
			mapPickerIsOpen: false,
			lastClickedLat: null,
			lastClickedLon: null
		}

		// Bindings
		this.openMapPicker = this.openMapPicker.bind(this)
		this.closeMapPicker = this.closeMapPicker.bind(this)
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
		let { app, pageStyle, navMenu, attributes, funcs, title, id } = this.props
		let { updateScenario, flows, state } = app
		let {
			eventData,
			nounData,
			verbData,
			databaseReady,
			scenarioData,
			lastUrlSegment,
			currentUserData,
			userLoggedIn
		} = state

		let _title =
			typeof title !== "undefined" ? title : flows[state.lastUrlSegment].title

		let _eventData = []
		let _nounData = []
		let _verbData = []

		for (let event in eventData) {
			_eventData.push(eventData[event].attributes.description)
		}
		for (let noun in nounData) {
			_nounData.push(nounData[noun].attributes.description)
		}
		for (let verb in verbData) {
			_verbData.push(verbData[verb].attributes.description)
		}

		return (
			<Fragment>
				<Header
					versionNumber={app.versionNumber}
					currentUserData={currentUserData}
					title={_title}
					navMenu={navMenu}
				/>
				<Main
					pageStyle={pageStyle}
					attributes={attributes}
					openMapPicker={this.openMapPicker}
					tabs={app.tabs}
					eventData={_eventData}
					nounData={_nounData}
					verbData={_verbData}
					lastClickedLat={this.state.lastClickedLat}
					lastClickedLon={this.state.lastClickedLon}
					databaseReady={databaseReady}
					scenarioData={scenarioData}
					lastUrlSegment={lastUrlSegment}
					updateScenario={updateScenario}
					funcs={funcs}
					scenarioId={id}
				/>
				{pageStyle === "home-tab" ? (
					<Footer userLoggedIn={userLoggedIn} />
				) : (
					<GoogleMaps
						zoomLevel={14}
						closeMapPicker={this.closeMapPicker}
						mapPickerIsOpen={this.state.mapPickerIsOpen}
					/>
				)}
			</Fragment>
		)
	}
}
