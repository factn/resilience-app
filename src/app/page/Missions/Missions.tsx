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
  return (
    <Page>
      {missions?.map((mission) => (
        <Card key={mission.id}>
            <img alt="image here if existed" />
            <h2>mission:{mission.description}</h2>
            <h2>status:{mission.status}</h2>
            <p>details:{mission.details}</p>
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
