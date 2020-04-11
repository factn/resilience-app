import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import MissionCard from "./MissionCard";
import { downloadAsCsv } from "./missionControlUtilities";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 0,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  preview: {
    padding: theme.spacing(2),
  },
}));

export default function MissionsControlView({
  missionsNotStarted,
  missionsQueued,
  missionsInProgress,
  missionsPending,
  missionsFinished,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const downloadData = [
    ...missionsNotStarted,
    ...missionsQueued,
    ...missionsInProgress,
    ...missionsPending,
    ...missionsFinished,
  ];
  const drawerItems = [
    {
      text: "Download as CSV",
      icon: <GetAppRoundedIcon />,
      handler: () => {
        downloadAsCsv(downloadData, "Missions Overview");
      },
    },
  ];

  return (
    <div className={classes.root}>
      <Appbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer open={open} handleDrawerClose={handleDrawerClose} drawerItems={drawerItems} />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Grid container>
          <Grid item xs={4}>
            <Paper elevation={3} variant="outlined" className={classes.preview}>
              <Typography variant="h3">Missions not started</Typography>
              {missionsNotStarted?.map((mission) => (
                <MissionCard mission={mission} key={`preview-${mission.id}`} />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} variant="outlined" className={classes.preview}>
              <Typography variant="h3">Missions queued</Typography>
              {missionsQueued?.map((mission) => (
                <MissionCard mission={mission} key={`preview-${mission.id}`} />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} variant="outlined" className={classes.preview}>
              <Typography variant="h3">Missions In Progress</Typography>
              {missionsInProgress?.map((mission) => (
                <MissionCard mission={mission} key={`preview-${mission.id}`} />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} variant="outlined" className={classes.preview}>
              <Typography variant="h3">Missions Pending</Typography>
              {missionsPending?.map((mission) => (
                <MissionCard mission={mission} key={`preview-${mission.id}`} />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} variant="outlined" className={classes.preview}>
              <Typography variant="h3">Missions Finished</Typography>
              {missionsFinished?.map((mission) => (
                <MissionCard mission={mission} key={`preview-${mission.id}`} />
              ))}
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
