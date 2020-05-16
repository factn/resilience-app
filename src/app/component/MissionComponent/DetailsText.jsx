import React from "react";

const ResourceDetails = ({ details }) => {
  return (
    <>
      {details?.map((resource, index) => {
        return (
          <div key={index}>
            {resource?.quantity} x {resource?.displayName}
          </div>
        );
      })}
    </>
  );
};

const DetailsText = ({ mission }) => {
  const { details, type } = mission;

  let Details = null;

  if (type === "resource") {
    return <ResourceDetails details={details} />;
  }
  return null;
};
export default DetailsText;
