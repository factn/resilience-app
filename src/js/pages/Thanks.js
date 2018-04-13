/*** IMPORTS ***/
// Module imports
import React from "react"

// Local JS
import Page from "./Page"
/*** [end of imports] ***/

export default class Thanks extends Page {
	constructor(props) {
		super(props)

		this.state = {
			pageStyle: "flow",
			title: "Feel good",
			userId: 1
		}
		this.inputs = [
			{
				inputType: "custom",
				disabledField: false,
				customJSX: (
					<div className="custom-content">
						<h2>Tell everyone!</h2>
						<div className="addthis_inline_share_toolbox" />
					</div>
				)
			},
			{
				inputType: "submit",
				labelPhrase: "Do more",
				labelIcon: "hand-point-right",
				goToPath: "/donator",
				responseType: "neutral"
			}
		]
	}
}
