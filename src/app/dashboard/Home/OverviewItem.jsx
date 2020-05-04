import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";

import { Body1, H3 } from "../../component";
const useStyles = makeStyles(() => ({
  cardItemsContainer: {
    margin: "3vh",
    textAlign: "left",
  },
}));

const HomeItem = ({ data, icon, link, linkLabel, textColor, title }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.cardItemsContainer}>
      <Grid item xs={2}>
        {icon}
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <H3 style={{ color: textColor }}>{title}</H3>
          </Grid>
          <Grid item>
            <H3 style={{ color: textColor }}>{data.length}</H3>
          </Grid>
          <Grid item>
            <Body1>
              <Link to={link} style={{ color: "black" }}>
                {linkLabel}
              </Link>
            </Body1>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeItem;
