import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
//import { connect } from "react-redux";
import { AddressInput, Button } from "../../component";
import { Upload, useStyles } from "./Request.style";
import { Page } from "../../layout";
import {
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  Container,
  FormControl,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
  DateTimePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/date-fns";
import timeWindows from "../../utils/timeWindows";
import fundedStatus from "../../utils/fundedStatus";

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
    timeWindowType: null,
  });
  const [pickUp, setPickUp] = React.useState({
    time: new Date(),
    date: new Date(),
    location: null,
    timeWindowType: null,
  });
  const [pickUpDateLabel, setPickUpDateLabel] = React.useState(null);
  const [dropOffDateLabel, setDropOffDateLabel] = React.useState(null);
  const [photo, setPhoto] = React.useState(false);
  const [pickUpDateTime, setPickUpDateTime] = React.useState(false);
  const [fundStatus, setFundStatus] = React.useState(null);
  const handleSubmit = () => {
    const payload = {
      pickUpWindow: {
        date: pickUp.date,
        timeWindowType: pickUp.timeWindowType,
      },
      pickUpLocation: pickUp.location,
      deliveryWindow: {
        date: dropOff.date,
        timeWindowType: dropOff.timeWindowType,
      },
      deliveryLocation: dropOff.location,
      type: missionType,
      fundStatus,
    };
    onSubmit(payload);
  };

  const handleDate = (date, stage) => {
    if (!date) {
      return;
    }
    if (stage === "pickUp") {
      setPickUpDateLabel(date);
      setPickUp({ ...pickUp, date });
    }
    if (stage === "dropOff") {
      setDropOffDateLabel(date);
      setDropOff({ ...dropOff, date });
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
          label="Mission description"
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
          <div style={{ margin: "1.5em 0" }}>
            <StyledHeader align="left" variant="h2">
              Pickup
            </StyledHeader>
            <AddressInput placeholder="Pickup location" stage={pickUp} setStage={setPickUp} />
            <StyledHeader
              align="left"
              variant="h5"
              style={{ cursor: "pointer", textDecoration: "underline", marginBottom: "1.6em" }}
              onClick={() => setPickUpDateTime(!pickUpDateTime)}
            >
              Add pickup date and time
            </StyledHeader>{" "}
            {pickUpDateTime && (
              <>
                <DateTimePicker
                  margin="normal"
                  id="date-dropPickup"
                  label="Select Date"
                  format="MM/dd/yyyy"
                  value={pickUpDateLabel}
                  onChange={(date) => handleDate(date, "pickUp")}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <FormControl className={classes.formControl}>
                  <Select
                    fullWidth={true}
                    native
                    labelId="pick-time-type-label"
                    value={dropOff.timeWindowType}
                    onChange={(e) => setPickUp({ ...pickUp, timeWindowType: e.target.value })}
                  >
                    <option value="none">Pickup is likely to happen at:</option>
                    {timeWindows.map((i) => (
                      <option value={i.value}>{i.label}</option>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </div>
          <div style={{ margin: "1.5em 0" }}>
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
            <DateTimePicker
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
            <FormControl>
              <Select
                fullWidth={true}
                native
                id="del-time-type"
                labelId="del-time-type-label"
                value={dropOff.timeWindowType}
                onChange={(e) => setDropOff({ ...dropOff, timeWindowType: e.target.value })}
              >
                <option value="none">Delivery is likely to happen at...</option>
                {timeWindows.map((item) => (
                  <option value={item.value}>{item.label}</option>
                ))}
              </Select>
            </FormControl>
          </div>
        </MuiPickersUtilsProvider>
        <TextField
          fullWidth={true}
          variant="outlined"
          value={values.cost || ""}
          name="cost"
          type="number"
          onChange={handleChange}
          label="Assign a cost"
          helperText="in USD"
        />
        <Container>
          <FormControl>
            <Select
              fullWidth={true}
              native
              id="funded-type"
              labelId="funded-label"
              value={fundStatus}
              onChange={(e) => setFundStatus(e.target.value)}
            >
              <option value="none">Set funded status...</option>
              {fundedStatus.map((item) => (
                <option value={item.value}>{item.label}</option>
              ))}
            </Select>
          </FormControl>
        </Container>
        <Button
          onClick={handleSubmit}
          secondary
          text="Create mission"
          style={{ width: "90%", margin: "2.3vh 0" }}
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
