import React from "react";
import { Box } from "@material-ui/core";
import _ from "../../../utils";
import { H5, Body1 } from "../../../component/Typography";
import styled from "styled-components";

const Notes = styled.div`
  color: grey;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
`;

const FoodBoxDetailsCol = ({ details, notes }) => {
  return (
    <Box width="200px">
      <H5>Food Box</H5>
      {_.get(details, "needs")?.map((box, index) => {
        return (
          <div key={index}>
            <small>
              {_.get(box, "quantity")} x {_.get(box, "name")}
            </small>
          </div>
        );
      })}
      <Notes>{notes}</Notes>
    </Box>
  );
};

function MissionType({ type, details, notes }) {
  if (type === "foodbox") {
    return <FoodBoxDetailsCol type={type} details={details} notes={notes} />;
  }
  return <Box width="200px"></Box>;
}
export default MissionType;
