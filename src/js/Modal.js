/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import FormInput from "./FormInput"
/*** [end of imports] ***/

export default class Modal extends Component {
	render() {
		let { name, content, openMapPicker, lat, lon } = this.props

		let clas =
			typeof content.adContent !== "undefined"
				? `${name.toString().toLowerCase()}-modal modal adcontent-modal`
				: `${name.toString().toLowerCase()}-modal modal no-adcontent-modal`

		return (
			<article className={clas}>
				<header className="modal-header">
					<h2>{content.title}</h2>
				</header>

				{typeof content.adContent !== "undefined" && content.adContent}

				<div className={`${name.toString().toLowerCase()}-form modal-form`}>
					{typeof content.inputs !== "undefined" &&
						content.inputs.map((_input, _index) => (
							<FormInput
								formName={name}
								inputObj={_input}
								openMapPicker={openMapPicker}
								lat={lat}
								lon={lon}
								key={_index}
							/>
						))}
				</div>
			</article>
		)
	}
}
