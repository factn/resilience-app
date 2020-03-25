import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Page, Card } from "../../layout";

// Created based on the schema in firebase
type Request = {
  id: string;
  description: string;
  status: string;
  details: string;
};

const OffersPage = () => {
  useFirestoreConnect([{ collection: "requests" }]);
  // @ts-ignore
  const request: Request[] | undefined = useSelector((state) => state.firestore.ordered.requests);
  return (
    <Page>
      {request?.map((request) => (
        <Card key={request.id}>
          <h2 >{request.description}</h2>
          <h2 >{request.status}</h2>
          <p>{request.details}</p>
        </Card>
      ))}
    </Page>
  );
};
export default OffersPage;
