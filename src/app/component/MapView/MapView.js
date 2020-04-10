import React from "react";
import PropTypes from "prop-types";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { MapStyle } from "./MapView.style";

/**
 * Component for displaying map view
 *
 * @component
 */
function MapView(props) {
  const [state, setState] = React.useState({
    lat: props.values.lat,
    lng: props.values.long,
    zoom: 15,
  });
  const position = [state.lat, state.lng];
  return (
    <Map center={position} zoom={state.zoom} style={MapStyle} data-testid="map">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Start from hereHOAGIES</Popup>
      </Marker>
    </Map>
  );
}

MapView.propTypes = {
  values: PropTypes.shape({
    lat: PropTypes.number,
    long: PropTypes.number,
  })
};
export default MapView;
