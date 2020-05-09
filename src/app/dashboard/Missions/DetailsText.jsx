import React from "react";

const FoodBoxDetails = ({ details, showType }) => {
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

const DetailsText = ({ mission, showType }) => {
  const { missionDetails, type } = mission;

  let SpecificDetails = null;
  if (type === "foodbox") {
    SpecificDetails = <FoodBoxDetails showType={showType} type={type} details={missionDetails} />;
  }

  return <div>{SpecificDetails}</div>;
};
export default DetailsText;
