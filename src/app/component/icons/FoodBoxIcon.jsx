import React from "react";
import { ReactComponent as AppleIcon } from "../../../img/apple.svg";
import iconStyles from "./styles";

const FoodBoxIcon = (props) => {
  return <AppleIcon className="food-box-icon" style={iconStyles} {...props} />;
};

export default FoodBoxIcon;
