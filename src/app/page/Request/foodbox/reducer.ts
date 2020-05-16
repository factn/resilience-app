import { Location, Resource } from "../../../model/schema";

export type CartItem = {
  resource: Resource;
  quantity: number;
};

type Details = {
  instructions: string;
  location: Location | null;
  curbsidePickup: boolean;
};

export type State = {
  cart: Record<string, CartItem>;
  details: Details;
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
  details: {
    instructions: "",
    location: null,
    curbsidePickup: true,
  },
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

type ActionUpdateDetails = {
  type: "UPDATE_DETAILS";
  payload: Details;
};

type ActionUpdateUser = {
  type: "UPDATE_USER";
  payload: {
    displayName: string;
    phoneNumber: string;
    uid: string;
  };
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
  | ActionUpdateUser
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
      return { ...state, details: { ...state.details, ...(payload as Details) } };
    case "UPDATE_USER":
      return { ...state, recipient: { ...state.recipient, ...(payload as any) } };
    case "UPDATE_STEP":
      // make sure we're only going to a step less than or equal to the max step
      return { ...state, step: (payload as number) <= state.maxStep ? payload : state.step };
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
