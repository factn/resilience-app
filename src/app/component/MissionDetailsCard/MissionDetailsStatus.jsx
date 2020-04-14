import React from "react";
import PropTypes from "prop-types";

import { MissionStatus } from "../../model";

const titleCase = (str) => ("" + str).charAt(0).toUpperCase() + ("" + str).substr(1);

/**
 * Component for displaying the status of a mission
 *
 * @component
 */
const MissionDetailsStatus = ({ status, volunteerName }) => {
  return status === MissionStatus.unassigned ? (
    titleCase(status)
  ) : status === MissionStatus.tentative || status === MissionStatus.assigned ? (
    volunteerName
  ) : (
    <>
      {volunteerName} - <b>{titleCase(status)}</b>
    </>
  );
};

MissionDetailsStatus.propTypes = {
  /**
   * mission status
   */
  status: PropTypes.string,
  /**
   * volunteer profile name
   */
  volunteerName: PropTypes.string,
};

export default MissionDetailsStatus;
