/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import { toFirstCap } from "../resources/Util"
/*** [end of imports] ***/

export default class MiniScenario extends Component {
	render() {
		const { imagethumb, noun, requester_firstname, id } = this.props

		return (
			<a className="mini-scenario" id={id} href={`/${id}/info`}>
				<figure className="mini-scenario-figure">
					<img
						className="mini-scenario-image"
						src={imagethumb}
						alt={`${toFirstCap(noun)} for ${toFirstCap(requester_firstname)}`}
					/>
					<figcaption className="mini-scenario-caption">
						{requester_firstname && noun ? (
							<p>{`${toFirstCap(noun)} for ${toFirstCap(
								requester_firstname
							)}`}</p>
						) : (
							<p>See more</p>
						)}
					</figcaption>
				</figure>
			</a>
		)
	}
}
