/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';

// Local JS
import GoogleMaps from './GoogleMaps';
import Ad from './Ad';
/*** [end of imports] ***/

export default class Main extends Component {
	render () {
		let { userLoggedIn,
					database,
					settings } = this.props;

		return (
			<main className="app-main">
				{userLoggedIn
					? <section className="map-wrap">
							<GoogleMaps zoomLevel={settings.zoomLevel} />
						</section>
					: <section className="ad-feed-wrap">
							{database.map(_index => <Ad scenario={_index} key={_index} />)}
						</section>
				}
			</main>
		);
	}
}