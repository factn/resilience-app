/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';

// Local JS
import GoogleMaps from './GoogleMaps';
import AdFeed from './AdFeed';
/*** [end of imports] ***/

export default class Main extends Component {
	render () {
		let { userLoggedIn } = this.props;

		return (
			<main className="app-main">
				{userLoggedIn
					? <section className="map-wrap">
							<GoogleMaps zoomLevel={14} />
						</section>
					: <AdFeed />
				}
			</main>
		);
	}
}