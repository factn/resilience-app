import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import ExitToApp from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PeopleIcon from "@material-ui/icons/People";
import clsx from "clsx";
import React, { useEffect } from "react";

import { useStyles } from "./NavigationDrawer.style";
import { AppLink, routes } from "../../routing";
import { PERMISSIONS, UserPermissionsService } from "../../model/permissions";
import { isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";

//Note: ListItemIcon always require a child
const MenuItem = ({ classes, icon, text, to }) => (
  <AppLink to={to} className={classes.link}>
    <ListItem button>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={text} className={clsx({ [classes.listItemTextWithoutIcon]: !icon })} />
    </ListItem>
  </AppLink>
);

export default function TemporaryDrawer() {
  const classes = useStyles();
  const auth = useSelector((state) => state.firebase.auth);

  const [state, setState] = React.useState({
    right: false,
  });
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (isLoaded(auth)) {
      UserPermissionsService.getUserRole(auth).then(() => setIsLoading(false));
    }
  }, [auth, isLoading]);

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
        {UserPermissionsService.hasPermission(PERMISSIONS.AUTHENTICATED) === false && (
          <MenuItem
            text="Sign In"
            to={routes.login}
            icon={<DoubleArrowIcon classes={{ root: classes.colorIcon }} />}
            classes={classes}
          />
        )}

        <MenuItem
          text="Requests"
          to={routes.recipient.dashboard.home}
          icon={<MoveToInboxIcon classes={{ root: classes.colorIcon }} />}
          classes={classes}
        />

        <MenuItem
          text="I Need Help"
          to={routes.request.start}
          icon={<FavoriteIcon classes={{ root: classes.colorIcon }} />}
          classes={classes}
        />

        {UserPermissionsService.hasPermission(PERMISSIONS.BECOME_VOLUNTEER) && (
          <MenuItem
            text="Help Volunteer"
            to={routes.user.signup}
            icon={<PeopleIcon classes={{ root: classes.colorIcon }} />}
            classes={classes}
          />
        )}

        <MenuItem
          text="Organizer Dashboard"
          to={routes.organizer.dashboard.home}
          icon={<DashboardIcon classes={{ root: classes.colorIcon }} />}
          classes={classes}
        />

        {UserPermissionsService.hasPermission(PERMISSIONS.VIEW_MISSIONS) && (
          <>
            <MenuItem
              text="Volunteer Dashboard"
              to={routes.volunteer.dashboard.home}
              icon={<PeopleIcon classes={{ root: classes.colorIcon }} />}
              classes={classes}
            />
            <MenuItem
              text="Awaiting Confirmation"
              to={routes.missions.delivered}
              classes={classes}
            />

            <MenuItem text="Done" to={routes.missions.completed} classes={classes} />
          </>
        )}

        <MenuItem
          text="Profile"
          to={routes.user.profile}
          icon={<AccountCircleIcon classes={{ root: classes.colorIcon }} />}
          classes={classes}
        />

        <MenuItem
          text="Logout"
          to={routes.logout}
          icon={<ExitToApp classes={{ root: classes.colorIcon }} />}
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
        <div className={clsx("drawer", classes.drawer)}>
          <Grid container direction="column" classes={{ root: classes.root }}>
            <Grid item classes={{ root: classes.menu }}>
              {isLoading && <LinearProgress className={classes.loading} />}
              <ListItem
                button
                classes={{ root: classes.close }}
                onClick={toggleDrawer(anchor, false)}
              >
                <ListItemIcon classes={{ root: classes.close }}>
                  <CloseIcon classes={{ root: classes.closeIcon }} />
                </ListItemIcon>
              </ListItem>
              {!isLoading && list(anchor)}
            </Grid>
            <Grid item className={clsx("menu-footer", classes.menuFooter)}>
              <AppLink
                to={routes.about}
                className={clsx("powered-by", classes.bottomBar, classes.poweredBy)}
              >
                <span>
                  Powered by <strong>Resilience</strong>
                </span>
              </AppLink>
            </Grid>
          </Grid>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
