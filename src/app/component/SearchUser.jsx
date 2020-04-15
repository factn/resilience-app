import React, { useState, Fragment } from "react";
import { Box, TextField, Avatar } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

import { Users } from "../model";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  textField: {
    paddingRight: "9px!important",
  },
}));

const SearchUser = ({ value, setValue }) => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleInputChange = async (event, value, reason) => {
    if (value.length > 1) {
      setLoading(true);

      const users = await Users.usersMatchingLabel(value, 10);
      setUsers(users);

      if (reason == "input") {
        setOpen(true);
      }

      setLoading(false);
    } else {
      setUsers([]);
    }
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <Autocomplete
      id="user-search"
      options={users}
      open={open}
      filterOptions={(options) => options}
      getOptionLabel={(option) => option.displayName}
      onClose={() => {
        setOpen(false);
      }}
      loading={loading}
      onChange={handleChange}
      onInputChange={_.debounce(
        (event, value, reason) => handleInputChange(event, value, reason),
        500
      )}
      getOptionSelected={(option, value) => option.displayName === value.displayName}
      noOptionsText="No users found"
      popupIcon={loading ? <CircularProgress color="inherit" size={20} /> : null}
      renderOption={(option) => (
        <Fragment>
          <Avatar className={classes.avatar} src={option.photoURL ? option.photoURL : null} />
          <Box display="flex" flexDirection="column">
            <span>{option.displayName}</span>
            <small>{option.phoneNumber}</small>
          </Box>
        </Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          className={classes.textField}
          label="Search User"
          placeholder="search user with either name or phone number"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default SearchUser;
