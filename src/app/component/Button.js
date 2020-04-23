import { Button } from "@material-ui/core";
import React from "react";

export function CustomizeButton({ children, text, ...rest }) {
  return (
    <Button color="primary" variant="contained" disableElevation {...rest}>
      {text ? text : children}
    </Button>
  );
}
export default CustomizeButton;
