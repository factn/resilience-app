/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import MiniMap from "./MiniMap"
import { getUrlPiece, toFirstCap } from "../resources/Util"
/*** [end of imports] ***/

export default class ScenarioContent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			lastUrlSegment: getUrlPiece()
		}
	}

	buildHeader = () => {
		let {
			doer_firstname,
			requester_firstname,
			verb,
			noun
		} = this.props.attributes

		let { lastUrlSegment } = this.state

		if (lastUrlSegment === "requester") {
			return <h3 className="scenario-content-header">Need {noun}?</h3>
		} else if (lastUrlSegment === "verifier") {
			return (
				<h3 className="scenario-content-header">
					Help us verify {toFirstCap(doer_firstname)}
				</h3>
			)
		} else if (lastUrlSegment === "thanks") {
			return (
				<h3 className="scenario-content-header">
					You helped {toFirstCap(requester_firstname)} {verb} {noun}
				</h3>
			)
		} else {
			return (
				<h3 className="scenario-content-header">
					Help {toFirstCap(requester_firstname)} {verb} {noun}
				</h3>
			)
		}
	}
	buildFigure = () => {
		let { funding_goal, disaster, image, donated } = this.props.attributes

		if (this.state.lastUrlSegment === "requester") {
			return <div />
		} else if (this.state.lastUrlSegment === "verifier") {
			return (
				<figure className="scenario-content-image-wrap">
					<img src={image} alt={disaster} className="scenario-content-image" />
				</figure>
			)
		} else {
			return (
				<figure className="scenario-content-image-wrap">
					<img src={image} alt={disaster} className="scenario-content-image" />
					<figcaption className="scenario-content-image-caption">
						<p>{disaster}</p>
						<div className="funding-progress-wrap">
							<label className="funding-progress-label goal-label">
								Funding goal: ${donated} / ${funding_goal}
							</label>
							<input
								type="range"
								className="funding-progress-slider"
								id={`${disaster}_fundingGoal`}
								min={0}
								max={funding_goal}
								value={donated}
								disabled={true}
							/>
							<label className="funding-progress-label complete-label">
								{(parseInt(donated) / funding_goal * 100).toFixed(0)}% complete
							</label>
						</div>
					</figcaption>
				</figure>
			)
		}
	}

	render() {
		let { requesterlat, requesterlon } = this.props.attributes

		return (
			<div className="scenario-content-wrap">
				{this.buildHeader()}
				{this.buildFigure()}
				{this.state.lastUrlSegment !== "requester" && (
					<MiniMap initialCenter={{ lat: requesterlat, lng: requesterlon }} />
				)}
			</div>
		)
	}
}
