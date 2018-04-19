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
			pageStyle: "modal",
			title: "Oops",
			navMenu: true,
			userId: 1,
			scenarioId: this.props.match.params.scenarioId || 1
		}
		this.inputs = [
			{
				inputType: "custom",
				disabledField: false,
				customJSX: (
					<div className="custom-content">
						<h2>There's nothing here!</h2>
            <p>The page you are trying to reach does not exist.</p>
					</div>
				)
			},
			{
				inputType: "submit",
				labelPhrase: "Go Home",
				labelIcon: "home",
				goToPath: "/",
				responseType: "neutral"
			}
		]
	}
}
