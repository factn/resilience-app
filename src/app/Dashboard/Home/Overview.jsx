import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Mission } from "../../model";
import { H2, H4 } from "../../component";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import AnnouncementIcon from "@material-ui/icons/Announcement";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  overview: {
    width: "400px",
    height: "180px",
  },
}));

const Item = ({ Icon, Title, Nbr, Link }) => (
  <Grid container>
    <Grid item xs={2}>
      {Icon}
    </Grid>
    <Grid item xs={10} container direction="column">
      <Grid item>
        <H4>{Title}</H4>
      </Grid>
      <Grid item>{Nbr}</Grid>
      <Grid item>{Link}</Grid>
    </Grid>
  </Grid>
);
const Overview = ({ missions }) => {
  const classes = useStyles();
  const missionsNotStarted = Mission.filterByStatus(missions, "notStarted");
  const missionsQueued = Mission.filterByStatus(missions, "queued");

  return (
    <Grid container>
      <Grid container>
        <H2>Overview</H2>
      </Grid>
      <Grid item>
        <Card className={classes.overview}>
          <Item
            Icon={<AnnouncementIcon />}
            Title="Unassigned Missions"
            Nbr="60"
            Link="View Unassigned Missions"
          />
        </Card>
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
