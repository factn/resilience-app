import React from "react";

import PaypalCheckout from "../../../component/PaypalCheckout/PaypalCheckout";
import { useHistory } from "react-router-dom";

function ConfirmStep() {
  const history = useHistory();
  return (
    <>
      <h1>confirm</h1>

      <PaypalCheckout
        cart={{ amount: { value: "30" } }}
        onApprove={() => history.push("/request/foodbox/success")}
        onError={() => history.push("/request/foodbox/error")}
      />
    </>
  );
}

export default ConfirmStep;
