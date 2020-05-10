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
  successGreen: "#66D85D",
  green: "#024b30",
  darkOrange: "#EC7016",
  darkBlue: "#110079",
  lightgrey: "#F2F2F2",
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
      light: color.secondaryBlue,
      main: color.vibrantPurple,
    },
    secondary: {
      main: color.secondaryBlue,
    },
    success: {
      main: color.successGreen,
    },
  },
  typography: {
    h1: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: "bold",
      fontSize: "32px",
      lineHeight: "48px",
    },
    h2: {
      fontWeight: "semi-bold",
      fontSize: "24px",
      lineHeight: "36px",
    },
    h3: {
      fontWeight: "semi-bold",
      fontSize: "20px",
      lineHeight: "30px",
    },
    h4: {
      fontWeight: "semi-bold",
      fontSize: "16px",
      lineHeight: "24px",
    },
    h5: {
      // still available as some components/pages depend on this
      fontWeight: "semi-bold",
      fontSize: "16px",
      lineHeight: "24px",
    },
    body1: {
      fontWeight: "regular",
      fontSize: "16px",
      lineHeight: "24px",
    },
    body2: {
      // same as for h5
      fontWeight: "regular",
      fontSize: "14px",
      lineHeight: "24px",
    },
    button: {
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "24px",
      textTransfrom: "uppercase",
    },
    caption: {
      fontWeight: "regular",
      fontSize: "12px",
      lineHeight: "18px",
    },
    overline: {
      fontWeight: "regular",
      fontSize: "12px",
      lineHeight: "18px",
      textTransfrom: "uppercase",
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
