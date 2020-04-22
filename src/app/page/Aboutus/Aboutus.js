import React from "react";
import { Box } from "@material-ui/core";
import { Page } from "../../layout";
import { Header, LogoImage, Body, LogoText, LogoBox, Link } from "./Aboutus.style";
import Logo from "../../../img/logo.svg";

const AboutPage = () => {
  function goTo() {
    window.location = "https://resilienceapp-theme.netlify.app/";
  }

  return (
    <Page>
      <Box p={3}>
        <Header>About Us</Header>
        <Body>
          The Resilience app was created to help people coordinate the distribution of food and aid.
          It’s a tool to manage the needs of the community and connect with volunteers who can help
          fulfill those needs.
        </Body>
      </Box>
      <Box p={3}>
        <LogoBox>
          <LogoImage src={Logo} />
          <LogoText>MutualAid.World</LogoText>
        </LogoBox>
        <Link>
          <u onClick={goTo}>Learn more</u>
        </Link>
      </Box>
    </Page>
  );
};

export default AboutPage;
