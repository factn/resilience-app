import React from "react";

const ResourceDetails = ({ details, showType }) => {
  return (
    <>
      {showType ? <b>Food Box</b> : null}
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

const DetailsText = ({ mission, showType }) => {
  console.log(mission);

  const { details, type } = mission;

  let Details = null;

  if (type === "resource") {
    Details = <ResourceDetails showType={showType} details={details} />;
  }

  return <div>{Details}</div>;
};
export default DetailsText;
