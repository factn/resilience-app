/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';

// Local JS
import MiniMap from './MiniMap';
/*** [end of imports] ***/

export default class AdModalContent extends Component {
	render() {
		let { // doer_firstname,
					// doer_lastname,
					requester_firstname,
					// requester_lastname,
					funding_goal,
					disaster,
					// doerlat,
					// doerlon,
					requestorlat,
					requestorlon,
					image,
					donated,
					// imagethumb,
					noun,
					verb } = this.props;
		
		return (
			<div className="modal-adcontent-wrap">
				<h3 className="adcontent-header">Help {toFirstCap(requester_firstname)} {verb} {noun}</h3>
				<figure className="adcontent-image-wrap">
					<img src={image} alt={disaster} className="adcontent-image"/>
					<figcaption className="adcontent-image-caption">
						<p>{disaster}</p>
						<div className="funding-progress-wrap">
							<label className="funding-progress-label">Funding goal: {donated} / {funding_goal}</label>
							<input type="range"
									id={`${disaster}_fundingGoal_for${toFirstCap(requester_firstname)}`}
									min={0}
									max={funding_goal}
									value={donated.slice(1)}
									disabled={true} />
						</div>
					</figcaption>
				</figure>
				<MiniMap initialCenter={{ lat: requestorlat, lng: requestorlon }} />
			</div>
		);
	}
}

const toFirstCap = str => str.charAt(0).toUpperCase() + str.slice(1);