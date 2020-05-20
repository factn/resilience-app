import { Box, Grid, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import PanToolIcon from "@material-ui/icons/PanTool";
import Chip from "@material-ui/core/Chip";
import clsx from "clsx";
import React, { useEffect } from "react";
import DetailsText from "../../component/MissionComponent/DetailsText";

import Mission from "../../model/Mission";
import _ from "../../utils/lodash";
import MissionItemMenu from "./component/MissionItemMenu";
import NotFundedStatusAction from "./component/NotFundedStatusAction";
import DeliveredAction from "./component/DeliveredAction";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    textAlign: "left",
    backgroundColor: "white",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minHeight: "100px",
  },
  item: {
    flexBasis: "100%",
  },
  isSelected: {
    borderColor: theme.palette.primary.main,
  },
  MenuRightWrapper: {
    top: "4px",
    right: "0px",
    cursor: "pointer",
    position: "absolute",
  },
  link: {
    textDecoration: "underline",
    color: theme.color.black,
    cursor: "pointer",
  },

  chipsContainer: {
    fontSize: "14px",
  },
  chipReady: {
    color: theme.color.greenSuccess,
  },
  chipNotReady: {
    color: "#ababab",
  },
  chipNeedsVolunteer: {
    color: theme.color.redlines,
  },
  chipInProgress: {
    color: theme.color.yellow,
  },
  chipFailed: {
    color: theme.color.red,
  },
}));

/** BEGIN ACTION*/

const Action = ({ mission }) => {
  let { status } = mission;

  if (status === Mission.Status.unassigned) {
    return <NotFundedStatusAction mission={mission} />;
  }
  if ([Mission.Status.delivered, Mission.Status.started].includes(mission.status)) {
    return <DeliveredAction mission={mission} />;
  }

  return null;
};
/** END ACTION*/

const Row = ({ children, Icon }) => {
  return (
    <Grid item container spacing={1}>
      <Grid item>{Icon && <Icon color="primary" />}</Grid>
      <Grid item xs>
        {children}
      </Grid>
    </Grid>
  );
};
const LocationRow = ({ label, location }) => {
  if (!location) return null;
  return (
    <>
      <Box width="100%">
        <b>{label}</b>
      </Box>
      <Row Icon={LocationOnIcon}>{_.get(location, "address")}</Row>
    </>
  );
};

const VolunteerRow = ({ mission }) => {
  const { tentativeVolunteerDisplayName, volunteerDisplayName } = mission;
  let assigned = "";
  if (volunteerDisplayName) {
    assigned = volunteerDisplayName + " - accepted";
  } else if (tentativeVolunteerDisplayName) {
    assigned = tentativeVolunteerDisplayName + " - tentative";
  } else {
    return null;
  }
  return (
    <>
      <b>Volunteer</b>
      <Row Icon={PanToolIcon}>{assigned}</Row>
    </>
  );
};

const StyledChip = styled(Chip)`
  border: 2px solid;
  bordercolor: inherit;
  fontsize: 14px;
  margin-right: 8px;
`;
const MissionListItem = ({
  groups,
  mission,
  missionsView,
  selectedMission,
  setSelectedMission,
  toDetailsView,
  volunteers,
}) => {
  const classes = useStyles();

  const boxRef = React.useRef(null);

  function onClick() {
    setSelectedMission(mission.uid);
  }

  const isSelected = selectedMission === mission.uid;
  useEffect(() => {
    if (isSelected && boxRef?.current) {
      if (_.isOutOfViewport(boxRef.current)) {
        boxRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [isSelected]);

  const itemClass = clsx(["inProposed", "inPlanning"].includes(missionsView) && classes.item);

  return (
    <Card
      onClick={onClick}
      className={classes.root}
      ref={boxRef}
      color="primary"
      elevation={isSelected ? 24 : 1}
    >
      <MissionItemMenu
        className={classes.MenuRightWrapper}
        boxRef={boxRef}
        groups={groups}
        mission={mission}
        volunteers={volunteers}
      />
      <Grid container>
        <Grid container className={classes.chipsContainer}>
          {mission.status === Mission.Status.tentative && (
            <StyledChip
              label="Needs Volunteer"
              variant="outlined"
              className={classes.chipNeedsVolunteer}
            />
          )}
          {mission.status === Mission.Status.started && (
            <StyledChip label="Started" variant="outlined" className={classes.chipNeedsVolunteer} />
          )}
          {mission.status === Mission.Status.delivered && (
            <StyledChip
              label="Delivered"
              variant="outlined"
              className={classes.chipNeedsVolunteer}
            />
          )}
          {mission.status === Mission.Status.succeded && (
            <StyledChip label="Succeded" variant="outlined" className={classes.chipReady} />
          )}
          {mission.status === Mission.Status.failed && (
            <StyledChip label="Failed" variant="outlined" className={classes.chipReady} />
          )}

          {mission.readyToStart ? (
            <StyledChip label="Ready" className={classes.chipReady} variant="outlined" />
          ) : (
            <StyledChip label="Not Ready" className={classes.chipNotReady} variant="outlined" />
          )}
        </Grid>

        <Grid item xs className={itemClass}>
          <DetailsText showType={true} mission={mission} />
        </Grid>
        <Grid item xs className={itemClass}>
          <LocationRow label="Pick Up" location={mission.pickUpLocation} />
        </Grid>
        <Grid item xs className={itemClass}>
          <LocationRow label="Drop Off" location={mission.deliveryLocation} />
        </Grid>
        <Grid item xs className={itemClass}>
          <VolunteerRow mission={mission} />
        </Grid>
        <Grid item xs direction="column" container justify="flex-end" className={itemClass}>
          <Action mission={mission} classes={classes} boxRef={boxRef} />
          <Box
            onClick={toDetailsView}
            role="button"
            aria-label="To Mission Details View"
            className={classes.link}
          >
            View Mission Details
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};
export default MissionListItem;
