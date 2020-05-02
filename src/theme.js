import _ from "lodash";

export const color = {
  purple: "#150E60", //TODO remove unnecessary colors
  deepPurple: "#150E60",
  vibrantPurple: "#3739B5",
  secondaryBlue: "#B4B6F1",
  black: "#090808",
  white: "#FFF",
  pink: "#ffefef",
  blue: "#3739B5",
  red: "#DA0B46",
  darkOrange: "#EC7016",
  darkBlue: "#110079",
};

// utils to extract style
export const extractStyle = (props, path) => {
  const extract = _.get(props, path, {});
  const transform = _.reduce(
    extract,
    (result, value, key) => {
      return `${result} ${_.kebabCase(key)}: ${value};`;
    },
    ""
  );
  return transform;
};

export default {
  themeName: "world2",
  spacing: 12,
  color: color,
  palette: {
    default: {
      main: "#DFE3E8",
    },
    primary: {
      main: color.vibrantPurple,
    },
    secondary: {
      main: color.secondaryBlue,
    },
  },
  typography: {
    h1: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "bold",
      fontSize: "32px",
      lineHeight: "48px",
      color: color.blue,
    },
    h2: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "semi-bold",
      fontSize: "24px",
      lineHeight: "36px",
      color: color.blue,
    },
    h3: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "semi-bold",
      fontSize: "20px",
      lineHeight: "30px",
    },
    h4: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "semi-bold",
      fontSize: "16px",
      lineHeight: "24px",
      color: color.blue,
    },
    h5: {
      // still available as some components/pages depend on this
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "semi-bold",
      fontSize: "16px",
      lineHeight: "24px",
      color: color.blue,
    },
    body1: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "regular",
      fontSize: "16px",
      lineHeight: "24px",
      color: color.black,
    },
    body2: {
      // same as for h5
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "regular",
      fontSize: "16px",
      lineHeight: "24px",
      color: color.black,
    },
    button: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "24px",
      textTransfrom: "uppercase",
      color: color.black,
    },
    caption: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "regular",
      fontSize: "12px",
      lineHeight: "18px",
      color: color.black,
    },
    overline: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "regular",
      fontSize: "12px",
      lineHeight: "18px",
      textTransfrom: "uppercase",
      color: color.black,
    },
  },
  overrides: {
    MuiButtonGroup: {
      root: {
        color: color.deepPurple,
      },
    },
    MuiButton: {
      root: {
        textTransform: "capitalize",
      },
    },
  },
};
