/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';	// https://github.com/fullstackreact/google-maps-react
/*** [end of imports] ***/

export class MapContainer extends Component {
	render() {
		let { google, zoomLevel, onMarkerClick } = this.props;

    const style = {
      width: '100%',
      height: 'calc(100vh - 2.5rem)'
    };

    let initialCenter = {
      lat: 40.854885,
      lng: -88.081807
    }

    return (
      <Map google={google}
        zoom={zoomLevel}
				style={style}
        initialCenter={initialCenter}>
        {/* <Marker onClick={onMarkerClick} /> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w")
})(MapContainer)