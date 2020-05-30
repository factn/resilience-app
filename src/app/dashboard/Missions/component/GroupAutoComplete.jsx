import GroupWorkIcon from "@material-ui/icons/GroupWork";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { Box, TextField } from "@material-ui/core";
import React from "react";
import _ from "../../../utils/lodash";

const GroupAutoComplete = ({ classes, groups, handleChange, selected }) => {
  const filter = createFilterOptions({
    stringify: (group) => group.groupDisplayName,
  });

  return (
    <Box className={classes.row}>
      <Autocomplete
        id="group-search"
        options={groups}
        onChange={(event, newValue) => handleChange(newValue)}
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
  );
};

export default GroupAutoComplete;
