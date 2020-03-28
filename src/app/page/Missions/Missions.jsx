import React from "react";
import { useFirestoreConnect, withFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Button } from "../../component";
import { Page, Card } from "../../layout";
import { useHistory } from "react-router-dom";
import { User } from "../../model";

const MissionsPage = ({ firestore }) => {
  let history = useHistory();
  useFirestoreConnect([{ collection: "missions" }]);
  const missions = useSelector((state) => state.firestore.ordered.missions);

  const user = useSelector((state) => state.firebase.auth);

  function TakeToMap() {
    alert("this should take you to the map!");
  }

  function volunteerForMission(missionId) {
    User.assginedToMission(firestore, missionId, user.uid);
  }

  return (
    <Page>
      {missions?.map((mission) => (
        <Card key={mission.id}>
          <img alt="img here" height="300" src={mission.url} /> {/* //TODO: lazy load images */}
          <h2>{mission.description}</h2>
          <p>{mission.details}</p>
          {/* //TODO show where in map */}
          <h5 onClick={TakeToMap}>📍 City, Street Address</h5>
          <div className="side-by-side">
            <h3>when</h3>
            <h3>STATUS: {mission.status}</h3>
          </div>
          <div>
            <Button text="Volunteer" onClick={() => volunteerForMission(mission.id)} />
            <Button
              text="Details"
              onClick={() => {
                history.push(`/missions/${mission.id}`);
              }}
            />
          </div>
        </Card>
      ))}
    </Page>
  );
};
export default withFirestore(MissionsPage);
