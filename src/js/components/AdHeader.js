/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import { getUrlPiece } from "../resources/Util"
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

	render() {
		return (
			<header className="ad-tab-header">
				<ul className="ad-tab-list">
					{Object.entries(this.tabs).map(([key, val]) => (
						<li
							className={
								`/${getUrlPiece()}` === val.path ? "ad-tab active" : "ad-tab"
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
