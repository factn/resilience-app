/*** IMPORTS ***/
// Module imports
import React from "react"

// Local JS
import Form from '../components/Form'
import FormInput from "./FormInput"
import { getUrlPiece } from "../resources/Util"
/*** [end of imports] ***/

export default class Thanks extends Form {
	constructor(props) {
		super(props)

		this.state = {
			lastUrlSegment: getUrlPiece()
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
