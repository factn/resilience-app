import React from "react";
import PropTypes from "prop-types";
import { StyledCard } from "./Card.style";

const Card = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

Card.propTypes = {
  children: PropTypes.any,
};
export default Card;
