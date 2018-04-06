/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class AdHeader extends Component {
	constructor(props) {
		super(props)

		this.tabs = {
			Donate: {
				title: "Donate",
				pageStyle: "home-tab",
				navMenu: true,
				path: "/donator"
			},
			Work: {
				title: "Work",
				pageStyle: "home-tab",
				navMenu: true,
				path: "/doer"
			},
			"Get Help": {
				title: "Get Help",
				pageStyle: "home-tab",
				navMenu: true,
				path: "/requester"
			},
			Verify: {
				title: "Verify",
				pageStyle: "home-tab",
				navMenu: true,
				path: "/verifier"
			}
		}
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
		return (
			<header className="ad-tab-header">
				<ul className="ad-tab-list">
					{Object.entries(this.tabs).map(([key, val]) => (
						<li
							className={
								`/${this.getUrlPiece()}` === val.path
									? "ad-tab active"
									: "ad-tab"
							}
							key={key}
						>
							<a href={val.path}>{key}</a>
						</li>
					))}
				</ul>
			</header>
		)
	}
}
