import PropTypes from "prop-types";
import React from "react";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { Page } from "../../layout";
import { Button, H1, H3 } from "../../component";
import { Card, Grid, Box } from "@material-ui/core";
import {
  useStyles,
  OrgLogo,
  TransparentButton,
  Text,
  Heading,
  SubHeading,
  Link,
} from "./Home.style";
import { PublicAppbar, DefaultAppbar } from "../../layout/Appbar";
import HomeImage5 from "../../../img/HomeImage5.svg";
import SplashImage1 from "../../../img/SplashImage1.png";
import Emoticon from "../../../img/ic_smiley_emoticon.svg";
import PhoneIcon from "../../../img/ic_phone.svg";
import VolunteerHome from "./VolunteerHome";

const LoadingComponent = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.LoadingScreenContainer}>
      <img src={SplashImage1} className={classes.SplashImage} alt="" />
      <H1 className={classes.SplashTitle}>Resilience</H1>
      <H3 className={classes.SplashSub}>Neighbors helping neighbors</H3>
    </Grid>
  );
};

/**
 * Component for Home Page
 *
 * @component
 */
const HomePage = ({ auth, history }) => {
  const classes = useStyles();
  const isEmpty = useSelector((state) => state.firebase.auth.isEmpty);
  const isLoaded = useSelector((state) => state.firebase.auth.isLoaded);

  return (
    <Page
      isLoaded={isLoaded}
      LoadingComponent={LoadingComponent}
      Appbar={isEmpty ? PublicAppbar : DefaultAppbar}
    >
      {isEmpty ? (
        <>
          <Box className={classes.OrgBlock} p={1}>
            <Box>
              <OrgLogo title="OrganisationLogo" role="img" />
              <Heading color="white">Organization Name</Heading>
              <SubHeading color="white">Neighbors helping neighbors</SubHeading>
              <TransparentButton
                className={classes.SigninButton}
                onClick={() => history.push("/login")}
                data-testid="btn-login"
              >
                Sign in
              </TransparentButton>
            </Box>
          </Box>
          <Box className={classes.BgBlack} p={1}>
            <Text color="white">Powered by</Text>&nbsp;
            <Text color="white" bold>
              Resilience
            </Text>
          </Box>
          <Box p={2} textAlign="left">
            <Text>
              We're a grassroots team in Studio City, CA getting fresh farm produce to our neighbors
              in need.
            </Text>
          </Box>
          <Box className={classes.NeedHelpSection}>
            <Box className={classes.WhiteBgText}>
              <Heading>Need Help?</Heading>
            </Box>
          </Box>
          <Box p={2} textAlign="left">
            <Text>
              Sign up to request a food box, small errand, or a pharmacy pickup. You'll be matched
              with a volunteer who will take care of you ASAP.
            </Text>
            <Box textAlign="center" pt={2}>
              <Button
                onClick={() => history.push("/request")}
                data-testid="btn-request"
                className={classes.SignupButton}
              >
                I Need Help
              </Button>
            </Box>
          </Box>
          <Box mb={2}>
            <img src={HomeImage5} alt="" />
          </Box>
          <Box className={classes.WantToHelpSection}>
            <Box className={classes.WhiteBgText}>
              <Heading>Want to help?</Heading>
            </Box>
          </Box>
          <Box p={2} textAlign="left">
            <Text>
              Sign up to join your local network helping neighbors through this crisis. Deliver
              food, medicine, and supplies to the most vulnerable.
            </Text>
            <Box textAlign="center" pt={2}>
              <Button
                onClick={() => history.push("/signup")}
                data-testid="btn-signup"
                className={classes.SignupButton}
              >
                Volunteer
              </Button>
            </Box>
          </Box>
          <Box textAlign="left" p={2} className={classes.PurpleBg}>
            <Box>
              <Heading color="white" style={{ display: "inline", verticalAlign: "middle" }}>
                Donate
              </Heading>
              <img src={Emoticon} className={classes.Emoticon} alt="smiley"></img>
            </Box>
            <Box my={1}>
              <Text color="white">
                Many families can't afford fresh food. Please help sponsor food boxes for those in
                need.
              </Text>
            </Box>
            <Box textAlign="center">
              <Button
                onClick={() => history.push("/signup")}
                data-testid="btn-donate-funds"
                className={classes.SignupButton}
                color="secondary"
              >
                Donate Funds
              </Button>
            </Box>
          </Box>
          <Box className={classes.RequestByPhoneBg}>
            <Card className={classes.PhoneCard}>
              <img src={PhoneIcon} alt="call"></img>
              <Text>To request food by phone, call</Text>&nbsp;
              <Link href="tel:+555-555-5555">555-555-5555.</Link>
            </Card>
          </Box>
        </>
      ) : (
        <VolunteerHome currentUser={auth} />
      )}
    </Page>
  );
};

HomePage.propTypes = {
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export default compose(connect(mapStateToProps))(withRouter(HomePage));
