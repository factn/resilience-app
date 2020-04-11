import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { H2 } from "../../component";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import MapView from "../../component/MapView";

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

  return (
    <Grid container>
      <Grid container>
        <Box display="flex" width="100%" height="100px">
          <MapView values={{ lat: 37.773972, long: -122.431297 }} className={classes.map} />
        </Box>
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
