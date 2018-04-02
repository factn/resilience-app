/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class AdHeader extends Component {
	constructor(props) {
		super(props)

		this.adHeaders = {
			Donate: {
				active: true, // Needs to set active based on URL
				link: "/donator"
			},
			"Do Work": {
				active: false,
				link: "/doer"
			},
			"Request Help": {
				active: false,
				link: "/requester"
			},
			"Verify Users": {
				active: false,
				link: "/verifier"
			}
		}
	}

	render() {
		return (
			<header className="ad-tab-header">
				<ul className="ad-tab-list">
					{Object.entries(this.adHeaders).map(([key, val]) => (
						<li className={val.active ? "ad-tab active" : "ad-tab"} key={key}>
							<a href={val.link}>{key}</a>
						</li>
					))}
				</ul>
			</header>
		)
	}
}
