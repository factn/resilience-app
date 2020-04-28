import { Box, Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PanToolIcon from "@material-ui/icons/PanTool";
import clsx from "clsx";
import React from "react";

import Mission from "../../model/Mission";
import _ from "../../utils/lodash";
import TentativeStatusAction from "./component/TentativeStatusAction";

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
const NotFundedStatus = ({ missionId, classes }) => {
  const handleChange = (event) => {
    event.preventDefault();
    Mission.update(missionId, {
      fundedStatus: event.target.value,
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

const Action = ({ mission, classes, boxRef }) => {
  let { status } = mission;

  if (status === Mission.Status.unassigned) {
    return <NotFundedStatus mission={mission} classes={classes} />;
  }

  if (status === Mission.Status.tentative) {
    return <TentativeStatusAction mission={mission} classes={classes} boxRef={boxRef} />;
  }

  if (status === Mission.Status.assigned) {
    return <RowBody Icon={PanToolIcon}>{mission.tentativeVolunteerName} - assigned</RowBody>;
  }

  if (status === Mission.Status.accepted) {
    return <RowBody Icon={PanToolIcon}>{mission.volunteerName} - accepted</RowBody>;
  }

  return status;
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

const MissionDetailsCol = ({ classes, mission, users, ...props }) => {
  const { selectedMission, setSelectedMission } = props;
  const { toDetailsView } = props;
  const boxRef = React.useRef(null);

  function onClick() {
    setSelectedMission(mission.id);
  }

  const isSelected = selectedMission === mission.id;

  return (
    <Box
      position="relative"
      onClick={onClick}
      className={clsx(classes.root, { [classes.isSelected]: isSelected })}
      ref={boxRef}
    >
      <Box
        onClick={toDetailsView}
        role="button"
        aria-label="To Mission Details View"
        className={classes.arrowRightWrapper}
      >
        <ArrowForwardIcon />
      </Box>
      <Details mission={mission} classes={classes} />
      <Action mission={mission} classes={classes} boxRef={boxRef} users={users} />
    </Box>
  );
};
// HACK because we cannot use hooks inside this function due
// to mui-datatables
const MissionDetailsColWrapper = ({ ...props }) => <MissionDetailsCol {...props} />;
export default MissionDetailsColWrapper;
