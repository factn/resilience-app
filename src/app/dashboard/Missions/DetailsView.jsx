import { Box, Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PanToolIcon from "@material-ui/icons/PanTool";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { isEmpty, isLoaded } from "react-redux-firebase";

import { Body2, H3 } from "../../component";
import { Mission } from "../../model";
import _ from "../../utils/lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    height: "100%",
    overflow: "auto",
    padding: `0px ${theme.spacing(1)}px`,
  },
  image: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  missionTypeText: {
    paddingTop: theme.spacing(0.5),
  },
  rowLabel: {
    fontWeight: 600,
    marginTop: theme.spacing(2),
  },
  deliveryDetails: {
    marginTop: theme.spacing(0.5),
  },

  missionImage: {
    margin: theme.spacing(1),
    width: "100%",
    maxHeight: "200px",
  },
  foodBoxDetailContainer: {
    border: "1px solid lightgrey",
    borderRadius: "4px",
    fontSize: "18px",
    color: "black",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  foodBoxDetailQuantity: {
    padding: theme.spacing(1),
    borderRight: "1px solid lightgrey",
  },
  foodBoxDetailName: {
    padding: theme.spacing(1),
  },
}));

/**=====BASE COMPONENTs======**/

const Label = ({ children, classes }) => {
  if (!children) return null;
  return (
    <Body2 align="left" className={classes.rowLabel} color="textPrimary">
      <b>{children}</b>
    </Body2>
  );
};

const Row = ({ children, Icon }) => {
  if (!children) return null;
  return (
    <Grid container wrap="nowrap" alignItems="center">
      <Box marginRight="5px" width="20px">
        {Icon && <Icon color="primary" />}
      </Box>
      {children}
    </Grid>
  );
};

const Card = ({ children, classes, label }) => {
  if (!children) return null;
  return (
    <>
      <Label classes={classes}>{label}</Label>
      {children}
    </>
  );
};

/**=====ROW COMPONENTS=======*/

const MissionImage = ({ classes, mission }) => {
  const imageUrl = mission?.image;
  if (!imageUrl) return null;

  return (
    <Container>
      <img src={imageUrl} className={classes.missionImage} alt="details" />
    </Container>
  );
};

const MissionTypeRow = ({ classes, mission }) => {
  let missionTypeText;
  switch (mission?.type) {
    case Mission.Type.resource:
      missionTypeText = "Foodbox";
      break;
    case Mission.Type.errand:
      missionTypeText = "General Errand";
      break;
    default:
      missionTypeText = "Mission Name";
  }
  return (
    <Box marginTop="32px">
      <H3>{missionTypeText}</H3>
    </Box>
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
    assigned = "Looking for volunteer";
  }
  return <Row Icon={PanToolIcon}>{assigned}</Row>;
};

const MissionFundedStatusRow = ({ classes, mission }) => {
  let missionFundedStatusText;
  switch (mission?.fundedStatus) {
    case Mission.FundedStatus.fundedbydonation:
      missionFundedStatusText = "Funded By Donation";
      break;
    case Mission.FundedStatus.fundedbyrecipient:
      missionFundedStatusText = "Funded By Recipient";
      break;
    case Mission.FundedStatus.fundingnotneeded:
      missionFundedStatusText = "Funding Not Needed";
      break;
    case Mission.FundedStatus.notfunded:
      missionFundedStatusText = "Not Yet Funded";
      break;
    default:
      throw Error("mission funded status not exist", mission.fundedStatus);
  }
  return (
    <Row Icon={AttachMoneyIcon} classes={classes}>
      {missionFundedStatusText}
    </Row>
  );
};

const FoodBoxDetailsRow = ({ classes, details }) => {
  return (
    <Box>
      {details?.needs?.map((box, index) => (
        <Grid key={index} container className={classes.foodBoxDetailContainer}>
          <Grid className={classes.foodBoxDetailQuantity}>
            <b>{box?.quantity}</b>
          </Grid>
          <Grid className={classes.foodBoxDetailName}>
            <b>{box?.name}</b>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

const MissionDetailsRow = ({ classes, mission }) => {
  let type = mission?.type;
  let details = mission?.details;
  if (type === "resource") {
    return <FoodBoxDetailsRow details={details} classes={classes} />;
  }
  return null;
};

/**
 * Component for displaying mission details as a card
 * @component
 */
const MissionDetailsCard = ({ mission, toListView }) => {
  const classes = useStyles();
  const recipientPhoneNumber = _.get(mission, "recipientPhoneNumber");

  const props = { classes: classes, mission: mission };
  return (
    <Box height="100%" width="100%">
      <Paper className={classes.root} elevation={0}>
        <Box position="absolute" onClick={toListView}>
          <ArrowBackIcon />
        </Box>
        {isLoaded(mission) && !isEmpty(mission) && (
          <Box>
            <MissionImage {...props} />

            <MissionTypeRow {...props} />
            <VolunteerRow {...props} />
            <MissionFundedStatusRow {...props} />
            <MissionDetailsRow {...props} />

            <Card label="Pick Up Details" classes={classes}>
              <Row Icon={LocationOnIcon} classes={classes}>
                {mission?.pickUpLocation?.address}
              </Row>
              <Row Icon={AccessTimeIcon} classes={classes}>
                {mission?.pickUpWindow?.startTime}
              </Row>
            </Card>

            <Card label="Delivery Details" classes={classes}>
              <Row Icon={LocationOnIcon} classes={classes}>
                {mission?.deliveryLocation?.address}
              </Row>
              <Row Icon={AccessTimeIcon} classes={classes}>
                {mission?.deliveryWindow?.startTime}
              </Row>
              <Row Icon={PersonIcon} classes={classes}>
                {mission?.recipientName}
              </Row>
              <Row classes={classes}>
                {recipientPhoneNumber && (
                  <a href={`tel:"${recipientPhoneNumber}"`}>{recipientPhoneNumber}</a>
                )}
              </Row>
            </Card>

            <Label classes={classes}>Notes</Label>
            <Row classes={classes}>{mission?.deliveryNotes || "No additional informations"}</Row>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MissionDetailsCard;
