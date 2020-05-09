import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import { CircularProgress } from "@material-ui/core";

import { usePaypal } from "../../hooks";
import { Order, OrderDetails, PurchaseUnit } from "./PaypalTypes";
import { Organization } from "../../model";

type Props = {
  cart: PurchaseUnit | PurchaseUnit[];
  onApprove: (details: OrderDetails) => void;
  onError: (error: any) => void;
  onClick: (data: any, actions: any) => any;
  color: "gold" | "blue" | "silver" | "white" | "black";
};

/**
 * See https://developer.paypal.com/docs/checkout/integration-features/# for implementation details
 */
export default function PaypalCheckout({
  cart,
  color = "gold",
  onApprove,
  onClick,
  onError,
  ...rest
}: Props) {
  const paypal: any = usePaypal();

  function createOrder(data: any, actions: any) {
    return actions.order.create({
      purchase_units: Array.isArray(cart) ? cart : [cart],
      application_context: {
        shipping_preference: "NO_SHIPPING",
        brand_name: Organization.data.name,
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
    <div {...rest}>
      {paypal && PaypalButtons ? (
        <PaypalButtons
          onApprove={handleOnApprove(onApprove)}
          onClick={onClick}
          createOrder={createOrder}
          onError={onError}
          style={{
            tagline: false,
            color: color,
          }}
          fundingSource={paypal.FUNDING.PAYPAL}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

function handleOnApprove(callback: (details: OrderDetails) => void) {
  return (data: any, actions: any) => {
    return actions.order.capture().then(callback);
  };
}
