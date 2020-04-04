import React from "react";
import { Button } from "@material-ui/core";

export function CustomizeButton({ children, text, ...rest }) {
  return (
    <Button color="primary" variant="contained" disableElevation {...rest}>
      {text ? text : children}
    </Button>
  );
}
export default CustomizeButton;
