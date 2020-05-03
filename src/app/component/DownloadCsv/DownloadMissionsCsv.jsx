import { CSVLink } from "react-csv";
import dot from "dot-object";
import PropTypes from "prop-types";
import React from "react";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";

const DownloadMissionsCsv = ({ data, filename, label }) => {
  const flattened = _.flatten(
    _.map(data, (mission) => {
      return dot.dot(mission);
    })
  );

  const padLeft = (nr, n, str) => {
    return Array(n - String(nr).length + 1).join(str || "0") + nr;
  };

  const now = new Date();
  const fileNameWithTimestamp =
    [
      filename,
      now.getFullYear(),
      padLeft(now.getMonth() + 1, 2, "0"),
      padLeft(now.getDate(), 2, "0"),
    ].join("-") + ".csv";

  //const headers = {};
  return (
    <Grid item>
      <CSVLink
        data={flattened}
        filename={fileNameWithTimestamp}
        className="btn btn-primary"
        target="_blank"
      >
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
