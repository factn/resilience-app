/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';

// Local JS
import GoogleMaps from './GoogleMaps';
/*** [end of imports] ***/

export default class Main extends Component {
	render () {
		let { apiKey } = this.props;
		
		return (
			<main className="app-main">
				<section className="map-wrap">
					<GoogleMaps zoomLevel={14} />
				</section>
			</main>
		);
	}
}