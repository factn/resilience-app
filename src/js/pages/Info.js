/*** IMPORTS ***/
// Module imports
import React from "react"

// Local JS
import Page from "./Page"
/*** [end of imports] ***/

export default class Info extends Page {
	constructor(props) {
		super(props)

		this.state = {
			pageStyle: "flow",
			title: "Overview",
			navMenu: true,
			userId: 1
		}
		this.inputs = [
			{
				inputType: "custom",
				disabledField: false,
				customJSX: (
					<div className="custom-content">
						<h2>Get people involved!</h2>
						<div className="addthis_inline_share_toolbox" />
					</div>
				)
			},
			{
				inputType: "submit",
				labelPhrase: "Home",
				labelIcon: "home",
				goToPath: "/",
				responseType: "neutral"
			}
		]
	}
}
