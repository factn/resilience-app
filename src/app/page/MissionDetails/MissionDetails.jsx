import React , { useState , useEffect}from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Button } from "../../component";
import { Page, Card } from "../../layout";
import { Typography, Avatar, Grid } from "@material-ui/core";

import profileImg from "../../../img/fb-profile.jpg";
import { ReactComponent as MapMarkerImg } from "../../../img/map-marker-alt.svg";
// Created based on the schema in firebase
import styled from "styled-components";
import { isLoaded, withFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { User } from "../../model";

import MapView from "../../component/MapView";
import addressLookUp from "../../hooks/addressLookUp";

export const StyledHr = styled.hr`
  border: 1px dashed #de3254;
  width: 100%;
`;

export const StyledImage = styled.img`
  height: auto;
  max-width: 100%;
`;

const MapViewContainer = styled.div`
  display: flex;
  margin: 1% auto;
  padding: 1% 1%;
  `;

const MissionDetailsPage = ({ firestore, match }) => {
  let history = useHistory();
  const missionId = match.params.id;
  // syncing the mission
  useFirestoreConnect({
    collection: "missions",
    doc: missionId,
  });
  // select the mission
  const mission = useSelector(
    ({ firestore: { data } }) => data.missions && data.missions[missionId]
  );
  const user = useSelector((state) => state.firebase.auth);

  function volunteerForMission() {
    User.assginedToMission(firestore, missionId, user.uid);
  }

  let requester = {
    name: "Audrey",
    address: "123 Example st, San Fransisco, 92501",
  };

  // functionality for the map look up
  const [cords, setCords] = useState();
    if(!isLoaded(mission)){
      console.log("No location data available");
    }else{
        const missionLocation = mission.address + "%20" + mission.city + "%20" + mission.state + "%20" + mission.postalCode;
        const dataForCords = addressLookUp(missionLocation);  
        setCords(dataForCords);
      }




  return (
    <Page>
      {!isLoaded(mission) ? (
        <Card> Loading ... </Card>
      ) : (
        <>
          <Card>
            <Button
              text="Back to Missions"
              onClick={() => {
                history.push("/missions");
              }}
            />
          </Card>

          <Card>{mission.url && <StyledImage src={mission.url} />}</Card>
          <Card>
            <Typography variant="h2">{mission.description}</Typography>
            <Typography variant="h4">status: {mission.status}</Typography>
            <Grid>
              <Button text="Volunteer" onClick={volunteerForMission} />
            </Grid>
            <StyledHr />
            <Grid container>
              <Grid item>
                <Avatar src={profileImg} />
              </Grid>
              <Grid item>
                <Typography variant="h4">{requester.name}</Typography>
              </Grid>
              <MapMarkerImg />
              <Typography variant="h6">{requester.address}</Typography>
            </Grid>
            <Typography variant="body1">{mission.details}</Typography>
            <MapViewContainer>
              {cords != undefined ? <MapView values={cords}/> : <Typography variant="p">Loading...</Typography> }
            </MapViewContainer>
          </Card>
        </>
      )}
    </Page>
  );
};
export default withFirestore(MissionDetailsPage);
