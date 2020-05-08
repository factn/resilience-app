import AlgoliaPlaces from "algolia-places-react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Map, Marker, TileLayer } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";

import React, { useRef, useEffect, useState } from "react";

const { ALGOLIA_API_KEY, ALGOLIA_APP_ID } = process.env;

const useStyles = makeStyles((theme) => ({
  disabledMap: {
    height: "100%",
    width: "100%",
    zIndex: 10000,
    opacity: 0.8,
    position: "absolute",
    backgroundColor: "whitesmoke",
  },
}));

const AddressInput = (props) => {
  const classes = useStyles();
  const { disabled, error, location, onClear, placeholder, setLocation, showMap, value } = props;

  const [zoom, setZoom] = useState(0);
  const [position, setPosition] = useState([0, 0]);

  const placesRef = useRef();
  const setRef = (ref) => {
    placesRef.current = ref;
  };

  const handleLocation = (query) => {
    if (query.suggestion) {
      const { latlng, value } = query.suggestion;
      setLocation({
        address: value,
        lat: latlng.lat,
        lng: latlng.lng,
      });
    }
  };

  useEffect(() => {
    if (value && placesRef?.current) {
      placesRef.current.setVal(value);

      if (zoom === 0) {
        setZoom(16);
      }
    }
  }, [placesRef, value, disabled, zoom]);

  useEffect(() => {
    if (location) {
      if (zoom === 0) {
        setZoom(16);
      }
      if (location.lat !== position[0]) {
        setPosition([location.lat, location.lng]);
      }
    }
  }, [location, zoom, position]);

  const marker = location ? (
    <Marker
      position={location}
      draggable={true}
      riseOnHover={true}
      onMoveend={(e) => {
        setLocation({
          address: location.address,
          lat: e.target._latlng.lat,
          lng: e.target._latlng.lng,
        });
      }}
    ></Marker>
  ) : null;

  return (
    <div style={error ? { border: "solid red" } : {}}>
      <>
        {showMap && (
          <>
            <Box textAlign="left">
              <small>Input location and move the marker to correct address</small>
            </Box>
            <Box width="100%" height="200px" position="relative">
              <Box className={disabled && classes.disabledMap}></Box>
              <Map center={position} zoom={zoom} style={{ width: "100%", height: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {marker}
              </Map>
            </Box>
          </>
        )}
        {disabled ? (
          <TextField
            disabled
            value={value}
            fullWidth
            placeholder={placeholder || "Search address"}
            variant="outlined"
          />
        ) : (
          <AlgoliaPlaces
            placeholder={placeholder || "Search address"}
            name={location}
            options={{
              appId: ALGOLIA_APP_ID,
              apiKey: ALGOLIA_API_KEY,
            }}
            onChange={(query) => handleLocation(query)}
            onLimit={({ message }) => message && console.log(message)}
            onClear={onClear}
            placesRef={setRef}
          />
        )}
      </>
    </div>
  );
};

AddressInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  location: PropTypes.any, // pickUp or dropOff
  setLocation: PropTypes.func,
  error: PropTypes.bool,
  onClear: PropTypes.func,
  value: PropTypes.string,
};

export default AddressInput;
