import { makeStyles } from "@material-ui/core/styles";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PanToolIcon from "@material-ui/icons/PanTool";
import PeopleIcon from "@material-ui/icons/People";
import clsx from "clsx";
import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { Route, Switch } from "react-router-dom";

import CreateMission from "./Missions/CreateMission";
import { Mission, User } from "../model";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import Overview from "./Home";
import DashboardMissions from "./Missions";
import { useOrganization } from "../model/Organization";
import { routes } from "../routing";

const useStyles = makeStyles((theme) => ({
  root: {
    // the padding accounted for left menu and top header
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
  },
  contentShift: {
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.spacing(1),
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(6),
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: "auto",
  },
}));

/**
 * Component for controlling missions status
 *
 * @component
 */
const MissionsPage = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const org = useOrganization();

  useFirestoreConnect(() => {
    const id = org.uid;
    return [
      Mission.fsInProposed(id),
      Mission.fsInPlanning(id),
      Mission.fsInProgress(id),
      Mission.fsInDone(id),
      Mission.fsIncomplete(id),
      User.fsVolunteer(id),
      { collection: "organizations", doc: id },
    ];
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // this should be async
  const drawerItems = [
    {
      text: "Home",
      id: routes.organizer.dashboard.home,
      route: routes.organizer.dashboard.home,
      icon: <HomeIcon />,
    },
    {
      text: "Missions",
      id: routes.organizer.dashboard.missions,
      route: `${routes.organizer.dashboard.missions}?view=inProposed`,
      icon: <AnnouncementIcon />,
    },
    {
      text: "Recipients",
      id: routes.organizer.dashboard.recipients,
      route: routes.organizer.dashboard.recipients,
      icon: <PeopleIcon />,
    },
    {
      text: "Volunteers",
      id: routes.organizer.dashboard.volunteers,
      route: routes.organizer.dashboard.volunteers,
      icon: <PanToolIcon />,
    },
    {
      text: "New Mission",
      id: "/dashboard/missions/create",
      route: "/dashboard/missions/create",
      icon: <AddCircleIcon />,
    },
  ];

  return (
    <div className={classes.root}>
      <Appbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerItems={drawerItems}
        role="navigation"
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Switch>
          <Route exact path="/dashboard/missions" component={DashboardMissions} />
          <Route exact path="/dashboard/missions/create" component={CreateMission} />
          <Route exact path="/dashboard/" component={() => <Overview />} />
        </Switch>
      </main>
    </div>
  );
};

export default MissionsPage;
