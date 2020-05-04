import { Box, Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PanToolIcon from "@material-ui/icons/PanTool";
import PersonIcon from "@material-ui/icons/Person";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { Action } from './ListItem' // TODO: MOVE TO HELPERS
import { Body2, H3 } from "../../component";
import { Mission } from "../../model";
import _ from "../../utils/lodash";
import AddressInput from "../../component/AddressInput";
import { useForm } from "../../hooks";
import { KeyboardTimePicker} from "@material-ui/pickers";
import KeyDatePickerContainer from "../../page/MissionCreate/KeyDatePickerContainer"


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
  rowBody: {
    flexWrap: "nowrap",
    alignItems: "center",
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

const Row = ({ children, classes, Icon }) => {
  if (!children) return null;
  return (
    <Grid container className={classes.rowBody}>
      <Box marginRight="20px" width="20px">
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
  let missionType;
  switch (mission?.type) {
    case "foodbox":
    default:
      missionType = "Food Box";
  }
  return (
    <Box marginTop="32px">
      <H3>{missionType}</H3>
    </Box>
  );
};
const MissionStatusRow = ({ classes, mission }) => {
  let status = mission?.status;
  let missionStatusText;
  switch (status) {
    case Mission.Status.unassigned:
      missionStatusText = "Looking for volunteer";
      break;
    default:
      missionStatusText = status;
      break;
  }
  return (
    <Row Icon={PanToolIcon} classes={classes}>
      {missionStatusText}
    </Row>
  );
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
    case Mission.FundedStatus.notfunded:
    default:
      missionFundedStatusText = "Not Yet Funded";
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
  let details = mission?.missionDetails;
  if (type === "foodbox") {
    return <FoodBoxDetailsRow details={details} classes={classes} />;
  }
  return null;
};


/**
 * Component for editing mission details
 * @component
 */
const MissionEditView = ({ mission, toListView }) => {
  const classes = useStyles();


  const { handleChange, values } = useForm(mission);
  const recipientPhoneNumber = _.get(mission, "recipientPhoneNumber");

  const props = { classes, mission };

  function changeFormValue(name, value) {
    handleChange({ target: { name, value } });
  }


  function handleChangeLocation(data) {
    const { location } = data;
    changeFormValue("location", location);
  }

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
            <Action {...props}/>
            <MissionDetailsRow {...props} />

            <Card label="Pick Up Details" classes={classes}>
              <AddressInput
                className={classes.textField}
                placeholder={values.pickUpLocation?.address}
                stage={values.pickUpLocation}
                setStage={handleChangeLocation.bind(null, 'pickUpLocation')}
              />
          {/* <KeyDatePickerContainer
            margin="normal"
            id="date-pickUp"
            label="Select Date"
            format="MM/dd/yyyy"
            value={'richie'}
            // value={pickUpDateLabel}
            required={true}
            // onChange={(date) => handleDate(date, "pickUp")}
            onChange={()=>null}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-pickUp"
            label="Pickup time"
            // value={pickUp.timeProtoType}
            required={true}
            // onChange={(time) =>
            //   time && setPickUp({ ...pickUp, time: time.toTimeString(), timeProtoType: time })
            // }
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          /> */}
              </Card>


            <Card label="Delivery Details" classes={classes}>
            <AddressInput
                className={classes.textField}
                placeholder={values.deliveryLocation?.address}
                stage={values.deliveryLocation}
                setStage={handleChangeLocation.bind(null, 'deliveryLocation')}
              />
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
            <Row classes={classes}>
              {mission?.notes ? mission.notes : "No additional informations"}
            </Row>
            <Box style={{ marginTop: "3rem", marginLeft: "1rem", display: 'flex', justifyContent: 'space-between'}}>
                  <button>Save</button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MissionEditView;
