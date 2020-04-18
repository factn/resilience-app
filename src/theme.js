import _ from "lodash";

export const color = {
  purple: "#150E60", //TODO remove this
  deepPurple: "#150E60",
  vibrantPurple: "#3739B5",
  secondaryBlue: "#B4B6F1",
  white: "#FFF",
  pink: "#ffefef",
  darkPink: "#DA0B46",
  black: "#090808",
  darkOrange: "#EC7016",
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
    body1: {
      color: color.deepPurple,
      fontFamily: "Open Sans, Ariomo, Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "22px",
    },
    body2: {
      color: color.deepPurple,
      fontFamily: "Open Sans, Ariomo, Arial, sans-serif",
      fontSize: "14px",
      lineHeight: "22px",
    },
    h1: {
      fontFamily: "Ariomo, Arial, sans-serif",
      fontWeight: "bold",
      fontSize: "36px",
      lineHeight: "40px",
      color: color.deepPurple,
    },
    h2: {
      fontFamily: "Ariomo, Arial, sans-serif",
      fontWeight: "bold",
      fontSize: "22px",
      lineHeight: "24px",
      color: color.deepPurple,
    },
    h3: {
      fontFamily: "Open Sans, Arial, sans-serif",
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "32px",
      textTransform: "capitalize",
      color: color.deepPurple,
    },
    h4: {
      fontFamily: "Ariomo, Arial, sans-serif",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "16px",
      textTransform: "uppercase",
      letterSpacing: "0.01em",
      color: color.deepPurple,
    },
    h5: {
      fontFamily: "Ariomo, Arial, sans-serif",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "20px",
      color: color.deepPurple,
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
