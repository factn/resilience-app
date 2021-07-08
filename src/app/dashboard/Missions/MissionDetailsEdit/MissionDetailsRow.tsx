import React from "react";
import { MissionInterface, MissionType } from "../../../model/schema";
import { Box, TextField } from "@material-ui/core";
import { H3 } from "../../../component";
import styled from "styled-components";

const Row = styled(Box)`
  margin-top: 1rem;
`;
const OrderName = styled(TextField)`
  width: 16rem;
`;
const QuantityField = styled(TextField)`
  width: 6rem;
  margin-left: auto;
  float: right;
`;

const MissionDetailsRow = ({ mission }: { mission: MissionInterface }) => {
  let type = mission.type;
  let details = mission.details;
  if (type === MissionType.resource) {
    return (
      <Box>
        <H3>Orders</H3>
        {details?.map((box) => (
          <Row key={box.resourceUid} width="100%">
            <OrderName label="Order Type" value={box.displayName} variant="outlined" />
            <QuantityField label="Quantity" value={box.quantity} variant="outlined" />
          </Row>
        ))}
      </Box>
    );
  }
  return null;
};

export default MissionDetailsRow;
