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

	render() {
		let { pageStyle, title, navMenu, id } = this.props

		return (
			<Fragment>
				<Header title={title} navMenu={navMenu} />
				<Main
					pageStyle={pageStyle}
					openMapPicker={this.openMapPicker}
					lastClickedLat={this.state.lastClickedLat}
					lastClickedLon={this.state.lastClickedLon}
					scenarioId={id}
				/>
				{pageStyle === "home-tab" ? (
					<Footer />
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
