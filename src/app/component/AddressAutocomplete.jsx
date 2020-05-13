import React, { useEffect, useReducer, useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import throttle from "lodash/throttle";
import parse from "autosuggest-highlight/parse";
import { Map, Marker, TileLayer } from "react-leaflet";
import useGoogleMapAPI from "../hooks/useGoogleMapAPI";

const useStyles = makeStyles((theme) => ({
  disabledMap: {
    height: "100%",
    width: "100%",
    zIndex: 10000,
    opacity: 0.8,
    position: "absolute",
    backgroundColor: "whitesmoke",
  },
  mapHelperTextWrapper: {
    textAlign: "left",
    color: "darkgrey",
  },
  mapWrapper: {
    width: "100%",
    height: "200px",
    position: "relative",
    marginBottom: "8px",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const initLocationState = (location) => {
  if (location?.address) {
    return {
      options: [],
      zoom: 16,
      input: location.address,
      ...location,
    };
  }
  return {
    options: [],
    zoom: 0,
    address: "",
    lat: 0,
    lng: 0,
    input: "",
  };
};
function locationReducer(state, action) {
  switch (action.type) {
    // input new address, no location yet
    case "clearOptions": {
      return { ...state, options: [] };
    }
    case "setOptions": {
      return { ...state, options: action.options };
    }
    case "setInput":
      return { ...state, input: action.input };
    // once we know the address is valid, we should have new location here
    case "setLocation":
      let zoom = state.zoom;
      if (zoom === 0) {
        zoom = 16;
      }
      return {
        ...state,
        zoom: zoom,
        lat: action.lat,
        lng: action.lng,
        address: action.address,
        input: action.address,
      };
    case "clear":
      return initLocationState();
    default:
      throw new Error();
  }
}

const autocompleteService = { current: null };
const geocoderService = { current: null };

/**
 *
 * @param {address: "string", lat: number, lng: number} defaultLocation,
 * refer to Location in scheme.jsx, this location will just show up in the map
 *  if it is defined, even if the address and the marker are mismatched.
 *  Once a new address are input though the marker and the address should be correct once again
 *
 */
export default function AddressAutocomplete({
  defaultLocation,
  disabled,
  error,
  label,
  onChangeLocation,
  required,
  showMap,
}) {
  const classes = useStyles();
  const [location, dispatchLocation] = useReducer(
    locationReducer,
    initLocationState(defaultLocation)
  );

  useGoogleMapAPI();

  const handleInputChange = (_, value, reason) => {
    if (reason === "input") {
      dispatchLocation({
        type: "setInput",
        input: value,
      });
    } else if (reason === "clear") {
      dispatchLocation({ type: "clear" });
      onChangeLocation(null);
    }
  };
  const handleAutoChange = (request) => {
    let address = "";
    let lat = 0;
    let lng = 0;

    if (geocoderService.current && request) {
      fetchLatLng({ ...request }, (place) => {
        if (place[0]) {
          address = place[0].formatted_address;
          lat = place[0].geometry.location.lat();
          lng = place[0].geometry.location.lng();
          dispatchLocation({
            type: "setLocation",
            address,
            lat,
            lng,
          });
          onChangeLocation({
            address,
            lat,
            lng,
          });
        }
      });
    } else {
      dispatchLocation({ type: "clear" });
      onChangeLocation({
        address,
        lat,
        lng,
      });
    }
  };

  const fetchLatLng = useMemo(
    () =>
      throttle((request, callback) => {
        geocoderService.current.geocode(request, callback);
      }, 200),
    []
  );
  const fetchPlacePredictions = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  useEffect(() => {
    if (!defaultLocation) return;
    const { address, lat, lng } = defaultLocation;
    dispatchLocation({ type: "setLocation", address, lat, lng });
  }, [defaultLocation]);

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      geocoderService.current = new window.google.maps.Geocoder();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (location.input === "") {
      dispatchLocation({ type: "clearOptions" });
      return undefined;
    }

    fetchPlacePredictions({ input: location.input }, (results) => {
      if (active) {
        dispatchLocation({
          type: "setOptions",
          options: results || [],
        });
      }
    });

    return () => {
      active = false;
    };
  }, [location.input, fetchPlacePredictions]);

  return (
    <>
      {showMap && (
        <>
          <Box className={classes.mapHelperTextWrapper}>
            <small>Dragg the marker to correct address</small>
          </Box>
          <Box className={classes.mapWrapper}>
            <Box className={disabled && classes.disabledMap}></Box>
            <Map
              className={classes.map}
              center={location.lat ? [location.lat, location.lng] : [0, 0]}
              zoom={location.zoom}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {location.lat && (
                <Marker
                  position={location.lat ? [location.lat, location.lng] : [0, 0]}
                  draggable={true}
                  riseOnHover={true}
                  onMoveend={(e) => {
                    handleAutoChange({
                      location: e.target._latlng,
                    });
                  }}
                />
              )}
            </Map>
          </Box>
        </>
      )}
      <Autocomplete
        inputValue={location.input}
        id="google-map-demo"
        style={{ width: "100%" }}
        getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
        filterOptions={(x) => x}
        options={location.options}
        autoComplete
        disabled={disabled}
        includeInputInList
        getOptionSelected={(option, value) => {
          return option.description === value.description;
        }}
        onChange={(_, place) => place?.place_id && handleAutoChange({ placeId: place.place_id })}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            fullWidth
            error={error}
            required={required}
          />
        )}
        renderOption={(option) => {
          const matches = option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length])
          );

          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
    </>
  );
}
