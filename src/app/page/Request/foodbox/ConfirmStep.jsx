import React from "react";
import { useHistory } from "react-router-dom";

import PaypalCheckout from "../../../component/PaypalCheckout/PaypalCheckout";

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
