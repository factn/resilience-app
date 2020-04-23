import { Box, Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PanToolIcon from "@material-ui/icons/PanTool";
import React from "react";
import styled from "styled-components";

import { Button } from "../../component";
import Mission from "../../model/Mission";
import _ from "../../utils/lodash";

const useStyles = makeStyles((theme) => ({
  row: {
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  asap: {
    backgroundColor: theme.color.red,
    color: theme.color.white,
  },
  formControl: {
    width: "100%",
  },
  select: {
    width: "100px",
  },
}));

const ToMissionDetails = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
`;
const Root = styled(Box)`
  position: relative;
`;

/** BEGIN ACTION*/
const UnasignedStatus = ({ missionId }) => {
  const classes = useStyles();
  const handleChange = (event) => {
    event.preventDefault();
    Mission.update(missionId, {
      fundedStatus: event.target.value,
      status: Mission.Status.tentative,
    });
  };
  const options = [
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
          {options.map((option) => (
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
function MissionDetailsCol({ mission }) {
  function onClick() {
    mission.setSelectedMission(mission.id);
  }
  function toDetails() {
    mission.setDetailsMission(mission.id);
  }

  return (
    <Root onClick={onClick}>
      <ToMissionDetails onClick={toDetails}>
        <ArrowRightAltIcon />
      </ToMissionDetails>
      <Details mission={mission} />
      <Action mission={mission} />
    </Root>
  );
}
export default MissionDetailsCol;
