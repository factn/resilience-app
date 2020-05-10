import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";

import AboutImage1 from "../../../img/AboutImage1.webp";
import { ReactComponent as Logo } from "../../../img/logo.svg";
import { Body1, H1, H4 } from "../../component";
import { Page } from "../../layout";
import { routes } from "../../routing";

const useStyles = makeStyles((theme) => ({
  AboutUsContainer: {
    padding: "30px",
  },
  HeaderContainer: {
    height: "210px",
    backgroundImage: `url(${AboutImage1})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  TitleLabel: {
    color: theme.color.black,
    fontSize: "36px",
  },
  ContentLabel: {
    fontSize: "18px",
    textAlign: "left",
    marginTop: "24px",
    fontWeight: 300,
  },
  MutualAidWorldLogo: {
    padding: "16px 0",
  },
  MutualAidLogo: {
    width: "60px",
  },
  MutualAidLogoLabel: {
    fontSize: "24px",
    color: theme.color.darkBlue,
  },
  LearnMoreLinkLabel: {
    color: theme.color.black,
    fontWeight: 400,
    fontSize: "20px",
  },
}));

const AboutPage = () => {
  const classes = useStyles();
  return (
    <Page>
      <Grid container className={classes.HeaderContainer} />
      <Grid container className={classes.AboutUsContainer}>
        <H1 className={classes.TitleLabel}>About Us</H1>
        <Body1 className={classes.ContentLabel}>
          The Resilience app was created to help people coordinate the distribution of food and aid.
          It’s a tool to manage the needs of the community and connect with volunteers who can help
          fulfill those needs.
        </Body1>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classes.MutualAidWorldLogo}
        >
          <Logo className={classes.MutualAidLogo} title="MutualAidLogo" role="img" />
          <H1 className={classes.MutualAidLogoLabel}>MutualAid.World</H1>
        </Grid>
        <Grid>
          <Link to={routes.home}>
            <H4 className={classes.LearnMoreLinkLabel}>Learn more</H4>
          </Link>
        </Grid>
      </Grid>
    </Page>
  );
};

export default AboutPage;
