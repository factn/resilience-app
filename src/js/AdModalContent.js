/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
/*** [end of imports] ***/

export default class AdModalContent extends Component {
	render() {
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
					verb } = this.props;
		
		return (
			<div className="modal-adcontent-wrap">
				<h3 className="adcontent-header">Help {firstName}</h3>
				<figure className="adcontent-image-wrap">
					<img src={image} alt={disaster} className="adcontent-image"/>
					<p className="adcontent-image-caption">{disaster}</p>
				</figure>
			</div>
		);
	}
}