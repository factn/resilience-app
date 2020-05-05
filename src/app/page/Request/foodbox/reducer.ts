import { Location, Resource } from "../../../model/schema";

export type CartItem = {
  resource: Resource;
  quantity: number;
};

export type State = {
  cart: Record<string, CartItem>;
  instructions: string;
  location: Location | null;
  recipient: {
    displayName: string;
    phoneNumber: string;
    uid: string;
  };
  step: 0 | 1 | 2;
  maxStep: 0 | 1 | 2;
  loading: boolean;
  error: string | null;
};

export const initialState: State = {
  cart: {},
  instructions: "",
  location: null,
  recipient: {
    displayName: "",
    phoneNumber: "",
    uid: "",
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
  recipient: {
    displayName: string;
    phoneNumber: string;
    uid: string;
  };
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
      newCart[resource.uid] = { resource, quantity };
      return { ...state, cart: newCart };
    case "UPDATE_DETAILS":
      const { instructions, location, recipient } = payload as Details;
      return { ...state, instructions, location, recipient, step: 2, maxStep: 2 };
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
