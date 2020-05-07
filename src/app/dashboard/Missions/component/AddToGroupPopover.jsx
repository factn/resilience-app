import { Box, TextField } from "@material-ui/core";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import Popover from "@material-ui/core/Popover";
import React, { useState } from "react";
import GroupWorkIcon from "@material-ui/icons/GroupWork";

import { Button, Body1 } from "../../../component";
import { makeStyles } from "@material-ui/core/styles";
import _ from "../../../utils/lodash";

const useStyles = makeStyles((theme) => ({
  popRoot: {
    padding: theme.spacing(2),
    justifyContent: "center",
    color: theme.color.blue,
  },
  popover: {
    width: "400px",
  },
  row: {
    textAlign: "center",
    paddingBottom: theme.spacing(1),
  },
  inputLabel: {
    color: theme.palette.primary.main,
  },
}));

const AddToGroupPopover = ({ boxRef, groups, handleConfirmButton, mission, onClose, open }) => {
  const [selected, setSelected] = useState();
  const classes = useStyles();
  const filter = createFilterOptions({
    stringify: (group) => group.groupDisplayName,
  });

  return (
    <Popover
      id="add-group-popover"
      open={open}
      anchorEl={boxRef?.current}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      classes={{ paper: classes.popover }}
    >
      <Box className={classes.popRoot}>
        <Box className={classes.row}>
          <Body1>
            <b>Add Mission to Group</b>
          </Body1>
        </Box>

        <Box className={classes.row}>
          <Body1>Which group do you want to add this mission to?</Body1>
        </Box>
        <form>
          <Box className={classes.row}>
            <Autocomplete
              id="group-search"
              options={groups}
              onChange={(event, newValue) => setSelected(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  label="Search/Create a group"
                  placeholder="search group by name"
                  variant="outlined"
                />
              )}
              getOptionLabel={(group) =>
                group.tmpDisplayName ? group.tmpDisplayName : group.groupDisplayName
              }
              renderOption={(group) => (
                <>
                  <GroupWorkIcon style={{ color: _.randomColor(group.groupDisplayName) }} />{" "}
                  {group.tmpDisplayName ? group.tmpDisplayName : group.groupDisplayName}
                </>
              )}
              filterOptions={(groups, params) => {
                const filtered = filter(groups, params);

                // Suggest the creation of a new value
                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    groupDisplayName: params.inputValue,
                    tmpDisplayName: `Create and add to "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
            />
          </Box>

          <Box className={classes.row}>
            <Button fullWidth onClick={() => handleConfirmButton(selected)}>
              Confirm
            </Button>
          </Box>
        </form>
      </Box>
    </Popover>
  );
};

export default AddToGroupPopover;
