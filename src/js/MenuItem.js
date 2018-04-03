/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class MenuItem extends Component {
	render() {
		let { label, action } = this.props

		return (
			<button className="btn-lite" onClick={action}>
				{label}
			</button>
		)
	}
}
