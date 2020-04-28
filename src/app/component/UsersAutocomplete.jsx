import { Avatar, Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import _ from "lodash";
import React, { Fragment, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(1),
    width: "100%",
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  textField: {
    paddingRight: theme.spacing(1),
  },
}));
/**
 * This version get values from outside, this mean we already
 * load in all relevant users from somewhere else
 */
const SearchUsers = ({ handleChange, users }) => {
  const classes = useStyles();

  const reducer = (options, user) => {
    if (!user.displayName) return options;
    let searchString = user.displayName + user.phoneNumber;
    options.push({ ...user, searchString });
    return options;
  };
  const options = users?.reduce(reducer, []) || [];

  return (
    <Autocomplete
      id="user-search"
      noOptionsText="No users found"
      options={options}
      classes={{ root: classes.root }}
      getOptionLabel={(user) => user.searchString}
      onChange={(event, newValue) => handleChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          className={classes.textField}
          label="Search a user..."
          placeholder="search user with either name or phone number"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
      renderOption={(user) => (
        <Fragment>
          <Avatar className={classes.avatar} src={user.photoURL ? user.photoURL : null} />
          <Box display="flex" flexDirection="column">
            <span>{user.displayName}</span>
            <small>{user.phoneNumber}</small>
          </Box>
        </Fragment>
      )}
    />
  );
};

export default SearchUsers;
