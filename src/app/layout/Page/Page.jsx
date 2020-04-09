import React from "react";
import { Typography, Grid } from "@material-ui/core";

import Appbar from "../Appbar";
import { makeStyles } from "@material-ui/core/styles";
import { withLoading } from "../../HOC";

import { Container } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "white",
    flexDirection: "column",
    flexWrap: "nowrap",
    minHeight: "100%",
    padding: 0,
  },
}));

/**
 * Represents a Customised Page.
 * @param {string} appbar - The Title of the app bar.
 * @param {object} children - The content of the page.
 * @param {string} title - The Title of the page.
 * @param {number} maxWidth - The maximum width of the page.
 * @param {object} rest - Rest of the properties passed to the page..
 */
const Page = ({ appbar, children, title, maxWidth, ...rest }) => {
  const classes = useStyles();
  return (
    <Container maxWidth={maxWidth ? maxWidth : "sm"} className={classes.root}>
      <Grid container className={classes.root}>
        <Grid item>
          <Appbar>{appbar}</Appbar>
        </Grid>
        <Grid container item role="main" direction="column">
          {title && <Typography variant="h1">{title}</Typography>}
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default withLoading(Page);
