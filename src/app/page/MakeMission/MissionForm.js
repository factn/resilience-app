import React from "react";
import PropTypes from "prop-types";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { Header, Container, SubText, Upload } from "./Request.style";
import { Page } from "../../layout";
import { Checkbox } from "@material-ui/core";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
function MissionForm({ handleChange, values, onSubmit, getFile, assignHelper, autoAssigned }) {
  return (
    <Page>
      <Container>
        <Header className="bold">Create a Mission</Header>
        <Upload getFile={getFile} values={values} />
        <SubText>Mission details</SubText>
        <Input
          value={values.title || ""}
          inputName="title"
          onChange={handleChange}
          label="Mission title"
          required={true}
        />
        <Input
          value={values.description || ""}
          inputName="description"
          onChange={handleChange}
          inputType="textarea"
          label="Mission notes"
          required={true}
        />
        <SubText>Recipient</SubText>
        <Input
          value={values.recipient || ""}
          inputName="recipient"
          onChange={handleChange}
          label="Assign a recipient"
        />
        <SubText>Helper</SubText>
        <Input
          value={values.helper || ""}
          inputName="helper"
          onChange={handleChange}
          label="Assign a helper"
          disabled={autoAssigned}
        />
        <Checkbox
          checked={autoAssigned}
          name="autoAssignHelper"
          value="Auto-assign a helper"
          onChange={assignHelper}
        />
        <SubText>Pickup</SubText>
        <Input
          value={values.pickUp || ""}
          inputName="pickUp"
          onChange={handleChange}
          label="Pickup location"
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Select Date"
          format="MM/dd/yyyy"
          value={values.pickUpDate}
          onChange={handleChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Pickup time"
          value={values.pickUpTime}
          onChange={handleChange}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
        <SubText>Drop-off</SubText>
        <Input
          value={values.dropOff || ""}
          inputName="dropOff"
          onChange={handleChange}
          label="Drop-off location"
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Select Date"
          format="MM/dd/yyyy"
          value={values.dropOffDate}
          onChange={handleChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Drop-off time"
          value={values.dropOffTime}
          onChange={handleChange}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
        <Button
          onClick={onSubmit}
          secondary
          text="Create mission"
          style={{ float: "right", marginRight: "10%" }}
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
