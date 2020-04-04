import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { PageContainer } from "./Page.style";
import Appbar from "../Appbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundColor: "white",
    flexDirection: "column",
  },
}));

const Page = ({ appbar, children, title, maxWidth, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
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

export default Page;
