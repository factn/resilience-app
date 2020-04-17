import React from "react";
import { H3, Body1 } from "../../component";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  cardItemsContainer: {
    margin: "3vh",
    textAlign: "left",
  },
}));

const HomeItem = ({ icon, title, nbr, link, linkLabel, textColor }) => {
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
            <H3 style={{ color: textColor }}>{nbr}</H3>
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
