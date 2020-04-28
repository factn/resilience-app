//import { MuiTypography, variantMapping } from "@material-ui/core";
//import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

// const H1 = ({ children, ...rest }) => (
//   <Typography variant="h1" {...rest}>
//     {children}{" "}
//   </Typography>
// );
// const H2 = ({ children, ...rest }) => (
//   <Typography variant="h2" {...rest}>
//     {children}
//   </Typography>
// );
// const H3 = ({ children, ...rest }) => (
//   <Typography variant="h3" {...rest}>
//     {children}{" "}
//   </Typography>
// );
// const H4 = ({ children, ...rest }) => (
//   <Typography variant="h4" {...rest}>
//     {children}{" "}
//   </Typography>
// );
// const H5 = ({ children, ...rest }) => (
//   <Typography variant="h5" {...rest}>
//     {children}{" "}
//   </Typography>
// );
// const Body1 = ({ children, ...rest }) => (
//   <Typography variant="body1" {...rest}>
//     {children}{" "}
//   </Typography>
// );
// const Body2 = ({ children, ...rest }) => (
//   <Typography variant="body2" {...rest}>
//     {children}{" "}
//   </Typography>
// );

// export { H1, H2, H3, H4, H5, Body1, Body2 };

export const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: "h2",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        h5: "h5",
        h6: "h6",
        subtitle1: "h2",
        subtitle2: "h3",
        body1: "span",
        body2: "span",
      },
    },
  },
});
