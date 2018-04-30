/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Map, Marker, GoogleApiWrapper } from "google-maps-react" // https://github.com/fullstackreact/google-maps-react
/*** [end of imports] ***/

class MapContainer extends Component {
  render() {
    const { google, zoomLevel, marker } = this.props

    return (
      <section className="map-wrap">
        <Map
          google={google}
          zoom={zoomLevel}
          initialCenter={marker}
          center={marker}
        >
          <Marker position={marker} />
        </Map>
      </section>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w"
})(MapContainer)
