import { Box, Container, Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PanToolIcon from "@material-ui/icons/PanTool";
import CancelIcon from "@material-ui/icons/Cancel";
import PersonIcon from "@material-ui/icons/Person";
import React, { useState } from "react";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { Button, Body2, H3 } from "../../component";
import DateTimeInput from "../../component/DateTimeInput";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { Mission } from "../../model";
import _ from "../../utils/lodash";
import AddressInput from "../../component/AddressInput";
import { useForm } from "../../hooks";

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
    width: "100%",
  },
  textField: {
    width: "100%",
    backgroundColor: "black",
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
  missionInput: {
    width: "100%",
  },
  fullWidth: {
    width: "100%",
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
      {Icon && (
        <Box marginRight="20px" width="20px">
          <Icon color="primary" />
        </Box>
      )}
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
  let details = mission?.details;
  if (type === "foodbox") {
    return <FoodBoxDetailsRow details={details} classes={classes} />;
  }
  return null;
};

/**
 * Component for editing mission details
 * @component
 */
const MissionEditView = ({ mission, toDetailsView, toListView }) => {
  const classes = useStyles();

  const { handleChange, values } = useForm(mission);
  const [pickUp, setPickUp] = React.useState({
    time: new Date(),
    date: values.pickUpWindow.startTime,
    location: "",
  });
  const [deliveryTime, setDeliveryTime] = React.useState({
    time: new Date(),
    date: values.deliveryWindow.startTime,
    location: "",
  });

  const props = { classes, mission };

  function changeFormValue(name, value) {
    handleChange({ target: { name, value } });
  }

  function handleChangeLocation(data) {
    const { location } = data;
    changeFormValue("location", location);
  }

  function handleSave(e) {
    e.preventDefault();
    const pickUpTime = new Date(pickUp.date);
    pickUpTime.setHours(pickUp.time.getHours());
    pickUpTime.setMinutes(pickUp.time.getMinutes());
    pickUpTime.setSeconds(pickUp.time.getSeconds());

    const delivery = new Date(deliveryTime.date);
    delivery.setHours(deliveryTime.time.getHours());
    delivery.setMinutes(deliveryTime.time.getMinutes());
    delivery.setSeconds(deliveryTime.time.getSeconds());
    Mission.update(mission.id, {
      pickUpLocation: values.pickUpLocation,
      deliveryLocation: values.deliveryLocation,
      recipientDisplayName: values.recipientDisplayName,
      recipientPhoneNumber: values.recipientPhoneNumber,
      deliveryNotes: values.deliveryNotes,
      pickUpWindow: {
        startTime: pickUpTime.toString(),
      },
      deliveryWindow: {
        startTime: delivery.toString(),
      },
    }).then((result) => {
      toDetailsView();
    });
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
            <MissionDetailsRow {...props} />

            <Card label="Pick Up Details" classes={classes}>
              <Row Icon={ScheduleIcon} classes={classes}>
                <DateTimeInput
                  dateInputProps={{
                    id: "date-pickup",
                    label: "Pickup Date",
                  }}
                  onChange={setPickUp}
                  required
                  timeInputProps={{
                    id: "time-pickup",
                    label: "Pickup Time",
                  }}
                  value={pickUp}
                />
              </Row>
              <Grid
                container
                direction="row"
                alignItems="top"
                spacing={1}
                className={classes.fullWidth}
              >
                <Grid item>
                  <LocationOnIcon />
                </Grid>
                <Grid item style={{ width: "90%" }}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item className={classes.fullWidth}>
                      <TextField
                        className={`${classes.rootInput} ${classes.input}`}
                        id="pickupLocation.label"
                        name="pickupLocation.label"
                        value={values.pickUpLocationLabel}
                        placeholder="Location Name"
                        variant="outlined"
                        disabled={false}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item className={classes.fullWidth}>
                      <AddressInput
                        className={classes.textField}
                        placeholder={values.pickUpLocation?.address}
                        stage={values.pickUpLocation}
                        setStage={handleChangeLocation.bind(null, "pickUpLocation")}
                        setLocation={handleChangeLocation}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>

            <Card label="Delivery Details" classes={classes}>
              <Row Icon={ScheduleIcon} classes={classes}>
                                   
                <DateTimeInput
                  dateInputProps={{
                    id: "date-delivery",
                    label: "Delivery Date",
                  }}
                  onChange={setDeliveryTime}
                  required
                  timeInputProps={{
                    id: "time-delivery",
                    label: "Delivery Time",
                  }}
                  value={deliveryTime}
                />
                              
              </Row>
              <Row Icon={LocationOnIcon} classes={classes}>
                <Grid container direction="row">
                  <Grid item className={classes.fullWidth}>
                    <AddressInput
                      className={classes.textField}
                      placeholder={values.deliveryLocation?.address}
                      stage={values.deliveryLocation}
                      setStage={handleChangeLocation.bind(null, "deliveryLocation")}
                      setLocation={handleChangeLocation}
                    />
                  </Grid>
                </Grid>
              </Row>
              <Grid container direction="row" alignItems="top" spacing={1}>
                <Grid item>
                  <PersonIcon />
                </Grid>
                <Grid item style={{ width: "90%" }}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item className={classes.fullWidth}>
                      <TextField
                        className={`${classes.rootInput} ${classes.input}`}
                        id="recipientDisplayName"
                        name="recipientDisplayName"
                        value={values.recipientDisplayName}
                        placeholder="Recipient"
                        variant="outlined"
                        disabled={false}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item className={classes.fullWidth}>
                      <TextField
                        className={`${classes.rootInput} ${classes.input}`}
                        id="recipientPhoneNumber"
                        name="recipientPhoneNumber"
                        value={values.recipientPhoneNumber}
                        placeholder="Phone Number"
                        variant="outlined"
                        disabled={false}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>

            <Label classes={classes}>Delivery Notes</Label>
            <Row classes={classes}>
              <TextField
                variant="outlined"
                value={values.deliveryNotes}
                name="deliveryNotes"
                onChange={handleChange}
                placeholder="Notes"
                multiline
                className={classes.fullWidth}
                rows={4}
              />
            </Row>
            <Box
              style={{
                marginTop: "3rem",
                marginLeft: "1rem",
                display: "flex",
                justifyContent: "center",
                spacing: 1,
              }}
            >
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                style={{ margin: ".5em" }}
              >
                SAVE
              </Button>

              <Button
                onClick={toDetailsView}
                startIcon={<CancelIcon />}
                variant="contained"
                color="primary"
                style={{ margin: ".5em" }}
              >
                CANCEL
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MissionEditView;
