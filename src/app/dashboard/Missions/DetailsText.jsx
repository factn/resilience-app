import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import _ from "../../utils/lodash";

const FoodBoxDetails = ({ showType, details }) => {
  return (
    <>
      {showType ? <b>Food Box</b> : null}
      {_.get(details, "needs")?.map((box, index) => {
        return (
          <div key={index}>
            {_.get(box, "quantity")} x {_.get(box, "name")}
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
