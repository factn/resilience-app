/*** IMPORTS ***/
// Module imports
import React from "react"

// Local JS
import Form from '../components/Form'
import FormInput from "./FormInput"
import { getUrlPiece } from "../resources/Util"
/*** [end of imports] ***/

export default class Preferences extends Form {
	constructor(props) {
		super(props)

		this.state = {
			lastUrlSegment: getUrlPiece()
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

	submitPreferences = params => {}

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
