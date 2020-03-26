import React from "react";
import PropTypes from "prop-types";
import { StyledCard } from "./Card.style";

const Card = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};

Card.propTypes = {
  children: PropTypes.any,
  flat: PropTypes.bool,
};
Card.defaultProps = {
  flat: false,
};
export default Card;
