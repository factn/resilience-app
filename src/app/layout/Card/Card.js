import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));
/**
 * Represents a Customised Card.
 * @param {object} children - The content of the component.
 * @param {object} props - The props passed to the component from Parent.
 */
const CustomizedCard = ({ children, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root} elevation={0} {...props}>
      {children}
    </Card>
  );
};

export default CustomizedCard;
