import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
//import Input from "../../component/Input";
import Button from "../../component/Button";
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
  text-transform: none;`}
`;

function MissionForm({ handleChange, values, onSubmit, getFile, assignHelper, autoAssigned }) {
  const classes = useStyles();
  const [dropOff, setDropOff] = React.useState({ time: new Date(), date: new Date() });
  const [pickUp, setPickUp] = React.useState({
    time: new Date(),
    date: new Date(),
  });
  const handleSubmit = () => {
    const valuesWithDates = {
      ...values,
      pickUp,
      dropOff,
    };
    console.dir(values);
    onSubmit();
  };
  return (
    <Page template="pink">
      <Container classes={{ root: classes.root }}>
        <StyledHeader main align="center" variant="h1">
          Create a mission.
        </StyledHeader>
        <Container disableGutters fixed>
          <Upload withoutTwoBtns getFile={getFile} values={values} />
        </Container>
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
          disabled={autoAssigned}
        />
        <FormControlLabel
          control={<Checkbox name="autoAssignHelper" onChange={assignHelper} />}
          label="Auto-assign a helper"
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <StyledHeader align="left" variant="h2">
            Pickup
          </StyledHeader>
          <TextField
            fullWidth={true}
            variant="outlined"
            value={values.pickUp || ""}
            name="pickUp"
            onChange={handleChange}
            label="Pickup location"
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Select Date"
            format="MM/dd/yyyy"
            value={pickUp.date}
            onChange={(date) => setPickUp({ ...pickUp, date })}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Pickup time"
            value={pickUp.time}
            onChange={(time) => setPickUp({ ...pickUp, time })}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
          <StyledHeader align="left" variant="h2">
            Drop-off
          </StyledHeader>
          <TextField
            fullWidth={true}
            variant="outlined"
            value={values.dropOff || ""}
            name="dropOff"
            onChange={handleChange}
            label="Drop-off location"
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Select Date"
            format="MM/dd/yyyy"
            value={dropOff.date}
            onChange={(date) => setDropOff({ ...dropOff, date })}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Drop-off time"
            value={dropOff.time}
            onChange={(time) => setDropOff({ ...dropOff, time })}
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
