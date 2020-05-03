import PropTypes from "prop-types";
import React from "react";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import { MissionList } from "../../component";

/**
 * Component for listing volunteered missions
 *
 * @component
 */
const VolunteerHomeMissionList = ({ action, actionText, isEmptyText, missions }) => {
  const history = useHistory();

  return (
    <MissionList
      missions={missions}
      history={history}
      isEmpty={isEmpty(missions)}
      isLoaded={isLoaded(missions)}
      isEmptyText={isEmptyText}
      callToAction={{
        text: actionText,
        onClick: (missionUid) => action(missionUid),
      }}
    />
  );
};

VolunteerHomeMissionList.propTypes = {
  /**
   * currentUser token
   */
  missions: PropTypes.array,
  actionText: PropTypes.string,
  action: PropTypes.func,
};

export default VolunteerHomeMissionList;
