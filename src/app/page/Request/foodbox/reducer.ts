import { PurchaseUnit, Item, Amount } from "../../../component/PaypalCheckout/PaypalTypes";
import { Location, Resource } from "../../../model/schema";

export type CartItem = {
  resource: Resource;
  quantity: number;
};

export type State = {
  cart2: PurchaseUnit;
  cart: Record<string, CartItem>;
  dropOffDetails: {
    instructions: string;
    location: Location | null;
  };
  step: 0 | 1 | 2;
  maxStep: 0 | 1 | 2;
  loading: boolean;
  error: string | null;
};

export const initialState: State = {
  cart2: {
    amount: {
      value: "0",
    },
  },
  cart: {},
  dropOffDetails: {
    instructions: "",
    location: null,
  },
  step: 0,
  maxStep: 0,
  loading: false,
  error: null,
};

type ActionUpdateCart = {
  type: "UPDATE_CART";
  payload: CartItem;
};

type Details = {
  location: Location;
  instructions: string;
};

type ActionUpdateDetails = {
  type: "UPDATE_DETAILS";
  payload: Details;
};

type ActionUpdateStep = {
  type: "UPDATE_STEP";
  payload: number;
};

type ActionNext = {
  type: "NEXT";
  payload: never;
};

type ActionBack = {
  type: "BACK";
  payload: never;
};

type ActionUpdateLoading = {
  type: "LOADING";
  payload: boolean;
};

type ActionUpdateError = {
  type: "ERROR";
  payload: string | null;
};

type Actions =
  | ActionUpdateCart
  | ActionUpdateDetails
  | ActionUpdateStep
  | ActionBack
  | ActionNext
  | ActionUpdateLoading
  | ActionUpdateError;

export function reducer(state: State, { payload, type }: Actions) {
  switch (type) {
    case "UPDATE_CART":
      const { quantity, resource } = payload as CartItem;
      const newCart = state.cart;
      newCart[resource.id] = { resource, quantity };
      return { ...state, cart: newCart };
    case "UPDATE_DETAILS":
      const { instructions, location } = payload as Details;
      return { ...state, dropOffDetails: { instructions, location } };
    case "UPDATE_STEP":
      // make sure we're only going to a step less than or equal to the max step
      return { ...state, step: payload && payload <= state.maxStep ? payload : state.step };
    case "NEXT":
      return {
        ...state,
        step: state.step + 1,
        maxStep: state.maxStep === 2 ? state.maxStep : state.maxStep + 1,
        loading: false,
      };
    case "BACK":
      return { ...state, step: state.step - 1, loading: false };
    case "LOADING":
      return { ...state, loading: payload, error: null };
    case "ERROR":
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}

// We will most likely want to depricate this function in lou of an
// `addToCart` action once users can select more than one foodbox
function updateCart(payload: CartItem) {
  const { quantity, resource } = payload;
  console.log(payload);

  const item: Item = {
    sku: resource.id,
    quantity: quantity.toString(),
    name: resource.name,
    unit_amount: {
      value: resource.cost.toString(),
    },
    description: resource.description,
  };

  const total = (quantity * resource.cost).toString();

  const amount: Amount = {
    value: total,
    breakdown: {
      item_total: { value: total },
      tax_total: { value: "0" },
    },
  };

  const newCart: PurchaseUnit = {
    amount,
    items: [item],
  };

  return newCart;
}
