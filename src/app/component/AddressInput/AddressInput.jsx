import AlgoliaPlaces from "algolia-places-react";
import PropTypes from "prop-types";
import React from "react";

const { ALGOLIA_API_KEY, ALGOLIA_APP_ID } = process.env;

const AddressInput = (props) => {
  const { placeholder, setStage, stage } = props;
  const handleLocation = (query) => {
    if (query.suggestion) {
      const { countryCode, county, latlng, value } = query.suggestion;
      setStage({
        ...stage,
        location: {
          address: value,
          lat: latlng.lat,
          long: latlng.lng,
          county,
          countryCode,
        },
      });
    }
  };
  return (
    <AlgoliaPlaces
      placeholder={placeholder || "Search address"}
      name={stage}
      options={{
        appId: ALGOLIA_APP_ID,
        apiKey: ALGOLIA_API_KEY,
        language: "en",
        countries: ["us"], // we have to support more countries in the future
        // Other options from https://community.algolia.com/places/documentation.html#options
      }}
      onChange={(query) => handleLocation(query)}
      onLimit={({ message }) => message && console.log(message)}
    />
  );
};

AddressInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  stage: PropTypes.any, // pickUp or dropOff
  setStage: PropTypes.func,
};

export default AddressInput;
