import PropTypes from "prop-types";
import React from "react";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { Mission } from "../../model";
import { MissionStatus } from "../../model/schema";
import { MissionList, MissionGroup, ShowDeliveryRoute } from "../../component";
import { Map, Marker, TileLayer } from "react-leaflet";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";

const VolunteerHomeMissionList = ({
  action,
  actionIcon,
  actionText,
  checkGroupActionDisabled,
  groupActionIcon,
  isEmptyText,
  missions,
  newActionStatus,
  showGroupAction,
  showViewRoute,
}) => {
  const history = useHistory();

  const user = useSelector((state) => state.firebase.profile);
  const { groups, singleMissions } = Mission.getAllGroups(missions);

  const updateGroup = (group, status) => {
    // newActionStatus
    action();
  };

  const updateSingleMissions = () => {
    singleMissions.map((mission) => {
      const missionId = mission.uid;
      updateSingleMission(missionId);
    });
  };

  const updateSingleMission = (missionId) => {
    switch (newActionStatus) {
      case MissionStatus.accepted:
        Mission.accept(user.uid, user, missionId).then((result) => {
          action();
        });
        break;
      case MissionStatus.started:
        Mission.start(user.uid, user, missionId).then((result) => {
          action();
        });
        break;
      case MissionStatus.delivered:
        Mission.deliver(user.uid, user, missionId).then((result) => {
          action();
        });
        break;
    }
  };

  const missionGroups = groups.map((group) => (
    <MissionGroup
      key={group.groupUid}
      group={group}
      groupCallToAction={{
        showGroupAction,
        groupActionIcon,
        checkGroupActionDisabled,
      }}
      callToAction={{
        text: actionText,
        icon: actionIcon,
        onClick: updateSingleMission,
      }}
      history={history}
      isLoaded={isLoaded(group.missions)}
      showViewRoute={showViewRoute}
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
        onClick: updateSingleMissions,
      }}
    />
  );

  const viewRouteAllMissions = <ShowDeliveryRoute missions={missions} />;

  const positions = missions?.reduce((acc, mission) => {
    const { lat, lng } = mission?.deliveryLocation;
    if (lat && lng) {
      acc.push([lat, lng]);
    }
    return acc;
  }, []);

  return (
    <div className="volunteer-mission-list">
      {positions.length !== 0 && (
        <Box width="100%" height="200px">
          <Map bounds={positions} style={{ width: "100%", height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {positions?.map((position) => {
              return <Marker key={position} position={position} />;
            })}
          </Map>
        </Box>
      )}
      {missionGroups}
      {singleMissionList}
      {showViewRoute && viewRouteAllMissions}
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
  showGroupAction: PropTypes.bool,
  groupActionIcon: PropTypes.element,
  showViewRoute: PropTypes.bool,
  isEmptyText: PropTypes.string,
};

export default VolunteerHomeMissionList;
