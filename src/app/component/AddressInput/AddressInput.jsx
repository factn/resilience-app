import AlgoliaPlaces from "algolia-places-react";
import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";

const { ALGOLIA_API_KEY, ALGOLIA_APP_ID } = process.env;

const AddressInput = (props) => {
  const { disabled, error, location, onClear, placeholder, setLocation, value } = props;
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
    }
  }, [placesRef, value]);

  return (
    <div style={error ? { border: "solid red" } : {}}>
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
