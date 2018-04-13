/*** IMPORTS ***/
// Local JS
import Page from "./Page"

// Local JS Utilities
import Database from "../resources/Database"
/*** [end of imports] ***/

export default class DoerFlow extends Page {
	constructor(props) {
		super(props)

		this.state = {
			pageStyle: "flow",
			title: "Work",
			navMenu: false,
			userId: 1,
			scenarioId: this.props.match.params.scenarioId || 1
		}
		this.inputs = [
			{
				inputType: "scenario-id"
			},
			{
				inputType: "checkbox",
				inputID: "materials",
				labelPhrase: "I'm bringing materials",
				requiredField: false,
				checkedField: true
			},
			{
				inputType: "checkbox",
				inputID: "volunteering",
				labelPhrase: "I can provide transportation",
				requiredField: false,
				checkedField: true
			},
			{
				inputType: "checkbox",
				inputID: "volunteering",
				labelPhrase: "I'm volunteering",
				requiredField: false,
				checkedField: true
			},
			{
				inputType: "location",
				inputID: "location",
				labelPhrase: "Where are you now?",
				labelIcon: "map-pin",
				requiredField: true
			},
			{
				inputType: "submit",
				labelPhrase: "I'm on my way",
				labelIcon: "thumbs-up",
				onSubmit: this.submitDo,
				onSubmitParams: {
					doerlat: "doer_location_lat",
					doerlon: "doer_location_lon"
				},
				responseType: "neutral"
			}
		]
	}

	submitDo = params => {
		const { scenarioId, userId } = this.state

		let json = {
			data: {
				type: "scenarios",
				id: scenarioId,
				attributes: {},
				relationships: {
					doer: {
						data: {
							type: "users",
							id: userId || "1"
						}
					}
				}
			}
		}

		Database.updateScenario({ id: scenarioId }, json)
			.then(result => {
				// console.log("Scenario successfully updated:", result)
				
				this.props.history.push(`/${scenarioId}/info`)
			})
			.catch(error => {
				// console.error("Error updating scenario:", error)
			})
	}
}
