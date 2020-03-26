import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Button } from "../../component";

import { Page, Card } from "../../layout";
// Created based on the schema in firebase
type Mission = {
  id: string;
  description: string;
  status: string;
  details: string;
};

const OffersPage = () => {
  useFirestoreConnect([{ collection: "missions" }]);
  // @ts-ignore
  const missions: Mission[] | undefined = useSelector((state) => state.firestore.ordered.missions);

  function TakeToMap(){
    alert('this should take you to the map!')
  };

  return (
    <Page>
    {console.log(missions)}
      {missions?.map((mission) => (
        <Card key={mission.id}>
            <img alt="image here if existed" />
            <h2>{mission.description}</h2>
            <p>{mission.details}</p>
            {/* once we have location services please make sure to change the line below to reflect that */}
            <h5 onClick={TakeToMap}>📍 City, Street Address</h5>
            <div className="side-by-side">
            <h3>posted _ ago</h3>
            <h3>STATUS: {mission.status}</h3>
            </div>
            {
              //@ts-ignore
              <Button text="Volunteer" />
            }
        </Card>
      ))}
    </Page>
  );
};
export default OffersPage;
