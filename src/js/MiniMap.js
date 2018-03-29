/*** IMPORTS ***/
// Module imports
import React, { Component }								from 'react';
	// https://github.com/fullstackreact/google-maps-react
import { Map, Marker, GoogleApiWrapper }	from 'google-maps-react';
/*** [end of imports] ***/

export class MiniMap extends Component {
	render() {
		let { google, initialCenter } = this.props;

		return (
			<section className="mini-map-wrap">
				<Map google={google}
						zoom={14}
						initialCenter={initialCenter}>
					<Marker position={initialCenter} />
				</Map>
			</section>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: ("AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w")
})(MiniMap)