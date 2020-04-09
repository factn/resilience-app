import React, { useState } from "react";

import { compose } from "redux";

import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import Page from "../../layout/Page";

// Created based on the schema in firebase
import styled from "styled-components";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { User } from "../../model";

import addressLookUp from "../../utils/addressLookUp";

import MissionDetailsView from "./MissionDetailsView";

export const StyledHr = styled.hr`
  border: 1px dashed #de3254;
  width: 100%;
  margin: 10px auto;
`;

export const StyledImage = styled.img`
  height: auto;
  max-width: 100%;
`;

export const StyledDiv = styled.div`
  height: auto;
  margin: 10px 0;
  max-width: 100%;
`;

const MissionDetailsPage = ({ firestore, auth, mission, history }) => {
  mission = mission || {};
  const [userUnverifiedPopupOpen, setUserUnverifiedPopupOpen] = useState(false);
  function volunteerForMission(missionId) {
    if (!auth.phoneNumber) {
      setUserUnverifiedPopupOpen(true);
    } else {
      User.assignAsVolunteer(firestore, missionId, auth.uid);
    }
  }

  let requester = {
    name: "Audrey",
    address: "123 Example st, San Fransisco, 92501",
  };

  // functionality for the map look up
  const [cords, setCords] = useState();

  if (isLoaded(mission) && !isEmpty(mission) && !cords) {
    const missionLocation =
      mission.address + "%20" + mission.city + "%20" + mission.state + "%20" + mission.postalCode;
    const dataForCords = addressLookUp(missionLocation);
    dataForCords.then((res) => setCords(res)).catch((error) => console.log(error));
  } else {
    console.log("No location data available");
  }

  return (
    <Page key="mission-detail" isLoaded={isLoaded(mission)} isEmpty={isEmpty(mission)}>
      <MissionDetailsView
        mission={mission}
        requester={requester}
        volunteerForMission={volunteerForMission}
        userUnverifiedPopupOpen={userUnverifiedPopupOpen}
        setUserUnverifiedPopupOpen={setUserUnverifiedPopupOpen}
        cords={cords}
        history={history}
      />
    </Page>
  );
};
const mapStateToProps = (state, ownProps) => {
  const missionId = ownProps.match.params.id;
  const mission = state.firestore.data.missions && state.firestore.data.missions[missionId];
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
