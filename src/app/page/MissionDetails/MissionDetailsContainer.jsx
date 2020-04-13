import React, { useState } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import Page from "../../layout/Page";

// Created based on the schema in firebase
import styled from "styled-components";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Missions } from "../../model";

import addressLookUp from "../../utils/addressLookUp";

import MissionDetailsView from "./MissionDetailsView";

/**
 * Component for showing mission details
 *
 * @component
 */
const MissionDetailsPage = ({ firestore, auth, mission, history }) => {
  console.log("Mission: " + mission);
  mission = mission || {};
  const [userUnverifiedPopupOpen, setUserUnverifiedPopupOpen] = useState(false);
  function volunteerForMission(missionId) {
    if (!auth.phoneNumber) {
      setUserUnverifiedPopupOpen(true);
    } else {
      console.log(missionId);
      Missions.assignAsVolunteer(firestore, missionId, auth.uid);
    }
  }

  function startMission(missionId) {
    console.log("started mission " + missionId);
  }

  function markMissionAsDelivered(missionId) {
    console.log("marked mission " + missionId + " as delivered");
  }

  function markMissionAsCompleted(missionId) {
    console.log(missionId);
    console.log("markMissionAsCompleted");
  }

  // functionality for the map look up
  const [cords, setCords] = useState();

  if (isLoaded(mission) && !isEmpty(mission) && !cords) {
    const missionLocation =
      mission.address + "%20" + mission.city + "%20" + mission.state + "%20" + mission.postalCode;
    const dataForCords = addressLookUp(missionLocation);

    dataForCords
      .then((res) => {
        if (res) {
          setCords(res);
        }
      })
      .catch((error) => console.log(error));
  } else {
    console.log("No location data available");
  }

  return (
    <Page key="mission-detail" isLoaded={isLoaded(mission)} isEmpty={isEmpty(mission)}>
      <MissionDetailsView
        mission={mission}
        volunteerForMission={volunteerForMission}
        startMission={startMission}
        markedMissionAsDelivered={markMissionAsDelivered}
        userUnverifiedPopupOpen={userUnverifiedPopupOpen}
        setUserUnverifiedPopupOpen={setUserUnverifiedPopupOpen}
        cords={cords}
        history={history}
      />
    </Page>
  );
};

MissionDetailsPage.propTypes = {
  /**
   * Firebase store
   */
  firestore: PropTypes.object.isRequired,
  /**
   * Auth token
   */
  auth: PropTypes.shape({
    phoneNumber: PropTypes.string,
    uid: PropTypes.string,
  }),
  /**
   * Mission details
   */
  mission: PropTypes.shape({
    status: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    details: PropTypes.any,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
  }),
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const missionId = ownProps.match.params.id;
  const mission = {
    id: missionId,
    ...(state.firestore.data.missions && state.firestore.data.missions[missionId]),
  };
  return {
    auth: state.firebase.auth,
    missionId,
    mission,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    const missionId = props.missionId;
    if (!props.auth.uid) return [];
    return [
      {
        collection: "missions",
        doc: missionId,
      },
    ];
  })
)(MissionDetailsPage);
