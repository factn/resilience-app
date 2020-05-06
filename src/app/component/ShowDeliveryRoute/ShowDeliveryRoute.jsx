import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiMapIcon from "@material-ui/icons/Map";
import { Button, Link } from "@material-ui/core";
import axios from "axios";
import _ from "lodash";
import { tspSolverConfig } from "../../../config/tspApi";

const useStyles = makeStyles((theme) => ({
  italicsMuted: {
    textAlign: "center",
    fontStyle: "italic",
    marginTop: theme.spacing(1.5),
    opacity: "50%",
  },
}));

const ShowDeliveryRoute = ({ missions, isLoaded, isEmpty }) => {
  const classes = useStyles();
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");

  useEffect(() => {
    async function calcRoute() {
      var addresses = [];
      missions.map((mission) => {
        addresses.push(mission.pickUpLocation);
        addresses.push(mission.deliveryLocation);
        return [];
      });

      // constraints assume that every second address is a pickup/delivery address
      var constraints = {};
      for (var i = 0; i < addresses.length; i = i + 2) {
        constraints[i] = ["" + (i + 1)];
      }

      // It's worth noting that https://github.com/factn/mutual_aid_tsp is code for this back end
      const api_url = tspSolverConfig.apiEndPoint;
      const popup_base_url = tspSolverConfig.googlePopupBase;

      if (addresses.length > 0) {
        // get the data into the stupid format the api wants
        var idx = 0;
        var stupid_format = {};
        _.map(addresses, (address) => (stupid_format[idx++] = address));

        var req_data = {
          addresses: stupid_format,
          pickups: [],
          pickup_dropoff_constraints: constraints,
        };

        const response = await axios({
          method: "POST",
          url: api_url,
          data: req_data,
        });

        var addresses_for_google = _.map(response.data.optimal_addresses, (entry) => {
          return encodeURIComponent(entry.address);
        });

        var gmaps_url = popup_base_url + addresses_for_google.join("/");

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
    return <span className={classes.italicsMuted}>... calculating route ... </span>;
  }

  return (
    <Link href={googleMapsUrl} target="_blank">
      <Button fullWidth={true} variant="text" startIcon={<MuiMapIcon />}>
        View Route
      </Button>
    </Link>
  );
};

ShowDeliveryRoute.propTypes = {
  missions: PropTypes.array,
  isLoaded: PropTypes.bool,
  isEmpty: PropTypes.bool,
};

export default ShowDeliveryRoute;
