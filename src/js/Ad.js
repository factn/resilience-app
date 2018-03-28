/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
/*** [end of imports] ***/

export default class Ad extends Component {
	titleBuild = (requestType, noun, verb, firstName) => {
		let output;

		switch (requestType) {
			case "do":
				output = <span>{`Can you ${verb} ${noun} for ${firstName}?`}</span>;
				break;
			
			case "donate":
				output = <span>{`Can you help us raise money for ${firstName}?`}</span>;
				break;
			
			case "verify":
				output = <span>{`Help us verify ${firstName}`}</span>;
				break;
			
			default: // "request"
				output = <span>Need help?</span>;
		}

		return output;
	}
	subtitleBuild = (requestType, progress) => {
		let output;

		switch (requestType) {
			case "do":
				output = <span>{`Our work is ${progress} complete`}</span>;
				break;
			
			case "donate":
				output = <span>{`${progress} funded`}</span>;
				break;
			
			case "verify":
				output = <span>{`We have ${progress} unverified users`}</span>;
				break;
			
			default: // "request"
				output = <span>Tell us what you need</span>;
		}

		return output;
	}
	callToActionBuild = requestType => {
		let output;

		switch (requestType) {
			case "do":
				output = <span>Help today</span>;
				break;
			
			case "donate":
				output = <span>Donate now</span>;
				break;
			
			case "verify":
				output = <span>Verify users</span>;
				break;
			
			default: // "request"
				output = <span>Get Help</span>;
		}

		return output;
	}

	render () {
		let { scenario, openModalFunction } = this.props;
		
		return (
			<article className={`ad ${scenario.request_type}-ad`}>
				<header className="ad-header">
					<h4 className="ad-title">
						{this.titleBuild(scenario.request_type,
							scenario.description.noun,
							scenario.description.verb,
							scenario.requester.first_name)}
						</h4>
					<h5 className="ad-subtitle">
						{this.subtitleBuild(scenario.request_type, scenario.progress)}
					</h5>
				</header>
				<figure className="ad-image-wrap">
					<img src={scenario.image.url} alt={scenario.location.event} className="ad-image"/>
					<figcaption className="ad-image-caption">
						<p>{scenario.location.event}</p>
					</figcaption>
				</figure>
				<button className="btn ad-modal-btn" onClick={() => openModalFunction(scenario.request_type)}>
					{this.callToActionBuild(scenario.request_type)}
				</button>
			</article>
		);
	}
}