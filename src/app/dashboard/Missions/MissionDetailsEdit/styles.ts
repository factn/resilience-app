import { makeStyles } from "@material-ui/core/styles";

// sometime the override classes come after the actuall class, so
// we actually have to write !important to overwrite that.
const useStyles = makeStyles((theme: any) => ({
  expansion: {
    margin: "0px !important",
    border: `1px solid ${theme.color.blueSecondary}`,
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  },
  expanded: {
    backgroundColor: theme.color.lilacLight,
  },
  details: {
    padding: 0,
  },
  summary: {
    height: "3rem",
    padding: "0px 14px",
  },
  summaryExpanded: {
    minHeight: "0px",
  },
}));

export default useStyles;
