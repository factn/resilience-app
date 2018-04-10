/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
// https://github.com/fullstackreact/google-maps-react
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"
/*** [end of imports] ***/

class MiniMap extends Component {
	render() {
		let { google, initialCenter, pins } = this.props

		return (
			<section className="mini-map-wrap">
				<Map
					google={google}
					zoom={pins ? 10 : 14}
					initialCenter={initialCenter}
				>
					<Marker position={initialCenter} />
					{pins &&
						pins.map((_pin, _index) => <Marker key={_index} position={_pin} />)}
				</Map>
			</section>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w"
})(MiniMap)
