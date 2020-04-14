import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AlgoliaPlaces from "algolia-places-react";
import Button from "../../component/Button";
import { Upload, useStyles } from "./Request.style";
import { Page } from "../../layout";
import { Typography, TextField, Container } from "@material-ui/core";
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
  const handleSubmit = () => {
    const valuesWithDates = {
      pickUp,
      dropOff,
    };
    console.log("new mission:");
    console.dir(valuesWithDates);
    onSubmit(valuesWithDates);
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
            onChange={(query) => setPickUp({ ...pickUp, location: query })}
            onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) =>
              console.log("Fired when arrows keys are used to navigate suggestions.")
            }
            onClear={() => console.log("Fired when the input is cleared.")}
            onLimit={({ message }) =>
              console.log("!!Algolia Places reached current rate limit.".toUpperCase())
            }
            onError={({ message }) =>
              console.log(
                "Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit."
              )
            }
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
            onChange={(query) => setDropOff({ ...dropOff, location: query })}
            onSuggestions={({ rawAnswer, query, suggestions }) =>
              console.log(
                "Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed."
              )
            }
            onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) =>
              console.log("Fired when arrows keys are used to navigate suggestions.")
            }
            onClear={() => console.log("Fired when the input is cleared.")}
            onLimit={({ message }) =>
              console.log("Fired when you reached your current rate limit.")
            }
            onError={({ message }) =>
              console.log(
                "Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit."
              )
            }
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
