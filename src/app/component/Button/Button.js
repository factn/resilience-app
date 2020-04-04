import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({}));

export function CustomizeButton({ children, text, ...rest }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Button className={classes.root} color="primary" variant="contained" disableElevation {...rest}>
      {text ? text : children}
    </Button>
  );
}
export default CustomizeButton;
