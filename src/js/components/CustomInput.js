/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class CustomInput extends Component {
	render() {
		const { disabledField, content } = this.props

		return (
			<div
				className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
			>
				{content}
			</div>
		)
	}
}
