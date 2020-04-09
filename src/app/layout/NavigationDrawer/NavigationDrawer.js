import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { useStyles } from "./NavigationDrawer.style";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NewReleases from "@material-ui/icons/NewReleases";
import Dashboard from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PanTool from "@material-ui/icons/PanTool";
import ExitToApp from "@material-ui/icons/ExitToApp";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import { Link, useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import { PrivateComponent } from "../../component";
import { ListItemIcon } from "@material-ui/core";

export default function TemporaryDrawer() {
  const firebase = useFirebase();
  const history = useHistory();
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

  const handleSignOut = () => {
    firebase.logout();
    history.push("/");
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
        <Link to="/missions" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon classes={{ root: classes.colorIcon }} fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Volunteer needed" />
          </ListItem>
        </Link>
        <PrivateComponent>
          <Link to="/missions/control">
            <ListItem button>
              <ListItemIcon>
                <Dashboard classes={{ root: classes.colorIcon }} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Missions Control" />
            </ListItem>
          </Link>
          <Link to="/missions/new">
            <ListItem button>
              <ListItemIcon>
                <NewReleases classes={{ root: classes.colorIcon }} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Create Mission" />
            </ListItem>
          </Link>
          <Link to="/user/profile" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon classes={{ root: classes.colorIcon }} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="User Profile" />
            </ListItem>
          </Link>
          <Link to="/missions/volunteered" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon classes={{ root: classes.colorIcon }} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Volunteered Missions" />
            </ListItem>
          </Link>
          <Link to="/missions/created" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <PanTool classes={{ root: classes.colorIcon }} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="My Requests" />
            </ListItem>
          </Link>
          <Link to="/status" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <EmojiPeopleIcon classes={{ root: classes.colorIcon }} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="My Status" />
            </ListItem>
          </Link>
          <ListItem button onClick={handleSignOut}>
            <ListItemIcon>
              <ExitToApp classes={{ root: classes.colorIcon }} fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Signout" />
          </ListItem>
        </PrivateComponent>
      </List>
    </div>
  );

  const anchor = "right";
  return (
    <React.Fragment key={anchor}>
      <Button
        aria-label="Menu"
        classes={{ root: classes.root, label: classes.label }}
        onClick={toggleDrawer(anchor, true)}
      >
        <MenuIcon fontSize="large" />
      </Button>
      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}
