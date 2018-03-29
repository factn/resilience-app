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
		} else if (requestType === "donator") {
			return <span>Get Help</span>;
		}
	}

	render () {
		let { scenario,
					context, // none, admin, doer, donator, verifier, requester
					openModal } = this.props;

		let { // Not yet created
					firstName,
					progress,
					disaster,
					
					// Currently unused
					doerlat,
					doerlon,
					requestorlat,
					requestorlon,
					image,

					// In use
					donated,
					imagethumb,
					noun,
					verb } = scenario.attributes;
		
		return (
			<article className={`ad ${context}-ad`}>
				<figure className="ad-image-wrap">
					<img src={imagethumb} alt={disaster} className="ad-image" />
				</figure>
				<header className="ad-header">
					<h4 className="ad-title">{<span>{`Can you ${verb} ${noun} for ${firstName}?`}</span>}</h4>
					<h5 className="ad-subtitle">{<span>{`${donated} funded`}</span>}</h5>
				</header>
				<p className="ad-image-caption">{disaster}</p>
				<button className="btn ad-modal-btn" onClick={() => openModal(context, scenario.attributes)}>{this.callToActionBuild(context)}</button>
			</article>
		);
	}
}