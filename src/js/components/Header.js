/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class Header extends Component {
	render() {
		return (
			<header className="app-header">
				{this.props.children}
				<a
					className="btn ad-homepage-btn"
					href="https://lion-uat.herokuapp.com/ad"
				>
					Ads<span className="hideonmobile"> Homepage</span>
				</a>
			</header>
		)
	}
}
