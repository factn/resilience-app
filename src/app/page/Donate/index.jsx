import React from "react";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

import PaypalCheckout from "../../component/PaypalCheckout/PaypalCheckout";
import { useForm } from "../../hooks";

import { PurchaseUnit } from "../../component/PaypalCheckout/PaypalTypes";

const Container = styled.div`
  height: 100%;
  width: 100vw;
  padding: 0 10rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
      <PaypalCheckout
        onApprove={(details) => console.log(details)}
        cart={{
          amount: {
            currency_code: "USD",
            value: "30",
            breakdown: {
              item_total: {
                value: "30",
                currency_code: "USD",
              },
            },
          },
          description: "Donation",
          soft_descriptor: "This is a donation",
          items: [
            {
              description: "Medly",
              name: "Box",
              unit_amount: {
                currency_code: "USD",
                value: "10",
              },
              quantity: "3",
            },
          ],
        }}
      />
    </Container>
  );
}

const box = {
  amount: {
    value: "30",
  },
  description: "Box",
};
