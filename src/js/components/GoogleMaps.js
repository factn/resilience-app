/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Map, Marker, GoogleApiWrapper } from "google-maps-react" // https://github.com/fullstackreact/google-maps-react
/*** [end of imports] ***/

class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      markerShown: false,
      markerPos: {
        lat: -41.280789, // this should eventually default to user's location or current position
        lng: 174.775187 // this should eventually default to user's location or current position
      }
    }

    this.mapClicked = this.mapClicked.bind(this)
  }

  mapClicked = (mapProps, map, clickEvent) => {
    const { closeMapPicker } = this.props
    this.setState({
      markerShown: true,
      markerPos: clickEvent.latLng
    })

    return closeMapPicker(clickEvent.latLng.lat(), clickEvent.latLng.lng())
  }

  render() {
    const { google, zoomLevel, mapPickerIsOpen } = this.props

    return (
      <section className={mapPickerIsOpen ? "map-wrap open" : "map-wrap"}>
        <Map
          google={google}
          zoom={zoomLevel}
          initialCenter={this.state.markerPos}
          onClick={this.mapClicked}
        >
          {this.state.markerShown && <Marker position={this.state.markerPos} />}
        </Map>
      </section>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w"
})(MapContainer)