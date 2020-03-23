/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"

// Local JS
import Database from "../resources/Database"

// Logo image
import mapMarkerAlt from "../../img/map-marker-alt.svg"
import customMapPin from "../../img/custom-map-pin.svg"
/*** [end of imports] ***/

class MiniMap extends Component {
  state = {
    markerShown: false,
    markerPos: this.props.initialCenter
  }

  mapClicked(mapProps, map, clickEvent) {
    const json = {
      data: {
        type: "users",
        id: 1,
        attributes: {
          latitude: clickEvent.latLng.lat().toString(),
          longitude: clickEvent.latLng.lng().toString()
        }
      }
    }

    this.setState({
      markerPos: {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng()
      }
    })

    Database.updateUser({ id: 1 }, json)
      .then(result => {})
      .catch(error => {})
  }

  render() {
    const { google, initialCenter, pins } = this.props

    return (
      <section className="mini-map-wrap">
        <Map google={google} zoom={pins ? 12 : 14} initialCenter={initialCenter}>
          <Marker position={this.state.markerPos} options={{ icon: mapMarkerAlt }} />
          {pins && pins.map((_pin, _index) => <Marker key={_index} position={_pin} options={{ icon: customMapPin }} />)}
        </Map>
      </section>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w"
})(MiniMap)
