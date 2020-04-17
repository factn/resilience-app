import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clsx from "clsx";

import { compose } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import Home from "./Home";
import Missions from "./Missions";
import { Switch, Route } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import PeopleIcon from "@material-ui/icons/People";
import PanToolIcon from "@material-ui/icons/PanTool";

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
    marginLeft: theme.spacing(2),
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
const MissionsPage = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // this should be async
  const downloadData = [];
  const drawerItems = [
    {
      text: "Home",
      id: "/dashboard",
      handler: () => history.push("/dashboard"),
      icon: <HomeIcon />,
    },
    {
      text: "Missions",
      id: "/dashboard/missions",
      handler: () => history.push("/dashboard/missions"),
      icon: <AnnouncementIcon />,
    },
    {
      text: "Recipients",
      id: "/dashboard/recipients",
      handler: () => history.push("/dashboard/recipients"),
      icon: <PeopleIcon />,
    },
    {
      text: "Volunteers",
      id: "/dashboard/volunteers",
      handler: () => history.push("/dashboard/volunteers"),
      icon: <PanToolIcon />,
    },
  ];

  const currentUrl = history.location.pathname;
  return (
    <div className={classes.root}>
      <Appbar open={open} handleDrawerOpen={handleDrawerOpen} currentUrl={currentUrl} />
      <Drawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerItems={drawerItems}
        currentUrl={currentUrl}
        role="navigation"
      />
      <main
        container
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Switch>
          <Route path="/dashboard/missions" component={Missions} />
          <Route path="/dashboard/" component={() => <Home />} />
        </Switch>
      </main>
    </div>
  );
};

MissionsPage.propTypes = {
  /**
   * User info
   */
  user: PropTypes.object,
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
  };
};
export default compose(connect(mapStateToProps))(withRouter(MissionsPage));
