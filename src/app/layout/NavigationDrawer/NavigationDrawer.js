import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { useStyles } from "./NavigationDrawer.style";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentIcon from "@material-ui/icons/Assignment";
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon classes={{ root: classes.colorIcon }} fontSize="large" />
          </ListItemIcon>
          <Link to="/missions" className={classes.link}>
            <ListItemText primary="Volunteer needed" />
          </Link>
        </ListItem>
        <PrivateComponent>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon classes={{ root: classes.colorIcon }} fontSize="large" />
            </ListItemIcon>
            <Link to="/user/profile" className={classes.link}>
              <ListItemText primary="User Profile" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon classes={{ root: classes.colorIcon }} fontSize="large" />
            </ListItemIcon>
            <Link to="/missions/volunteered" className={classes.link}>
              <ListItemText primary="Volunteered Missions" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon classes={{ root: classes.colorIcon }} fontSize="large" />
            </ListItemIcon>
            <Link to="/missions/created" className={classes.link}>
              <ListItemText primary="My Requests" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EmojiPeopleIcon classes={{ root: classes.colorIcon }} fontSize="large" />
            </ListItemIcon>
            <Link to="/status" className={classes.link}>
              <ListItemText primary="My Status" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExitToApp classes={{ root: classes.colorIcon }} fontSize="large" />
            </ListItemIcon>
            <Link onClick={handleSignOut}>
              <ListItemText primary="Signout" />
            </Link>
          </ListItem>
        </PrivateComponent>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <Button
        aria-label="menu"
        arias-haspopup="true"
        classes={{ root: classes.root, label: classes.label }}
        onClick={handleClick}
      >
        <MenuIcon fontSize="large" />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        {list()}
      </Menu>
    </React.Fragment>
  );
}
