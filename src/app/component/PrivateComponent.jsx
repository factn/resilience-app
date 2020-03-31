import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

export default function PrivateComponent({ children, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  return isLoaded(auth) && !isEmpty(auth) && <>{children}</>;
}
