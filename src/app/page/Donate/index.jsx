import React from "react";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

import PaypalCheckout from "../../component/PaypalCheckout";
import { useForm } from "../../hooks";

const Container = styled.div`
  height: 100%;
  width: 100vw;
  padding: 0 10rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* position: absolute; */
  /* top: 50%; */
`;

export default function Donate() {
  const { values, handleChange } = useForm();
  return (
    <Container>
      <TextField
        value={values.amount || ""}
        onChange={handleChange}
        label="Amount"
        name="amount"
        type="number"
        inputProps={{
          step: 0.01,
        }}
        helperText={"$"}
      />
      <PaypalCheckout amount={values.amount} />
    </Container>
  );
}
