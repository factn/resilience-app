/*** IMPORTS ***/
// Module imports
import React from "react"
import { Map, Marker, GoogleApiWrapper } from "google-maps-react" // https://github.com/fullstackreact/google-maps-react
/*** [end of imports] ***/

const MapContainer = props => (
  <section className="map-wrap">
    <Map google={props.google} zoom={props.zoomLevel} initialCenter={props.marker} center={props.marker}>
      <Marker position={props.marker} />
    </Map>
  </section>
)

export default GoogleApiWrapper({
  apiKey: "AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w"
})(MapContainer)
