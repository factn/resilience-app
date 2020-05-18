import { ListItemIcon } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import ExitToApp from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";

import OrganizerComponent from "../../component/OrganizerComponent";
import { useStyles } from "./NavigationDrawer.style";
import { AppLink, routes } from "../../routing";

const MenuItem = ({ classes, icon, text, to }) => (
  <AppLink to={to} className={classes.link}>
    <ListItem button>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  </AppLink>
);

export default function TemporaryDrawer() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <OrganizerComponent>
          <MenuItem
            text="Dashboard"
            to={routes.organizer.dashboard.home}
            icon={<DashboardIcon classes={{ root: classes.colorIcon }} fontSize="large" />}
            classes={classes}
          />
        </OrganizerComponent>

        <MenuItem
          text="Home"
          to={routes.home}
          icon={<HomeIcon classes={{ root: classes.colorIcon }} fontSize="large" />}
          classes={classes}
        />

        <MenuItem
          text="Missions Completed"
          to={routes.missions.completed}
          icon={<AssignmentIcon classes={{ root: classes.colorIcon }} fontSize="large" />}
          classes={classes}
        />

        <MenuItem
          text="Create Mission"
          to={routes.missions.createNew}
          icon={<AddIcon classes={{ root: classes.colorIcon }} fontSize="large" />}
          classes={classes}
        />

        <MenuItem
          text="My Requests"
          to={routes.recipient.dashboard.home}
          icon={<AssignmentIcon classes={{ root: classes.colorIcon }} fontSize="large" />}
          classes={classes}
        />

        <MenuItem
          text="My Status"
          to={routes.volunteer.status}
          icon={<EmojiPeopleIcon classes={{ root: classes.colorIcon }} fontSize="large" />}
          classes={classes}
        />

        <MenuItem
          text="User Profile"
          to={routes.user.profile}
          icon={<AccountCircleIcon classes={{ root: classes.colorIcon }} fontSize="large" />}
          classes={classes}
        />

        <MenuItem
          text="Signout"
          to={routes.logout}
          icon={<ExitToApp classes={{ root: classes.colorIcon }} fontSize="large" />}
          classes={classes}
        />

        <MenuItem
          text="About Us"
          to={routes.about}
          icon={<InfoIcon classes={{ root: classes.colorIcon }} fontSize="large" />}
          classes={classes}
        />
      </List>
    </div>
  );

  const anchor = "right";
  return (
    <React.Fragment key={anchor}>
      <IconButton
        aria-label="Menu"
        classes={{ root: classes.root, label: classes.label }}
        onClick={toggleDrawer(anchor, true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}
