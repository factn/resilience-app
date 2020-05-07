import { Typography } from "@material-ui/core";
import React from "react";

import theme from "../../theme";

const H1 = ({ children, ...rest }) => (
  <Typography variant="h1" {...rest}>
    {children}{" "}
  </Typography>
);
const H2 = ({ children, ...rest }) => (
  <Typography variant="h2" {...rest}>
    {children}
  </Typography>
);
const H3 = ({ children, ...rest }) => (
  <Typography variant="h3" {...rest}>
    {children}{" "}
  </Typography>
);
const H4 = ({ children, ...rest }) => (
  <Typography variant="h4" {...rest}>
    {children}{" "}
  </Typography>
);
const H5 = ({ children, ...rest }) => (
  <Typography variant="h5" {...rest}>
    {children}{" "}
  </Typography>
);
const H6 = ({ children, ...rest }) => (
  <Typography variant="h6" {...rest}>
    {children}{" "}
  </Typography>
);
const Body1 = ({ children, ...rest }) => (
  <Typography variant="body1" {...rest}>
    {children}{" "}
  </Typography>
);
const Body2 = ({ children, ...rest }) => (
  <Typography variant="body2" {...rest}>
    {children}{" "}
  </Typography>
);
const Div = ({ children, ...rest }) => (
  <Typography component="div" {...rest}>
    {children}
  </Typography>
);
const TypographyWrapper = ({ children, elementType, ...rest }) => (
  <Typography variant={elementType} style={theme.typography[elementType]} {...rest}>
    {children}
  </Typography>
);

export { H1, H2, H3, H4, H5, H6, Body1, Body2, Div, TypographyWrapper };
