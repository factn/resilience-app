/*** IMPORTS ***/
// Module imports
import React from "react"
import createHistory from "history/createBrowserHistory"

// Local JS
import Form from '../components/Form'
import FormInput from "./FormInput"
import Database from "../resources/Database"
import { getUrlPiece } from "../resources/Util"
/*** [end of imports] ***/

const history = createHistory()

export default class DoerFlow extends Form {
	constructor(props) {
		super(props)

		this.state = {
			refreshes: 0,
			lastUrlSegment: getUrlPiece()
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
					doerlon: "doer_location_lon",
					scenarioId: "doer_scenario-id"
				},
				goToPath: scenarioId => `/${scenarioId}/info`,
				responseType: "neutral"
			}
		]
	}

	submitDo = params => {
		let json = {
			data: {
				type: "scenarios",
				id: params.scenarioId,
				attributes: {},
				relationships: {
					doer: {
						data: {
							type: "users",
							id: this.state.currentUserId || "1"
						}
					}
				}
			}
		}

		Database.updateScenario({ id: params.scenarioId }, json)
			.then(result => {
				// console.log("Scenario successfully updated:", result)

				this.acceptScenario({ scenarioId: params.scenarioId })
				if (params.path) {
					history.push(params.path)
					window.location = params.path
				}
			})
			.catch(error => {
				// console.error("Error updating scenario:", error)
			})
	}

	render() {
		let {
			openMapPicker,
			lastClickedLat,
			lastClickedLon,
			scenarioId,
			userId
		} = this.props
		let { lastUrlSegment } = this.state

		return (
			<div className={`${lastUrlSegment}-form page-form`}>
				{this.pages[lastUrlSegment].inputs.map((_input, _index) => (
					<FormInput
						inputObj={_input}
						openMapPicker={openMapPicker}
						lat={lastClickedLat}
						lon={lastClickedLon}
						scenarioId={scenarioId || userId}
						key={_index}
					/>
				))}
			</div>
		)
	}
}
