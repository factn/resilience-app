import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AlgoliaPlaces from "algolia-places-react";
import Button from "../../component/Button";
import { Upload, useStyles } from "./Request.style";
import { Page } from "../../layout";
import {
  Checkbox,
  Typography,
  TextField,
  Container,
  FormControlLabel,
  withStyles,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/date-fns";

const StyledHeader = withStyles({
  root: {
    marginTop: "0.8vh",
    padding: "1.2vh 0",
    marginLeft: (props) => (props.main ? 0 : "10%"),
    textTransform: (props) => props.main && "none",
  },
})(({ classes, children, ...rest }) => {
  const { main, ...allowedMuiProps } = rest; // filter `main` from other props. This prevents Typography to throw an error
  return (
    <Typography className={classes.root} {...allowedMuiProps}>
      {children}
    </Typography>
  );
});

function MissionForm({ handleChange, values, onSubmit, getFile /*, assignHelper, autoAssigned*/ }) {
  const classes = useStyles();
  const [dropOff, setDropOff] = React.useState({
    time: new Date(),
    date: new Date(),
    location: "",
  });
  const [pickUp, setPickUp] = React.useState({
    time: new Date(),
    date: new Date(),
    location: "",
  });
  const [pickUpDateLabel, setPickUpDateLabel] = React.useState(
    pickUp.date.toString().substr(0, 15)
  );
  const [dropOffDateLabel, setDropOffDateLabel] = React.useState(
    dropOff.date.toString().substr(0, 15)
  );

  const handleSubmit = () => {
    const valuesWithDates = {
      pickUp,
      dropOff,
    };
    onSubmit(valuesWithDates);
  };

  const handleLocation = (query, stage) => {
    let func, rest;
    if (stage === "dropOff") {
      func = setDropOff;
      rest = dropOff;
    }
    if (stage === "pickUp") {
      func = setPickUp;
      rest = pickUp;
    }
    if (query.suggestion) {
      const { value, latlng, county, countryCode } = query.suggestion;
      func({
        ...rest,
        location: {
          address: value,
          geoLocation: latlng,
          county,
          countryCode,
        },
      });
    }
  };

  const handleDate = (date, stage) => {
    if (!date) {
      return;
    }
    if (stage === "pickUp") {
      setPickUpDateLabel(date ? date.toString().substr(0, 15) : "Select a date");
      if (typeof date !== "string") {
        setPickUp({ ...pickUp, date: date.toString().substr(0, 15) });
      } else {
        setPickUp({ ...dropOff, date: date || null });
      }
    }
    if (stage === "dropOff") {
      setDropOffDateLabel(date ? date.toString().substr(0, 15) : "Select a date");
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
          <AlgoliaPlaces
            placeholder="Pickup location"
            name="pickUp"
            options={{
              appId: "plZ318O8ODTC",
              apiKey: "b5e0781d289a9aa8edb37bf24aef874e",
              language: "en",
              countries: ["us"],
              type: "city",
              // Other options from https://community.algolia.com/places/documentation.html#options
            }}
            onChange={(query) => handleLocation(query, "pickUp")}
            onLimit={({ message }) => message && console.log(message)}
          />
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
          <AlgoliaPlaces
            placeholder="Drop-off location"
            name="dropOff"
            options={{
              appId: "plZ318O8ODTC",
              apiKey: "b5e0781d289a9aa8edb37bf24aef874e",
              language: "en",
              countries: ["us"],
              type: "city",
              // Other options from https://community.algolia.com/places/documentation.html#options
            }}
            onChange={(query) => handleLocation(query, "dropOff")}
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
          color="secondary"
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
