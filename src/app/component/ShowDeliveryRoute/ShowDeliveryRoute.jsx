import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import MuiMapIcon from "@material-ui/icons/Map";
import { Button, CircularProgress } from "@material-ui/core";
import axios from "axios";
//import styled from "styled-components";
//import { withLoading } from "../HOC";

//import AlgoliaPlaces from "algolia-places-react";
//const { ALGOLIA_API_KEY, ALGOLIA_APP_ID } = process.env;

const ShowDeliveryRoute = ({ missions, isLoaded, isEmpty }) => {
  console.log(missions);
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");

  useEffect(() => {
    async function calcRoute() {
      const addresses = missions.map((mission) => {
        return {
          pickup: mission.pickUpLocation.address,
          dropoff: mission.deliveryLocation.address,
        };
      });

      //TODO: complex formatting to actually reformat pickups/addresses into the right JSON format
      //TODO: add 'Access-Control-Allow-Origin' .. to server side?
      //      if so worth noting that https://github.com/factn/mutual_aid_tsp is autodeployed to
      //      below herokuapp when new code hits master branch

      if (addresses.length > 0) {
        const result = await axios.post("https://resilience-tsp.herokuapp.com/shortest-route", {
          data: addresses,
        });

        //TODO: take the result from the query figure out which addreses
        //      and format the result in a way similar to the below..
        var url =
          "https://www.google.com/maps/dir/1012+W+Ventura+Blvd,+Camarillo,+CA+93010/2012+W+Ventura+Blvd,+Camarillo,+CA+93010/10+W+Ventura+Blvd,+Camarillo,+CA+93010";
        setGoogleMapsUrl(url);
      }
    }
    calcRoute();
  }, [missions]);

  // issions loading
  if (!isLoaded) {
    return <span>...</span>;
  }

  // missions empty
  if (isEmpty) {
    return <span></span>;
  }

  if (!googleMapsUrl) {
    return <span>calculating route</span>;
  }

  return (
    <Button fullWidth={true} variant="text" startIcon={<MuiMapIcon />}>
      View Route
    </Button>
  );
};

ShowDeliveryRoute.propTypes = {
  missions: PropTypes.array,
  isLoaded: PropTypes.bool,
  isEmpty: PropTypes.bool,
};

export default ShowDeliveryRoute;
