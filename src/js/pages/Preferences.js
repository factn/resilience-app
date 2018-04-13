/*** IMPORTS ***/
// Module imports
import createHistory from "history/createBrowserHistory"

// Local JS
import Page from "./Page"

// Local JS Utilities
import Database from "../resources/Database"
/*** [end of imports] ***/

const history = createHistory()

export default class Preferences extends Page {
	constructor(props) {
		super(props)

		this.state = {
			pageStyle: "modal",
			mapPickerIsOpen: false,
			title: "Preferences",
			navMenu: true,
			userId: 1
		}
		this.inputs = [
			{
				inputType: "submit",
				labelPhrase: "Save settings",
				labelIcon: "cogs",
				responseType: "neutral",
				onSubmit: this.submitPreferences
			}
		]
	}

	submitPreferences = params => {
		history.push("/")
	}
}
