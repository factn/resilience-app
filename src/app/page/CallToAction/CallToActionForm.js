import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AlgoliaPlaces from "algolia-places-react";
import Button from "../../component/Button";
import { useStyles } from "./CallToAction.style";
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


function CallToActionForm({ handleChange, values, onSubmit }) {
  const classes = useStyles();
  // const [dropOff, setDropOff] = React.useState({
  //   time: new Date(),
  //   date: new Date(),
  //   location: "",
  // });
  // const [pickUp, setPickUp] = React.useState({
  //   time: new Date(),
  //   date: new Date(),
  //   location: "",
  // });
  const handleSubmit = (...args) => {
    console.log(args)
    // const valuesWithDates = {
    //   pickUp,
    //   dropOff,
    // };
    // console.log("new mission:");
    // console.dir(valuesWithDates);
    return onSubmit(args);
  };
  console.log(values)
  return (
    <Page>
      <Container classes={{ root: classes.root }}>
        <StyledHeader main align="center" variant="h1">
          Volunteer with us
        </StyledHeader>
          <Typography
            style={{
              marginLeft: '1.5rem',
              textAlign: 'left',
              marginTop: '1rem',
              marginBottom: '1rem',
              fontSize: 'medium',
            }}
            variant="body1">
            Make a difference in your neighbourhood and help out those in need. We need people like you! (placeholder copy
          </Typography>
        <TextField
          style={{
            marginLeft: '1.5rem',
            paddingRight: '2rem',
            marginBottom: '1rem'
          }}
          fullWidth
          m={2}
          variant="outlined"
          value={values?.zipcode}
          name="zipcode"
          onChange={handleChange}
          label="Your zipcode/postal code"
        />
        <Button
          // style={{
          //   marginLeft: '1.5rem',
          //   paddingRight: '2rem',
          //   textAlign: 'left',
          //   marginTop: '1rem',
          //   marginBottom: '1rem',
          //   width: '15.5rem'
          // }}
          onClick={handleSubmit}
          secondary
          text="Next"
          style={{ width: "90%", marginBottom: "2.3vh" }}
          />
        </Container>
    </Page>
  );
}

CallToActionForm.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.object,
  onSubmit: PropTypes.func,
  getFile: PropTypes.func,
};

export default CallToActionForm;
