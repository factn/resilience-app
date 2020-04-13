import React, { useEffect, useRef } from "react";

import { usePaypal } from "../../hooks";
import { PurchaseUnit, OrderDetails } from "./PaypalTypes";

let cartCache: PurchaseUnit[] = [];

type Props = {
  updateCart: (set: (purchaseUnits: PurchaseUnit[]) => void) => void,
  onApprove: (details: OrderDetails) => void,
};

function handleUpdateCart(purchaseUnits: PurchaseUnit[]) {}

/**
 * See https://developer.paypal.com/docs/checkout/integration-features/# for implementation details
 */
export default function PaypalCheckout({ onApprove, updateCart }: Props) {
  const paypal = usePaypal();
  const checkoutRef = useRef(null);

  updateCart(handleUpdateCart);

  // on mount, clear our cache
  useEffect(() => {
    cartCache = [];
  }, []);

  useEffect(() => {
    paypal &&
      paypal
        .Buttons({
          createOrder: createOrder(),
          onApprove: handleOnApprove(onApprove),
        })
        .render(checkoutRef.current);
  }, [paypal, onApprove]);

  return <div ref={checkoutRef}></div>;
}

function createOrder() {
  // https://developer.paypal.com/docs/api/orders/v2/#orders_create
  return (data, actions) => {
    console.log({ data });
    return actions.order.create({
      purchase_units: [
        {
          // description: "donation",
          amount: {
            value: cache.amount,
          },
        },
      ],
    });
  };
}

function handleOnApprove(callback: (details: OrderDetails) => void) {
  return (data: any, actions: any) => {
    return actions.order.capture().then(callback);
  };
}

function onError() {}
