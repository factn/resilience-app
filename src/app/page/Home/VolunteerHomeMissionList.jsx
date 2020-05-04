import PropTypes from "prop-types";
import React from "react";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { Mission } from "../../model";
import { MissionList, MissionGroup } from "../../component";

/**
 * Component for listing volunteered missions
 *
 * @component
 */
const VolunteerHomeMissionList = ({
  action,
  actionIcon,
  actionText,
  groupActionIcon,
  isEmptyText,
  missions,
}) => {
  const history = useHistory();

  const { groups, singleMissions } = Mission.getAllGroups(missions);
  const missionGroups = groups.map((group) => (
    <MissionGroup
      key={group.groupUid}
      group={group}
      callToAction={{
        groupActionIcon,
        actionText,
        actionIcon,
        action,
      }}
      history={history}
      isLoaded={isLoaded(group.missions)}
    />
  ));

  const singleMissionList = (
    <MissionList
      missions={singleMissions}
      history={history}
      isEmpty={isEmpty(missions)}
      isLoaded={isLoaded(missions)}
      isEmptyText={isEmptyText}
      callToAction={{
        text: actionText,
        onClick: action,
      }}
    />
  );

  return (
    <div className="volunteer-mission-list">
      {missionGroups}
      {singleMissionList}
    </div>
  );
};

VolunteerHomeMissionList.propTypes = {
  /**
   * currentUser token
   */
  missions: PropTypes.array,
  actionText: PropTypes.string,
  action: PropTypes.func,
  actionIcon: PropTypes.element,
  groupActionIcon: PropTypes.element,
  isEmptyText: PropTypes.string,
};

export default VolunteerHomeMissionList;
