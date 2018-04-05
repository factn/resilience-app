/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import MiniMap from "./MiniMap"
/*** [end of imports] ***/

export default class AdModalContent extends Component {
	buildHeader = () => {
		let {
			lastUrlSegment,
			doer_firstname,
			requester_firstname,
			verb,
			noun
		} = this.props

		if (lastUrlSegment === "requester") {
			return <h3 className="adcontent-header">Need {noun}?</h3>
		} else if (lastUrlSegment === "verifier") {
			return (
				<h3 className="adcontent-header">
					Help us verify {toFirstCap(doer_firstname)}
				</h3>
			)
		} else {
			return (
				<h3 className="adcontent-header">
					Help {toFirstCap(requester_firstname)} {verb} {noun}
				</h3>
			)
		}
	}
	buildFigure = () => {
		let {
			lastUrlSegment,
			requester_firstname,
			funding_goal,
			disaster,
			image,
			donated
		} = this.props

		if (lastUrlSegment === "requester") {
			return <div />
		} else if (lastUrlSegment === "verifier") {
			return (
				<Fragment>
					<figure className="adcontent-image-wrap">
						<img src={image} alt={disaster} className="adcontent-image" />
					</figure>
					<div className="verifier-form page-form">
						<div className="input-wrap">
							<label
								className="input-label btn btn-label"
								htmlFor="verifier_proof"
							>
								<span className="input-label-phrase">Upload proof</span>
								<Icon icon="map-pin" className="input-label-icon" />
							</label>
							<input
								className="form-input"
								type="file"
								id="verifier_proof"
								accept="image/*"
							/>
						</div>
					</div>
				</Fragment>
			)
		} else {
			return (
				<figure className="adcontent-image-wrap">
					<img src={image} alt={disaster} className="adcontent-image" />
					<figcaption className="adcontent-image-caption">
						<p>{disaster}</p>
						<div className="funding-progress-wrap">
							<label className="funding-progress-label goal-label">
								Funding goal: {donated} / ${funding_goal}
							</label>
							<input
								type="range"
								className="funding-progress-slider"
								id={`${disaster}_fundingGoal_for${toFirstCap(
									requester_firstname
								)}`}
								min={0}
								max={funding_goal}
								value={donated.slice(1)}
								disabled={true}
							/>
							<label className="funding-progress-label complete-label">
								{(parseInt(donated.slice(1)) / funding_goal * 100).toFixed(0)}%
								complete
							</label>
						</div>
					</figcaption>
				</figure>
			)
		}
	}

	render() {
		let { lastUrlSegment, requesterlat, requesterlon } = this.props

		return (
			<div className="modal-adcontent-wrap">
				{this.buildHeader()}
				{this.buildFigure()}
				{lastUrlSegment !== "requester" && (
					<MiniMap initialCenter={{ lat: requesterlat, lng: requesterlon }} />
				)}
			</div>
		)
	}
}

const toFirstCap = str => str.charAt(0).toUpperCase() + str.slice(1)
