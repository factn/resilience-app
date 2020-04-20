import React from "react";
import PropTypes from "prop-types";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { MissionList } from "../../component";
import { User } from "../../model";
import { Actions } from "../../component/ImageUpload/ImageUpload.style";

/**
 * Component for listing volunteered missions
 *
 * @component
 */
const VolunteerHomeMissionList = ({ missions, actionText, action }) => {
  const history = useHistory();

  return (
    <MissionList
      missions={missions}
      history={history}
      isEmpty={isEmpty(missions)}
      isLoaded={isLoaded(missions)}
      isEmptyText="No items to display"
      callToAction={{
        text: actionText,
        onClick: (missionId) => action(missionId),
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
