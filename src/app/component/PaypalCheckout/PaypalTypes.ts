/**
 * https://developer.paypal.com/docs/api/orders/v2/#definition-amount_with_breakdown
 */

export interface Amount {
  currency_code?: string;
  value: string;
}

/**
 * https://developer.paypal.com/docs/api/orders/v2/#definition-item
 */

export interface Item {
  name: string;
  unit_amount: Amount;
  description: string;
  quantity: string;
}

/**
 * https://developer.paypal.com/docs/api/orders/v2/#definition-shipping_detail.address_portable
 */

export interface Address {
  address_line_1: string;
  address_line_2: string;
  postal_code: string;
  country_code: string;
}

/**
 * https://developer.paypal.com/docs/api/orders/v2/#definition-payee
 */

export interface Payee {
  email_address?: string;
  merchant_id?: string;
}

/**
 * https://developer.paypal.com/docs/api/orders/v2/#definition-payer
 */

export interface Payer {
  name?: {
    given_name?: string;
    surname?: string;
  };
  email_address?: string;
  payer_id?: string;
  address?: Address;
}

/**
 * https://developer.paypal.com/docs/api/orders/v2/#definition-shipping_detail
 */

export interface Shipping {
  name?: string;
  address?: Address;
}

/**
 * https://developer.paypal.com/docs/api/orders/v2/#definition-purchase_unit_request
 */
export interface PurchaseUnit {
  reference_id?: string;
  invoice_id?: string;
  custom_id?: string;
  amount: Amount;
  payee?: Payee;
  description?: string;
  soft_descriptor?: string;
  item?: Item[];
  shipping?: Shipping;
  payments?: any;
}

/**
 * https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */

export interface Order {
  payer?: Payer;
  purchase_units: PurchaseUnit[];
}

export type Status = "CREATED" | "SAVED" | "APPROVED" | "VOIDED" | "COMPLETED";

/**
 *  https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */

export interface OrderDetails {
  create_time: string;
  update_time: string;
  id: string;
  payment_source: any;
  intent: "CAPTURE" | "AUTHORIZE";
  payer: Payer;
  purchase_units: PurchaseUnit[];
  status: Status;
}
