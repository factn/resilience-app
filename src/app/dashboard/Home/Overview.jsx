import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import React from "react";
import { connect } from "react-redux";
import { color } from "../../../theme";
import { Mission } from "../../model";
import OverviewItem from "./OverviewItem";
import { DownloadMissionsCsv } from "../../component";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  overview: {
    width: "400px",
    height: "160px",
  },
  download: {
    padding: "10px 40px",
    width: "840px",
    height: "40px",
  },
  icon: {
    fontSize: 40,
  },
}));

const Overview = ({ incomplete, inDone, inPlanning, inProgress, inProposed }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} direction="column">
      <Grid item container spacing={2}>
        <Grid item>
          <Card className={classes.overview}>
            <OverviewItem
              icon={<AnnouncementIcon className={classes.icon} style={{ fill: color.red }} />}
              title="Proposed Missions"
              data={inProposed}
              linkLabel="View Proposed Missions"
              link="/dashboard/missions?view=inProposed"
              textColor={color.red}
            />
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.overview}>
            <OverviewItem
              icon={
                <AnnouncementIcon className={classes.icon} style={{ fill: color.darkOrange }} />
              }
              title="Missions In Planning"
              data={inPlanning}
              linkLabel="View Missions In Planning"
              link="/dashboard/missions?view=inPlanning"
              textColor={color.darkOrange}
            />
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.overview}>
            <OverviewItem
              icon={
                <AnnouncementIcon className={classes.icon} style={{ fill: color.deepPurple }} />
              }
              title="Missions In Progress"
              data={inProgress}
              linkLabel="View Missions In Progress"
              link="/dashboard/missions?view=inProgress"
              textColor={color.deepPurple}
            />
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.overview}>
            <OverviewItem
              icon={<AnnouncementIcon className={classes.icon} style={{ fill: color.green }} />}
              title="Completed Missions"
              data={inDone}
              linkLabel="View Completed Missions"
              link="/dashboard/missions?view=inDone"
              textColor={color.green}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Card className={classes.download}>
          <Grid xs={12} container spacing={2}>
            <Grid item xs={6}>
              <DownloadMissionsCsv
                filename="incomplete_missions"
                data={incomplete}
                label="Download all incomplete missions"
              />
            </Grid>
            <Grid item xs={6}>
              <DownloadMissionsCsv
                filename="completed_missions"
                data={inDone}
                label="Download all completed missions"
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
    inProposed: Mission.selectInProposed(state),
    inPlanning: Mission.selectInPlanning(state),
    inProgress: Mission.selectInProgress(state),
    inDone: Mission.selectInDone(state),
    incomplete: Mission.selectIncomplete(state),
  };
};

export default connect(mapStateToProps)(Overview);
