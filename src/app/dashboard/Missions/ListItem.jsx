import { Box, Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PanToolIcon from "@material-ui/icons/PanTool";
import clsx from "clsx";
import React from "react";

import { Button } from "../../component";
import Mission from "../../model/Mission";
import _ from "../../utils/lodash";

const useStyles = makeStyles((theme) => ({
  row: {
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  formControl: {
    width: "100%",
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
const UnasignedStatus = ({ missionId }) => {
  const classes = useStyles();
  const handleChange = (event) => {
    event.preventDefault();
    Mission.update(missionId, {
      fundedStatus: event.target.value,
      status: Mission.Status.tentative,
    });
  };
  return (
    <div>
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
    </div>
  );
};
const TentativeStatus = () => {
  return <Button>Assign Mission</Button>;
};
const AssignedStatus = ({ mission }) => {
  const { volunteerName } = mission;
  return <RowBody Icon={PanToolIcon}>{volunteerName} - tentative</RowBody>;
};
const AcceptedStatus = ({ mission }) => {
  const { volunteerName } = mission;
  return <RowBody Icon={PanToolIcon}>{volunteerName} - accepted</RowBody>;
};
const Action = ({ mission }) => {
  let { id, status } = mission;
  let StatusAction = null;
  switch (status) {
    case Mission.Status.unassigned:
      StatusAction = <UnasignedStatus missionId={id} />;
      break;
    case Mission.Status.tentative:
      StatusAction = <TentativeStatus missionId={id} />;
      break;
    case Mission.Status.assigned:
      StatusAction = <AssignedStatus mission={mission} />;
      break;
    case Mission.Status.accepted:
    default:
      StatusAction = <AcceptedStatus mission={mission} />;
      break;
  }
  return StatusAction;
};
/** END ACTION*/

const RowBody = ({ children, Icon }) => {
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
      <RowBody Icon={LocationOnIcon}>{_.get(location, "address")}</RowBody>
    </>
  );
};

const FoodBoxDetails = ({ details, notes }) => {
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

const Details = ({ mission }) => {
  let { missionDetails, type } = mission;
  let SpecificDetails = null;
  if (type === "foodbox") {
    SpecificDetails = <FoodBoxDetails type={type} details={missionDetails} />;
  }

  return (
    <>
      {SpecificDetails}
      <Box>
        <LocationRow label="Pick Up" location={mission.pickUpLocation} />
        <LocationRow label="Drop Off" location={mission.deliveryLocation} />
      </Box>
    </>
  );
};
function MissionDetailsCol({ classes, mission, ...props }) {
  if (!mission) return null;

  const { selectedMission, setSelectedMission } = props;
  const { setDetailsMission } = props;

  function onClick() {
    setSelectedMission(mission.id);
  }
  function toDetails() {
    setDetailsMission(mission.id);
  }

  const isSelected = selectedMission === mission.id;

  return (
    <Box
      position="relative"
      onClick={onClick}
      className={clsx(classes.root, { [classes.isSelected]: isSelected })}
    >
      <Box
        onClick={toDetails}
        role="button"
        aria-label="To Mission Details View"
        className={classes.arrowRightWrapper}
      >
        <ArrowForwardIcon />
      </Box>
      <Details mission={mission} />
      <Action mission={mission} />
    </Box>
  );
}
export default MissionDetailsCol;
