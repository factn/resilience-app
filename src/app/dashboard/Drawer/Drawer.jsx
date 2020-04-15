import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import { Button } from "../../component";
import { Grid } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.spacing(18),
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: theme.spacing(18),
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(5),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 0,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  item: {
    borderRadius: 0,
    justifyContent: "left",
    height: theme.spacing(5),
    paddingLeft: theme.spacing(2),
  },
  startIcon: {
    paddingRight: theme.spacing(2),
  },
}));

const DashboardDrawer = ({ open, handleDrawerClose, drawerItems, currentUrl }) => {
  const isActive = (url) => url === currentUrl;

  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <Grid container direction="column">
        {drawerItems.map((item) => (
          <Button
            key={item.id}
            onClick={item.handler}
            classes={{ root: classes.item, startIcon: classes.startIcon }}
            variant={isActive(item.id) ? "contained" : "text"}
            startIcon={item.icon}
          >
            {item.text}
          </Button>
        ))}
      </Grid>
      <Divider />
    </Drawer>
  );
};

DashboardDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, icon: PropTypes.object, handler: PropTypes.func })
  ),
};

export default DashboardDrawer;
