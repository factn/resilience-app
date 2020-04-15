import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { Map, TileLayer, Marker } from "react-leaflet";
import FastfoodIcon from "@material-ui/icons/Fastfood";

import { DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  preview: {
    padding: theme.spacing(2),
  },
  map: {
    width: "100%",
    height: "500px",
  },
  foodIcon: {
    backgroundColor: "red",
  },
  customDivIcon: {
    "& svg": {
      position: "absolute",
      width: "22px",
      fontSize: "22px",
      left: "0",
      right: "0",
      margin: "10px auto",
      textAlign: "center",
    },
  },
  markerPin: {
    width: "30px",
    height: "30px",
    borderRadius: "50% 50% 50% 0",
    background: "#c30b82",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "rotate(-45deg)",
    margin: "-15px 0 0 -15px",
    "&::after": {
      content: "' '",
      left: "0%",
      top: "0%",
      width: "24px",
      height: "24px",
      margin: "3px 0 0 3px",
      background: "#fff",
      position: "absolute",
      borderRadius: "50%",
    },
  },
}));

const Overview = ({ missions }) => {
  const classes = useStyles();

  const FastFoodIconHtml = renderToString(<FastfoodIcon />);

  const FoodIcon = new DivIcon({
    className: classes.customDivIcon,
    html: `<div class='${classes.markerPin}'></div>${FastFoodIconHtml}`,
    iconSize: [30, 42],
    iconAnchor: [15, 42], // half of width + height
  });
  const position = { lat: 37.773972, lng: -122.431297 };
  let filtered = missions?.filter((mission) => {
    return mission.deliveryLocation && mission.deliveryLocation.lat;
  });

  return (
    <Grid container>
      <Grid container>
        <Map center={position} zoom={12} className={`${classes.map} data-test-leaftleft-map`}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filtered?.map((mission) => (
            <Marker key={mission.id} position={mission.deliveryLocation} icon={FoodIcon} />
          ))}
        </Map>
      </Grid>
    </Grid>
  );
};

export default Overview;
