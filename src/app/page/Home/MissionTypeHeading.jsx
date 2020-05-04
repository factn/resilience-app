import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const missionTypeStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.color.lightgrey,
    marginBottom: "1rem",
    padding: "0.5rem 1rem",
    textAlign: "left",
  },
  label: {
    fontWeight: "bold",
    paddingLeft: "0.5rem",
    textTransform: "uppercase",
  },
}));

const MissionTypeHeading = ({ children, icon, label }) => {
  const classes = missionTypeStyles();
  return (
    <div className={clsx("mission-type-heading", classes.root)}>
      {icon}
      <span className={clsx("mission-type-label", classes.label)}>{label}</span>
      {children}
    </div>
  );
};

MissionTypeHeading.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  icon: PropTypes.element,
};

export default MissionTypeHeading;
