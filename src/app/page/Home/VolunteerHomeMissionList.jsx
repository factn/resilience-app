import PropTypes from "prop-types";
import React from "react";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { Mission } from "../../model";
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
  showGroupAction,
  showViewRoute,
}) => {
  const history = useHistory();

  const { groups, singleMissions } = Mission.getAllGroups(missions);
  const user = useSelector((state) => state.firebase.profile);

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
        onClick: (missionUid) => {
          Mission.accept(user.uid, user, missionUid);
        },
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
      }}
    />
  );

  const viewRouteAllMissions = <ShowDeliveryRoute missions={missions} />;

  const validMissions = [];
  const positions = missions?.reduce((acc, mission) => {
    const { lat, lng } = mission?.deliveryLocation;
    if (lat && lng) {
      acc.push([lat, lng]);
      validMissions.push(mission);
    }
    return acc;
  }, []);

  return (
    <div className="volunteer-mission-list">
      {positions.length !== 0 && (
        <Box width="100%" height="200px">
          <Map bounds={positions} style={{ width: "100%", height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {missions?.map((mission) => {
              return <Marker key={mission.uid} position={mission.deliveryLocation} />;
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
