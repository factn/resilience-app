import PropTypes from "prop-types";
import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import { MapStyle } from "./MapView.style";

function MapView(props) {
  const [state, setState] = React.useState({
    lat: props.values.lat,
    lng: props.values.long,
    zoom: 15,
  });
  const position = [state.lat, state.lng];
  return (
    <Map center={position} zoom={state.zoom} style={MapStyle} className="data-test-leaflet-mapview">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Start from here</Popup>
      </Marker>
    </Map>
  );
}

MapView.propTypes = {
  values: PropTypes.shape({
    lat: PropTypes.number,
    long: PropTypes.number,
  }),
};
export default MapView;
