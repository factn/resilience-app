import { CSVLink } from "react-csv";
import dot from "dot-object";
import PropTypes from "prop-types";
import React from "react";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";

const DownloadMissionsCsv = ({ data, filename, label }) => {
  const flattened = _.flatten(
    _.map(data, (mission) => {
      console.log(mission);
      return dot.dot(mission);
    })
  );

  //const headers = {};
  return (
    <Grid item>
      <CSVLink data={flattened} filename={filename} className="btn btn-primary" target="_blank">
        {label}
      </CSVLink>
    </Grid>
  );
};

DownloadMissionsCsv.propTypes = {
  data: PropTypes.any,
  label: PropTypes.string,
  filename: PropTypes.string,
};

export default DownloadMissionsCsv;
