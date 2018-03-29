/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
/*** [end of imports] ***/

export default class Ad extends Component {
	callToActionBuild = requestType => {
		if (requestType === "doer") {
			return <span>Help today</span>;
		} else if (requestType === "donator") {
			return <span>Donate now</span>;
		} else if (requestType === "verifier") {
			return <span>Verify user</span>;
		} else if (requestType === "requester") {
			return <span>Get Help</span>;
		}
	}

	render () {
		let { scenario,
					context, // doer, donator, verifier, requester
					openModal } = this.props;

		let { // doer_firstname,
					// doer_lastname,
					requester_firstname,
					// requester_lastname,
					// funding_goal,
					disaster,
					// doerlat,
					// doerlon,
					// requestorlat,
					// requestorlon,
					// image,
					donated,
					imagethumb,
					noun,
					verb } = scenario.attributes;
		
		return (
			<article className={`ad ${context}-ad`}>
				<header className="ad-header">
					<h4 className="ad-title">{<span>{`Can you ${verb} ${noun} for ${toFirstCap(requester_firstname)}?`}</span>}</h4>
					<h5 className="ad-subtitle">{<span>{`${donated} funded`}</span>}</h5>
				</header>
				<figure className="ad-image-wrap">
					<img src={imagethumb} alt={disaster} className="ad-image" />
					<p className="ad-image-caption">{disaster}</p>
				</figure>
				<button className="btn ad-modal-btn" onClick={() => openModal(context, scenario.attributes)}>{this.callToActionBuild(context)}</button>
			</article>
		);
	}
}

const toFirstCap = str => str.charAt(0).toUpperCase() + str.slice(1);