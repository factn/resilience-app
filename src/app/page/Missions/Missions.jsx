import React from "react";
import { useFirestoreConnect, withFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Button } from "../../component";
import { Page, Card } from "../../layout";
import { useHistory } from "react-router-dom";
import { User } from "../../model";
import { MissionCard } from "../../component";

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
          <MissionCard mission={mission} />

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
