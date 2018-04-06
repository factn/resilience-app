/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import MiniMap from "./MiniMap"
/*** [end of imports] ***/

export default class AdModalContent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			lastUrlSegment: this.getUrlPiece()
		}
	}
	buildHeader = () => {
		let { doer_firstname, requester_firstname, verb, noun } = this.props

		if (this.state.lastUrlSegment === "requester") {
			return <h3 className="adcontent-header">Need {noun}?</h3>
		} else if (this.state.lastUrlSegment === "verifier") {
			return (
				<h3 className="adcontent-header">
					Help us verify {this.toFirstCap(doer_firstname)}
				</h3>
			)
		} else {
			return (
				<h3 className="adcontent-header">
					Help {this.toFirstCap(requester_firstname)} {verb} {noun}
				</h3>
			)
		}
	}
	buildFigure = () => {
		let {
			requester_firstname,
			funding_goal,
			disaster,
			image,
			donated
		} = this.props

		if (this.state.lastUrlSegment === "requester") {
			return <div />
		} else if (this.state.lastUrlSegment === "verifier") {
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
								id={`${disaster}_fundingGoal_for${this.toFirstCap(
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
	getUrlPiece = () => {
		let currentUrl = window.location.href.split("/")

		let lastUrlSegment =
			currentUrl[currentUrl.length - 1] !== ""
				? currentUrl[currentUrl.length - 1]
				: currentUrl[currentUrl.length - 2]

		let allowed = [
			"donator",
			"requester",
			"verifier",
			"doer",
			"login",
			"thanks",
			"account",
			"edit-account",
			"preferences"
		]

		if (allowed.indexOf(lastUrlSegment) === -1) return "donator"
		else return lastUrlSegment
	}
	toFirstCap = str => str.charAt(0).toUpperCase() + str.slice(1)

	render() {
		let { requesterlat, requesterlon } = this.props

		return (
			<div className="modal-adcontent-wrap">
				{this.buildHeader()}
				{this.buildFigure()}
				{this.state.lastUrlSegment !== "requester" && (
					<MiniMap initialCenter={{ lat: requesterlat, lng: requesterlon }} />
				)}
			</div>
		)
	}
}
