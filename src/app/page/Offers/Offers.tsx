import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

// Created based on the schema in firebase
type Offer = {
  id: string;
  title: string;
};

const OffersPage = () => {
  useFirestoreConnect([{ collection: "offers" }]);
  // @ts-ignore
  const offers: Offer[] | undefined = useSelector(state => state.firestore.ordered.offers);
  return (
    <div>
      <h2>This page demos hitting firestore API and returning a typed list of data</h2>
      {offers?.map(offer => (
        <h5 key={offer.id}>{offer.title}</h5>
      ))}
    </div>
  );
};
export default OffersPage;
