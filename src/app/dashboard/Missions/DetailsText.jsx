import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";

const FoodBoxDetails = ({ showType, details }) => {
  return (
    <>
      {showType ? <b>Food Box</b> : null}
      {details?.needs?.map((box, index) => {
        return (
          <div key={index}>
            {box?.quantity} x {box?.name}
          </div>
        );
      })}
    </>
  );
};

const DetailsText = ({ showType, mission }) => {
  const { missionDetails, type } = mission;

  let SpecificDetails = null;
  if (type === "foodbox") {
    SpecificDetails = <FoodBoxDetails showType={showType} type={type} details={missionDetails} />;
  }

  return <div>{SpecificDetails}</div>;
};
export default DetailsText;
