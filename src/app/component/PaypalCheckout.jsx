import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { usePaypal } from "../hooks";

const Props = {
  amount: PropTypes.string.isRequired,
};

const things = {
  amount: 0,
};

export default function PaypalCheckout({ amount }) {
  const paypal = usePaypal();
  const checkoutRef = useRef(null);
  useEffect(() => {
    console.log(amount);
    things.amount = amount;
  }, [amount]);

  useEffect(() => {
    paypal &&
      paypal
        .Buttons({
          createOrder: createOrder(),
          onApprove,
        })
        .render(checkoutRef.current);
  }, [paypal]);

  return <div ref={checkoutRef}></div>;
}

PaypalCheckout.propTypes = Props;

function createOrder() {
  // https://developer.paypal.com/docs/api/orders/v2/#orders_create
  return (data, actions) => {
    console.log({ data });
    return actions.order.create({
      purchase_units: [
        {
          // description: "donation",
          amount: {
            value: things.amount,
          },
        },
      ],
    });
  };
}

function onApprove(data, actions) {
  console.log(data);

  return actions.order.capture().then((details) => alert("nice"));
}

function onError() {}
