/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class AdHeader extends Component {
	render() {
		let currentUrl = window.location.href.split("/")
		let lastUrlSegment =
			currentUrl[currentUrl.length - 1] !== ""
				? currentUrl[currentUrl.length - 1]
				: currentUrl[currentUrl.length - 2]

		return (
			<header className="ad-tab-header">
				<ul className="ad-tab-list">
					{Object.entries(this.props).map(([key, val]) => (
						<li
							className={
								`/${lastUrlSegment}` === val.path ? "ad-tab active" : "ad-tab"
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
