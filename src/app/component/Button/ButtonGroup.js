import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));
export function CustomizeButton({ children, ...rest }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ButtonGroup className={classes.root} {...rest}>
      {children}
    </ButtonGroup>
  );
}
export default CustomizeButton;
