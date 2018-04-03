/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class AdHeader extends Component {
	constructor(props) {
		super(props)

		this.state = {
			adHeaders: {
				// "All": true,
				Donate: true,
				"Do Work": false,
				"Request Help": false,
				"Verify Users": false
			}
		}
	}

	changeActiveTabTo = tabName => {
		this.setState({
			adHeaders: {
				// "All": "All" === tabName,
				Donate: "Donate" === tabName,
				"Do Work": "Do Work" === tabName,
				"Request Help": "Request Help" === tabName,
				"Verify Users": "Verify Users" === tabName
			}
		})

		if (tabName === "Donate") this.props.contextChange("donator")
		else if (tabName === "Do Work") this.props.contextChange("doer")
		else if (tabName === "Request Help") this.props.contextChange("requester")
		else if (tabName === "Verify Users") this.props.contextChange("verifier")
	}

	render() {
		return (
			<header className="ad-tab-header">
				<ul className="ad-tab-list">
					{Object.entries(this.state.adHeaders).map(([key, val]) => (
						<li className={val ? "ad-tab active" : "ad-tab"} key={key}>
							<span onClick={() => this.changeActiveTabTo(key)}>{key}</span>
						</li>
					))}
				</ul>
			</header>
		)
	}
}
