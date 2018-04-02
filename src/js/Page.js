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
	render() {
		let { app } = this.props

		return (
			<Fragment>
				<Header app={app} {...this.props} />
				<Main app={app} {...this.props} />
				{this.props.pageStyle === "modal" ? (
					<GoogleMaps />
				) : (
					<Footer app={app} />
				)}
			</Fragment>
		)
	}
}
