import React from "react";
import { ReactComponent as BoxIcon } from "../../../img/food_box_delivery.svg";
import { iconStylesWhite } from "./styles";

const FoodBoxDeliveryIcon = (props) => {
  return <BoxIcon style={iconStylesWhite} {...props} />;
};

export default FoodBoxDeliveryIcon;
