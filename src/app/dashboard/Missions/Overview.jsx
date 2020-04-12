import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { H2 } from "../../component";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { Map, TileLayer, Marker } from "react-leaflet";
import FastfoodIcon from "@material-ui/icons/Fastfood";

import Switch from "@material-ui/core/Switch";

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

  const [state, setState] = React.useState({
    showFood: true,
    showGeneral: true,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const FastFoodIconHtml = renderToString(<FastfoodIcon />);
  console.log(FastFoodIconHtml);

  const FoodIcon = new DivIcon({
    className: classes.customDivIcon,
    html: `<div class='${classes.markerPin}'></div>${FastFoodIconHtml}`,
    iconSize: [30, 42],
    iconAnchor: [15, 42], // half of width + height
  });
  const position = { lat: 37.773972, lng: -122.431297 };
  const missionsFood = [
    { lat: 37.796323930015284, lng: -122.41264243216386 },
    { lat: 37.827604397936135, lng: -122.38415724966625 },
    { lat: 37.82039497659134, lng: -122.38623128124391 },
    { lat: 37.81134112431846, lng: -122.37342636494397 },
    { lat: 37.869215087055636, lng: -122.39766893924347 },
    { lat: 37.87311871592785, lng: -122.43038521985238 },
  ];
  const missionsGeneral = [
    { lat: 37.82343189256289, lng: -122.41429350739412 },
    { lat: 37.85076232765082, lng: -122.33736215261253 },
    { lat: 37.78671871649112, lng: -122.42419267754765 },
    { lat: 37.86248530057193, lng: -122.39323377700238 },
    { lat: 37.85478876084011, lng: -122.3705366360306 },
    { lat: 37.82029409394044, lng: -122.41757175481025 },
  ];
  return (
    <Grid container>
      <Grid container>
        <Map center={position} zoom={12} data-testid="map" className={classes.map}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {state.showFood &&
            missionsFood?.map((pos) => <Marker key={pos.lat} position={pos} icon={FoodIcon} />)}
        </Map>
        <H2>Key</H2>
      </Grid>
      <Grid>
        <Switch checked={state.showFood} onChange={handleChange} name="showFood" />
        Food
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
    missions: state.firestore.data.missions,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [{ collection: "missions" }, { collection: "users" }];
  })
)(Overview);



