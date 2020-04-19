import React from "react";
import { Box, Grid, Chip } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Mission from "../../../model/Mission";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import _ from "../../../utils/lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  asap: {
    backgroundColor: theme.color.red,
    color: theme.color.white,
  },
}));

const TimeRow = ({ time }) => {
  const classes = useStyles();

  if (_.isEmpty(time.startTime) && !_.isDate(time.startTime)) {
    time = "";
  }

  let TimeTypeComponent;
  let timeType = _.get(time, "timeWindowType");
  if (timeType === Mission.TimeWindowType.asap) {
    TimeTypeComponent = () => (
      <div>
        <Chip label="ASAP" className={classes.asap} />
      </div>
    );
  } else {
    TimeTypeComponent = () => <div>{timeType}</div>;
  }
  return (
    <Grid item container className={classes.root}>
      <Box margin="0 5px">
        <AccessTimeIcon />
      </Box>
      <Box>
        {_.get(time, "startTime")}
        <TimeTypeComponent />
      </Box>
    </Grid>
  );
};
const LocationRow = ({ location }) => {
  const classes = useStyles();
  return (
    <Grid item container className={classes.root}>
      <Box margin="0 5px">
        <LocationOnIcon />
      </Box>
      {_.get(location, "address")}
    </Grid>
  );
};

const TimeLocation = ({ location, time }) => {
  if (_.isEmpty(time.startTime) && !_.isDate(time.startTime)) {
    time = "";
  }

  return (
    <Grid container spacing={1}>
      {time && <TimeRow time={time} />}
      {location.address && <LocationRow location={location} />}
    </Grid>
  );
};

export default TimeLocation;
