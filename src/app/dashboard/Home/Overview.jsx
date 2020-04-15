import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Missions } from "../../model";
import { H2 } from "../../component";
import { color } from "../../../theme";
import OverviewItem from "./OverviewItem";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import PanToolRoundedIcon from "@material-ui/icons/PanToolRounded";
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  overview: {
    width: "400px",
    height: "160px",
  },
  icon: {
    fontSize: 40,
  },
}));

const Overview = ({ missions, className }) => {
  const classes = useStyles();
  const missionsNotStarted = Missions.filterByStatus(missions, "notStarted");
  const missionsQueued = Missions.filterByStatus(missions, "queued");

  return (
    <Grid container direction="column" spacing={2} className={className}>
      <Grid item style={{ alignSelf: "flex-start" }}>
        <H2>Overview</H2>
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <Card className={classes.overview}>
              <OverviewItem
                icon={
                  <AnnouncementIcon className={classes.icon} style={{ fill: color.darkPink }} />
                }
                title="UNASSIGNED MISSIONS"
                nbr={missionsNotStarted.length}
                link="View Unassigned Missions"
                textColor={color.darkPink}
              />
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.overview}>
              <OverviewItem
                icon={
                  <AnnouncementIcon className={classes.icon} style={{ fill: color.darkOrange }} />
                }
                title="QUEUED MISSIONS"
                nbr={missionsQueued.length}
                link="View Queued Missions"
                textColor={color.darkOrange}
              />
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.overview}>
              <OverviewItem
                icon={
                  <PanToolRoundedIcon
                    className={classes.icon}
                    style={{ fill: color.vibrantPurple }}
                  />
                }
                title="PENDING VOLUNTEERS"
                nbr="9" //TODO: Get actual votunteer numbers
                link="View Pending Volunteers"
                textColor={color.vibrantPurple}
              />
            </Card>
          </Grid>
        </Grid>
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
