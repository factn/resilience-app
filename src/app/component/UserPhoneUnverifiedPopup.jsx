import React from "react";
import PropTypes from "prop-types";

import Popup from "./Popup";

import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

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
        <Typography variant="h5">
          You need to add and verify your phone number to volunteer for a Mission.
        </Typography>
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
