import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  close: {
    flexDirection: "row-reverse",
  },
  closeIcon: {
    color: theme.color.white,
    fontSize: "3rem",
  },
  drawer: {
    backgroundColor: theme.color.darkBlue,
    height: "100%",
  },
  menu: {
    flexGrow: 1,
    width: "315px",
  },
  menuFooter: {
    flexGrow: 0,
  },
  fullList: {
    width: "auto",
  },
  link: {
    fontWeight: "bold",
    textDecoration: "none",
    textTransform: "uppercase",
    display: "inline",
    color: theme.color.white,
  },
  root: {
    width: "100%",
    height: "100%",
  },
  label: {
    width: "auto",
    position: "absolute",
    left: "12.5%",
    right: "12.5%",
    top: "25%",
    bottom: "25%",
    color: "#150E60",
  },
  colorIcon: {
    color: theme.color.white,
  },
  bottomBar: {
    backgroundColor: theme.color.black,
    display: "block",
    textAlign: "center",
    paddingBottom: "0.5rem",
    paddingTop: "0.5rem",
  },
  poweredBy: {
    color: theme.color.white,
    textDecoration: "none",
  },
  loading: {
    width: "100%",
  },
}));
