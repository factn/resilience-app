import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { H2 } from "../../component";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

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
}));

const Overview = ({ missions }) => {
  const classes = useStyles();

  const position = { lat: 37.773972, lng: -122.431297 };
  const positions = [
    { lat: 37.796323930015284, lng: -122.41264243216386 },
    { lat: 37.827604397936135, lng: -122.38415724966625 },
    { lat: 37.82039497659134, lng: -122.38623128124391 },
    { lat: 37.81134112431846, lng: -122.37342636494397 },
    { lat: 37.869215087055636, lng: -122.39766893924347 },
    { lat: 37.87311871592785, lng: -122.43038521985238 },
    { lat: 37.82343189256289, lng: -122.41429350739412 },
    { lat: 37.85076232765082, lng: -122.33736215261253 },
    { lat: 37.78671871649112, lng: -122.42419267754765 },
    { lat: 37.86248530057193, lng: -122.39323377700238 },
    { lat: 37.78368380923333, lng: -122.37276029255472 },
    { lat: 37.85478876084011, lng: -122.3705366360306 },
    { lat: 37.79153325062732, lng: -122.42812312720075 },
    { lat: 37.81849023631018, lng: -122.38218241487112 },
    { lat: 37.8493652094808, lng: -122.3646281666694 },
    { lat: 37.786292261642096, lng: -122.38261720964653 },
    { lat: 37.86861765000348, lng: -122.4296325219202 },
    { lat: 37.86930065295237, lng: -122.33730891516831 },
    { lat: 37.87199095611366, lng: -122.38884030871826 },
    { lat: 37.82029409394044, lng: -122.41757175481025 },
  ];
  return (
    <Grid container>
      <Grid container>
        <Map center={position} zoom={12} data-testid="map" className={classes.map}>
          <Marker position={position} />
          {positions?.map((pos) => (
            <Marker key={pos.lat} position={pos} />
          ))}
        </Map>
        <H2>Key</H2>
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

