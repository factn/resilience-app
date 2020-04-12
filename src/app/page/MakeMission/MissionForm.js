import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
//import { connect } from "react-redux";
import { AddressInput, Button } from "../../component";
import { Upload, useStyles } from "./Request.style";
import { Page } from "../../layout";
import { Checkbox, Typography, TextField, Container, FormControlLabel } from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/date-fns";

const StyledHeader = styled(Typography)`
  margin-top: 0.8vh;
  padding: 1.2vh 0;
  margin-left: 10%;
  ${({ main }) =>
    main &&
    `margin-left: 0px;
    margin-bottom: 1.3vh;
  text-transform: none;`}
`;

function MissionForm({
  handleChange,
  values,
  onSubmit,
  getFile,
  history /*, assignHelper, autoAssigned*/,
}) {
  const missionType = history.location.pathname.split("/")[3];

  const classes = useStyles();
  const [dropOff, setDropOff] = React.useState({
    time: new Date(),
    date: new Date(),
    location: null,
  });
  const [pickUp, setPickUp] = React.useState({
    time: new Date(),
    date: new Date(),
    location: null,
  });
  const [pickUpDateLabel, setPickUpDateLabel] = React.useState(null);
  const [dropOffDateLabel, setDropOffDateLabel] = React.useState(null);
  const [photo, setPhoto] = React.useState(false);

  const handleSubmit = () => {
    const valuesWithDates = {
      pickUp,
      dropOff,
      type: missionType,
    };
    onSubmit(valuesWithDates);
  };

  const handleDate = (date, stage) => {
    if (!date) {
      return;
    }
    if (stage === "pickUp") {
      setPickUpDateLabel(date);
      if (typeof date !== "string") {
        setPickUp({ ...pickUp, date: date.toString().substr(0, 15) });
      } else {
        setPickUp({ ...dropOff, date: date || null });
      }
    }
    if (stage === "dropOff") {
      setDropOffDateLabel(date);
      if (typeof date !== "string") {
        setDropOff({ ...dropOff, date: date.toString().substr(0, 15) });
      } else {
        setDropOff({ ...dropOff, date: date || null });
      }
    }
  };

  return (
    <Page template="pink">
      <Container classes={{ root: classes.root }}>
        <StyledHeader main align="center" variant="h1">
          Create a{missionType === "errand" && "n"} {missionType} mission.
        </StyledHeader>
        <StyledHeader align="left" variant="h2">
          Mission details
        </StyledHeader>
        <TextField
          m={2}
          fullWidth={true}
          variant="outlined"
          value={values.title || ""}
          name="title"
          onChange={handleChange}
          label="Mission title"
          required={true}
        />
        <TextField
          fullWidth={true}
          variant="outlined"
          value={values.description || ""}
          name="description"
          multiline={true}
          rows={4}
          onChange={handleChange}
          label="Mission notes"
          required={true}
        />
        <StyledHeader
          main
          align="left"
          variant="h2"
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            textAlign: "center",
            marginBottom: "0.5vh",
          }}
          onClick={() => setPhoto(!photo)}
        >
          Add a photo
        </StyledHeader>
        {photo && (
          <>
            {" "}
            <Typography>Insert an image</Typography>
            <Upload getFile={getFile} values={values} />
          </>
        )}
        <StyledHeader align="left" variant="h2">
          Recipient
        </StyledHeader>
        <TextField
          fullWidth={true}
          variant="outlined"
          value={values.recipient || ""}
          name="recipient"
          onChange={handleChange}
          label="Assign a recipient"
          helperText="Handle or phone number"
        />
        <StyledHeader align="left" variant="h2">
          Helper
        </StyledHeader>
        <TextField
          fullWidth={true}
          variant="outlined"
          value={values.helper || ""}
          name="helper"
          onChange={handleChange}
          label="Assign a helper"
          helperText="Handle or phone number"
          //disabled={autoAssigned}
        />
        {/*<FormControlLabel
          control={<Checkbox name="autoAssignHelper" onChange={assignHelper} />}
          label="Auto-assign a helper"
        />*/}
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <StyledHeader align="left" variant="h2">
            Pickup
          </StyledHeader>
          <AddressInput placeholder="Pickup location" stage={pickUp} setStage={setPickUp} />
          <KeyboardDatePicker
            margin="normal"
            id="date-pickUp"
            label="Select Date"
            format="MM/dd/yyyy"
            value={pickUpDateLabel}
            onChange={(date) => handleDate(date, "pickUp")}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-pickUp"
            label="Pickup time"
            value={pickUp.timeProtoType}
            onChange={(time) =>
              time && setPickUp({ ...pickUp, time: time.toTimeString(), timeProtoType: time })
            }
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
          <StyledHeader align="left" variant="h2">
            Drop-off
          </StyledHeader>
          <AddressInput
            placeholder="Drop-off location"
            stage={dropOff}
            setStage={setDropOff}
            onLimit={({ message }) =>
              console.log("Fired when you reached your current rate limit.")
            }
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-dropOff"
            label="Select Date"
            format="MM/dd/yyyy"
            value={dropOffDateLabel}
            onChange={(date) => handleDate(date, "dropOff")}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-dropOff"
            label="Drop-off time"
            value={dropOff.timeProtoType}
            onChange={(time) =>
              time && setDropOff({ ...dropOff, time: time.toTimeString(), timeProtoType: time })
            }
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </MuiPickersUtilsProvider>
        <Button
          onClick={handleSubmit}
          secondary
          text="Create mission"
          style={{ width: "90%", marginBottom: "2.3vh" }}
        />
      </Container>
    </Page>
  );
}

MissionForm.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.object,
  onSubmit: PropTypes.func,
  getFile: PropTypes.func,
};
export default MissionForm;
