/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';	// https://github.com/fullstackreact/google-maps-react
/*** [end of imports] ***/

export class MapContainer extends Component {
	render() {
		let { zoomLevel, onMarkerClick } = this.props;

		let style = {
			height: '10rem'
		};
    return (
      <Map zoom={zoomLevel}
				style={style}>
        {/* <Marker onClick={onMarkerClick} /> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w")
})(MapContainer)