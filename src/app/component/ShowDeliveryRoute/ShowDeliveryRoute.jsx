import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import MuiMapIcon from "@material-ui/icons/Map";
import { Button } from "@material-ui/core";
import axios from "axios";
import _ from "lodash";
import querystring from "querystring";

//import styled from "styled-components";
//import { withLoading } from "../HOC";

//import AlgoliaPlaces from "algolia-places-react";
//const { ALGOLIA_API_KEY, ALGOLIA_APP_ID } = process.env;

const ShowDeliveryRoute = ({ missions, isLoaded, isEmpty }) => {
  console.log(missions);
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");

  useEffect(() => {
    async function calcRoute() {
      var addresses = [];
      missions.map((mission) => {
        addresses.push(mission.pickUpLocation);
        addresses.push(mission.deliveryLocation);
      });

      //TODO: actually ensure that pickup/dropoff constraints are supplied (doesnt work now anyway though)

      // It's worth noting that https://github.com/factn/mutual_aid_tsp is deployed to the below herokuapp
      const api_url = "https://resilience-tsp.herokuapp.com/shortest-route-given-geocodes";

      if (addresses.length > 0) {
        console.log(addresses);

        var idx = 0;
        var stupid_format = {};
        _.map(addresses, (address) => (stupid_format[idx++] = address));

        var req_data = {
          addresses: stupid_format,
          pickups: [],
          pickup_dropoff_constraints: {},
        };

        const response = await axios({
          method: "POST",
          url: api_url,
          data: req_data,
        });

        console.log("--------response----------");
        console.log(response.data);

        var addresses_for_google = _.map(response.data.optimal_addresses, (entry) => {
          console.log(entry.address);
          return querystring.stringify(entry.address);
        });

        var gmaps_url = "https://www.google.com/maps/dir/" + addresses_for_google.join(",");
        // https://www.google.com/maps/dir/1012+W+Ventura+Blvd,+Camarillo,+CA+93010/2012+W+Ventura+Blvd,+Camarillo,+CA+93010/10+W+Ventura+Blvd,+Camarillo,+CA+93010"

        console.log(gmaps_url);
        setGoogleMapsUrl(gmaps_url);
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
