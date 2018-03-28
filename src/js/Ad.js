/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
/*** [end of imports] ***/

export default class Ad extends Component {
	titleBuild = (noun, verb, name) => <span>{`Can you ${verb} ${noun} for ${name}?`}</span>;
	subtitleBuild = progress => <span>{`${progress} funded`}</span>
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
					openModalFunction } = this.props;

		let { firstName,
					progress,
					disaster,
					
					doerlat,
					doerlon,
					donated,
					image,
					imagethumb,
					noun,
					requestorlat,
					requestorlon,
					verb } = scenario.attributes;
		
		return (
			<article className={`ad ${context}-ad`}>
				<figure className="ad-image-wrap">
					<img src={imagethumb} alt={disaster} className="ad-image" />
				</figure>
				<header className="ad-header">
					<h4 className="ad-title">{this.titleBuild(noun, verb, firstName)}</h4>
					<h5 className="ad-subtitle">{this.subtitleBuild(donated)}</h5>
				</header>
				<p className="ad-image-caption">{disaster}</p>
				<button className="btn ad-modal-btn" onClick={() => openModalFunction(context)}>{this.callToActionBuild(context)}</button>
			</article>
		);
	}
}