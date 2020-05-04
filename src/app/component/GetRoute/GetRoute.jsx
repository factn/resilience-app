import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const GetRoute = ({ mission }) => {
  const rawRoutePathData = {
    addresses: {
      "0": `${mission.pickUpLocation}`,
      "1": `${mission.deliveryLocation}`,
    },
    pickups: ["0"],
    pickup_dropoff_constraints: {
      "0": ["1"],
    },
  };

  async function submitAddresses() {
    let url = "https://mutualaid-tsp.herokuapp.com/shortest-route";
    fetch(url, {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: rawRoutePathData,
    })
      .then(json)
      .then(function (data) {
        console.log("Request succeeded with JSON response", data);
        displayMapData(data);
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  function displayMapData(mapData) {
    const geoLocations = mapData.geolocations;
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${geoLocations[0]}&destination=${geoLocations[1]}&travelmode=driving`
    );
  }

  return (
    <Button variant="contained" color="primary" onClick={submitAddresses}>
      View Route
    </Button>
  );
};

GetRoute.propTypes = {
  /**
   * Mission details
   */
  mission: PropTypes.shape({
    pickUpLocation: PropTypes.string,
    deliveryLocation: PropTypes.string,
  }),
};

export default GetRoute;
