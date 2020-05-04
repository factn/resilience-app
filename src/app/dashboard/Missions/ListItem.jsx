import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";

import Select from "@material-ui/core/Select";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PanToolIcon from "@material-ui/icons/PanTool";
import clsx from "clsx";
import React, { useEffect } from "react";

import Mission from "../../model/Mission";
import _ from "../../utils/lodash";
import MissionItemMenu from "./component/MissionItemMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    backgroundColor: "white",
    padding: theme.spacing(1),
    border: "2px solid transparent",
  },
  isSelected: {
    borderColor: theme.palette.primary.main,
  },
  MenuRightWrapper: {
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: "pointer",
    position: "absolute",
  },
  link: {
    textDecoration: "underline",
    color: theme.color.black,
  },
}));

/** BEGIN ACTION*/
const unassignedOptions = [
  {
    value: Mission.FundedStatus.fundedbyrecipient,
    text: "Funded By Recipient",
  },
  {
    value: Mission.FundedStatus.fundedbydonation,
    text: "Funded By Donation",
  },
  {
    value: Mission.FundedStatus.fundingnotneeded,
    text: "Funding Not Needed",
  },
];
const NotFundedStatus = ({ classes, missionId }) => {
  const handleChange = (event) => {
    event.preventDefault();
    //TODO move this to mission model as
    // Mission.setFunded()
    Mission.update(missionId, {
      fundedStatus: event.target.value,
      fundedDate: Date.now().toString(),
      status: Mission.Status.tentative,
    });
  };
  return (
    <FormControl className={classes.formControl}>
      <Select
        native
        onChange={handleChange}
        variant="outlined"
        value="Not Yet Funded"
        inputProps={{
          name: "funded",
          id: "select-funded",
        }}
      >
        <option value="none" hidden aria-label="None">
          Not Yet Funded
        </option>
        {unassignedOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

const Action = ({ boxRef, classes, mission }) => {
  let { status } = mission;

  if (status === Mission.Status.unassigned) {
    return <NotFundedStatus mission={mission} classes={classes} />;
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

const FoodBoxDetails = ({ details }) => {
  return (
    <>
      <b>Food Box</b>
      {_.get(details, "needs")?.map((box, index) => {
        return (
          <div key={index}>
            {_.get(box, "quantity")} x {_.get(box, "name")}
          </div>
        );
      })}
    </>
  );
};

const MissionListItem = ({
  groups,
  mission,
  selectedMission,
  setSelectedMission,
  toDetailsView,
  volunteers,
}) => {
  const classes = useStyles();
  const { missionDetails, type } = mission;

  const boxRef = React.useRef(null);

  function onClick() {
    setSelectedMission(mission.id);
  }
  let SpecificDetails = null;
  if (type === "foodbox") {
    SpecificDetails = <FoodBoxDetails type={type} details={missionDetails} />;
  }

  const isSelected = selectedMission === mission.id;
  useEffect(() => {
    if (isSelected && boxRef?.current) {
      boxRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [isSelected]);

  return (
    <Box
      position="relative"
      onClick={onClick}
      className={clsx(classes.root, { [classes.isSelected]: isSelected })}
      ref={boxRef}
      color="primary"
    >
      <MissionItemMenu
        className={classes.MenuRightWrapper}
        boxRef={boxRef}
        groups={groups}
        mission={mission}
        volunteers={volunteers}
      />
      {SpecificDetails}
      <LocationRow label="Pick Up" location={mission.pickUpLocation} />
      <LocationRow label="Drop Off" location={mission.deliveryLocation} />
      <VolunteerRow mission={mission} />
      <Action mission={mission} classes={classes} boxRef={boxRef} />
      <Box
        onClick={toDetailsView}
        role="button"
        aria-label="To Mission Details View"
        className={classes.link}
      >
        View Mission Details
      </Box>
    </Box>
  );
};
export default MissionListItem;
