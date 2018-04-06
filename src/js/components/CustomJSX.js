/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class CustomJSX extends Component {
	render() {
		let { disabledField, content } = this.props

		return (
			<div
				className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
			>
				{content}
			</div>
		)
	}
}
