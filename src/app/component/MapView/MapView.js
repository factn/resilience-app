import React from "react";
import PropTypes from "prop-types";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  map: {
    width: "400px",
    height: "400x",
  },
}));

function MapView(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    lat: props.values.lat,
    lng: props.values.long,
    zoom: 12,
  });
  const position = [state.lat, state.lng];
  return (
    <Map
      center={position}
      zoom={state.zoom}
      data-testid="map"
      className={clsx(classes.map, props.className)}
    >
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
