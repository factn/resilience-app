import AlgoliaPlaces from "algolia-places-react";
import PropTypes from "prop-types";
import React from "react";

const { ALGOLIA_API_KEY, ALGOLIA_APP_ID } = process.env;

const AddressInput = ({ placeholder, setLocation, location, disabled }) => {
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

  return (
    <AlgoliaPlaces
      disabled={disabled}
      placeholder={placeholder || "Search address"}
      name={location}
      options={{
        appId: ALGOLIA_APP_ID,
        apiKey: ALGOLIA_API_KEY,
      }}
      onChange={(query) => handleLocation(query)}
      onLimit={({ message }) => message && console.log(message)}
    />
  );
};

AddressInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  location: PropTypes.any, // pickUp or dropOff
  setLocation: PropTypes.func,
};

export default AddressInput;
