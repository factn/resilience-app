import React from "react";
import { Box } from "@material-ui/core";
import { Page } from "../../layout";
import { HomeAppbar } from "../../layout/Appbar";
import HomeImage1 from "../../../img/HomeImage1.png";
import { H1, Body1 } from "../../component";
import { ReactComponent as Logo } from "../../../img/logo.svg";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  MainImage: {
    height: "400px",
    width: "100%"
  },
  Black: {
    color: theme.color.black,
  },
  Highlight: {
    color: theme.color.black,
    textDecoration: "underline",
    fontWeight: "bold"
  }
}));

const AboutPage = () => {
  const classes = useStyles();
  return (
    <Page Appbar={HomeAppbar}>
      <Box>
        <img src={HomeImage1} alt="" className={classes.MainImage} />
      </Box>
      <Box p={3}>
        <H1 className={classes.Black}>About us</H1>
        <Box py={2}>
          <Body1 className={classes.Black}>
            The Resilience app was created to help people coordinate the distribution of food and aid. It’s a tool to manage the needs of the community and connect with volunteers who can help fulfill those needs.
          </Body1>
        </Box>
      </Box>
      <Box p={3} display="flex">
        <Logo title="MutualAidLogo" role="img" />
        <H1>MutualAid.World</H1>
      </Box>
      <Box p={3}>
        <Body1 className={classes.Highlight}>Learn more</Body1>
      </Box>
    </Page>
  );
};

export default AboutPage;
