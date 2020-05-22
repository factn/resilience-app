import React from "react";
import FoodBoxIcon from "../icons/FoodBoxIcon";

const ResourceDetails = ({ details }) => {
  return (
    <>
      {details?.map((resource, index) => {
        return (
          <div key={index}>
            <FoodBoxIcon style={{ marginRight: "2px", maxHeight: "18px" }} />
            {resource?.quantity} x {resource?.displayName}
          </div>
        );
      })}
    </>
  );
};

const DetailsText = ({ mission }) => {
  const { details, type } = mission;

  if (type === "resource") {
    return <ResourceDetails details={details} />;
  }
  return null;
};
export default DetailsText;
