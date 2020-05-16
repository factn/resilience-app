import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import Snackbar from "../../Snackbars";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ClearIcon from "@material-ui/icons/Clear";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ImageUpload from "../../ImageUpload";
import FoodBoxIcon from "../../icons/FoodBoxIcon";
import { H2 } from "../../Typography";
import styled from "styled-components";
import { getFirebase } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "0px !important",
    ...theme.typography.body1,
    width: "100%",
  },
  cardHeader: {
    fontWeight: "bold",
    letterSpacing: "0.5px",
    minHeight: "0px !important",
    "& :first-child": {
      margin: `${theme.spacing(1)} !important`,
    },
  },
  interaction: {
    margin: `${theme.spacing(2)}px 0px`,
    padding: theme.spacing(1),
    backgroundColor: "#e1e2f9",
    color: theme.palette.primary.main,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
    fontWeight: 600,
  },
  warningIcon: {
    color: theme.color.red,
    marginLeft: theme.spacing(3),
  },
}));

const RowIcon = styled(Grid)`
  padding: 2px 4px 0px 0px;
`;
const Row = ({ children, Icon, label }) => {
  return (
    <>
      <Grid container alignItems="center" className="body-small-bold">
        {label}
      </Grid>
      <Grid container>
        <RowIcon item>{Icon && <Icon color="primary" />}</RowIcon>
        <Grid item xs container alignItems="center">
          {children}
        </Grid>
      </Grid>
    </>
  );
};
/**
 * Component for displaying mission details as a card
 *
 * @component
 */
const MissionDetailsCard = ({ mission, photoDisabled }) => {
  const snackbarContext = useContext(Snackbar.Context.SnackbarContext);
  const firebase = getFirebase();
  const storage = firebase.storage();
  const classes = useStyles();
  const [file, setFile] = useState(null);

  if (mission.status === "started") {
    photoDisabled = false;
  } else {
    photoDisabled = true;
  }

  async function handleImageChosen(file) {
    setFile(file);
    if (file) {
      const uploadTask = storage
        .ref(`confirmed_delivery/${file.name}`)
        .put(file)
        .then((data) => {
          console.log(data.ref.getDownloadURL());
          return data.ref.getDownloadURL();
        })
        .catch((error) => {
          snackbarContext.show({
            message: `Unable to upload image: ${error.message}`,
            type: "error",
          });
        });
      return await uploadTask;
    } else {
      return "";
    }
  }

  return (
    <>
      <Grid item>
        <H2>Food Box Delivery</H2>
        {mission.missionDetails.needs.map((need) => {
          return (
            <Row key={need.name} Icon={FoodBoxIcon}>
              {need.quantity} X {need.name}
            </Row>
          );
        })}
      </Grid>

      <Grid container item className={classes.interaction}>
        <Grid container item alignItems="center">
          <ErrorOutlineIcon />
          Interaction Guidelines
        </Grid>
        <Grid container item alignItems="center">
          <ClearIcon className={classes.warningIcon} /> Do not exchange cash.
        </Grid>
        <Grid container item alignItems="center">
          <ClearIcon className={classes.warningIcon} /> No physical contact.
        </Grid>
      </Grid>
      <ExpansionPanel defaultExpanded={true} className={classes.card} variant="outlined">
        <ExpansionPanelSummary className={classes.cardHeader} expandIcon={<ExpandMoreIcon />}>
          1. Pick Up Details
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={1}>
            <Row Icon={ScheduleIcon}>{mission.pickUpWindow.timeWindowType}</Row>
            <Row Icon={LocationOnIcon}>{mission.pickUpLocation.address}</Row>
            <Row label="Pick Up Instructions">{mission.pickUpNotes}</Row>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel defaultExpanded={true} className={classes.card} variant="outlined">
        <ExpansionPanelSummary className={classes.cardHeader} expandIcon={<ExpandMoreIcon />}>
          2. Delivery Details
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.card} variant="outlined">
          <Grid container spacing={1}>
            <Row Icon={ScheduleIcon}>{mission.deliveryWindow.timeWindowType}</Row>
            <Row Icon={LocationOnIcon}>{mission.deliveryLocation.address}</Row>
            <Row label="Delivery Instructions">{mission.deliveryNotes}</Row>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        disabled={photoDisabled}
        defaultExpanded={photoDisabled ? false : true}
        className={classes.card}
        variant="outlined"
      >
        <ExpansionPanelSummary className={classes.cardHeader} expandIcon={<ExpandMoreIcon />}>
          3. Add Photo of Delivery
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container spacing={1}>
            <Row>
              Help {mission.recipientDisplayName} find the box by taking a photo of where you left
              it.
            </Row>
            <Grid item container justify="center">
              <ImageUpload withoutTwoBtns getFile={handleImageChosen} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

MissionDetailsCard.propTypes = {
  mission: PropTypes.object.isRequired,
};

export default MissionDetailsCard;
