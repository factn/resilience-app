const color = {
  purple: "#150E60",
  white: "#FFF",
  pink: "#ffefef",
};

export default {
  themeName: "world2",
  spacing: 12,
  color: color,
  palette: {
    primary: {
      main: color.purple,
    },
  },
  typography: {
    fontFamily: "Arimo, Roboto, Arial, sans-serif",
    h2: {
      fontStyle: "Bold",
      fontSize: "22px",
      lineHeight: "24px",
      color: color.purple,
    },
    h3: {
      fontSize: "22px",
      color: color.purple,
    },
    h5: {
      fontStyle: "Bold",
      fontSize: "16px",
      lineHeight: "20px",
      color: color.purple,
    },
    p: {
      fontFamily: "Open Sans",
      fontSize: "18px",
      lineHeight: "24px",
      color: color.purple,
    },
  },
};
