import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import Popup from "./Popup";
import { H5 } from "./";

/**
 * Functional component used to encapsulate popup for when a user is unverified for their action
 * and requires a phone number
 *
 * Composition on top of the Popup component
 *
 * @see Popup
 */
const UserPhoneUnverifiedPopup = ({ handleClose, open }) => (
  <Popup title="Add a Phone Number" open={open} handleClose={handleClose} btnText="Close">
    <Grid container justify="center" spacing={1}>
      <Grid item>
        <H5>You need to add and verify your phone number to volunteer for a Mission.</H5>
      </Grid>
      <Grid item>
        <Link to="/user/profile">Go to Profile Page to add Phone number</Link>
      </Grid>
    </Grid>
  </Popup>
);

UserPhoneUnverifiedPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default UserPhoneUnverifiedPopup;
