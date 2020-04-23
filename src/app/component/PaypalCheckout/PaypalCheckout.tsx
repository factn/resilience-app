import React, { useMemo } from "react";
import ReactDOM from "react-dom";

import { usePaypal } from "../../hooks";
import { Order, OrderDetails, PurchaseUnit } from "./PaypalTypes";

type Props = {
  cart: PurchaseUnit | PurchaseUnit[];
  onApprove: (details: OrderDetails) => void;
  onError: (error: any) => void;
};

/**
 * See https://developer.paypal.com/docs/checkout/integration-features/# for implementation details
 */
export default function PaypalCheckout({ cart, onApprove, onError }: Props) {
  const paypal: any = usePaypal();

  function createOrder(data: any, actions: any) {
    return actions.order.create({
      purchase_units: Array.isArray(cart) ? cart : [cart],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    } as Order);
  }

  const PaypalButtons = useMemo(
    () =>
      paypal &&
      paypal.Buttons.driver("react", {
        React,
        ReactDOM,
      }),
    [paypal]
  );

  return (
    PaypalButtons && (
      <PaypalButtons
        onApprove={handleOnApprove(onApprove)}
        onClick={verify}
        createOrder={createOrder}
        onError={onError}
        style={{
          tagline: false,
          color: "gold",
        }}
        fundingSource={paypal.FUNDING.PAYPAL}
      />
    )
  );
}

async function verify(data: any, actions: any) {
  // TODO: verify order with backend call
  return actions.resolve();
}

function handleOnApprove(callback: (details: OrderDetails) => void) {
  return (data: any, actions: any) => {
    return actions.order.capture().then(callback);
  };
}
