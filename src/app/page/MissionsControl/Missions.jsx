import React from "react";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import Appbar from "./Appbar";
import Drawer from "./Drawer";
import MissionCard from "./MissionCard";

const drawerWidth = 240;

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

export default function MiniDrawer({
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

  return (
    <div className={classes.root}>
      <Appbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer open={open} handleDrawerClose={handleDrawerClose} />

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
