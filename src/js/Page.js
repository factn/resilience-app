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
		let { app, pageStyle, title, navMenu, attributes } = this.props

		let { updateScenario } = app

		return (
			<Fragment>
				<Header
					versionNumber={app.versionNumber}
					currentUserData={app.state.currentUserData}
					title={title}
					navMenu={navMenu}
				/>
				<Main
					pageStyle={pageStyle}
					title={title}
					attributes={attributes}
					openMapPicker={this.openMapPicker}
					tabs={app.tabs}
					flows={app.flows}
					lastClickedLat={this.state.lastClickedLat}
					lastClickedLon={this.state.lastClickedLon}
					databaseReady={app.state.databaseReady}
					scenarioData={app.state.scenarioData}
					lastUrlSegment={app.state.lastUrlSegment}
					updateScenario={updateScenario}
				/>
				{pageStyle === "home-tab" ? (
					<Footer userLoggedIn={app.state.userLoggedIn} />
				) : (
					<GoogleMaps />
				)}
			</Fragment>
		)
	}
}
