import React from "react";

const ResourceDetails = ({ details, showType }) => {
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
    Details = <ResourceDetails details={details} />;
  }

  return <div>{Details}</div>;
};
export default DetailsText;
