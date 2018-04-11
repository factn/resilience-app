/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"

// Local JS
import Main from "./Main"
import Header from "./Header"
import GoogleMaps from "./GoogleMaps"
import Footer from "./Footer"
import Database from "../resources/Database"
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
					userId={1}
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
