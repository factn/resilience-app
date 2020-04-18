import React from "react";
import { Typography } from "@material-ui/core";
import theme from "../../theme";

const H1 = ({ children, ...rest }) => (
  <Typography variant="h1" style={theme.typography.h1} {...rest}>
    {children}{" "}
  </Typography>
);
const H2 = ({ children, ...rest }) => (
  <Typography variant="h2" style={theme.typography.h2} {...rest}>
    {children}
  </Typography>
);
const H3 = ({ children, ...rest }) => (
  <Typography variant="h3" style={theme.typography.h3} {...rest}>
    {children}{" "}
  </Typography>
);
const H4 = ({ children, ...rest }) => (
  <Typography variant="h4" style={theme.typography.h4} {...rest}>
    {children}{" "}
  </Typography>
);
const H5 = ({ children, ...rest }) => (
  <Typography variant="h5" style={theme.typography.h5} {...rest}>
    {children}{" "}
  </Typography>
);
const Body1 = ({ children, ...rest }) => (
  <Typography variant="body1" style={theme.typography.body1} {...rest}>
    {children}{" "}
  </Typography>
);
const Body2 = ({ children, ...rest }) => (
  <Typography variant="body2" style={theme.typography.body2} {...rest}>
    {children}{" "}
  </Typography>
);

export { H1, H2, H3, H4, H5, Body1, Body2 };
