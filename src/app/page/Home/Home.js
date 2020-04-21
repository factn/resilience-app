import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { useSelector, connect } from "react-redux";
import { compose } from "redux";

import { Page } from "../../layout";
import { Button, H1, H3 } from "../../component";
import { Card, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { OrgLogo, TransparentButton, Text, Heading, SubHeading, PhoneNo } from "./Home.style";
import { PublicAppbar, DefaultAppbar } from "../../layout/Appbar";
import HomeImage2 from "../../../img/HomeImage2.png";
import HomeImage3 from "../../../img/HomeImage3.png";
import HomeImage4 from "../../../img/HomeImage4.png";
import HomeImage5 from "../../../img/HomeImage5.svg";
import SplashImage1 from "../../../img/SplashImage1.png";
import Emoticon from "../../../img/ic_smiley_emoticon.svg";
import PhoneIcon from "../../../img/ic_phone.svg";

import VolunteerHome from "./VolunteerHome";

const useStyles = makeStyles((theme) => ({
  HomeImage: {
    width: "100%",
  },
  SigninButton: {
    width: "200px",
    height: "48px",
    margin: "24px auto",
  },
  SignupButton: {
    width: "250px",
    height: "48px",
    margin: "12px auto",
  },
  LoadingScreenContainer: {
    width: "inherit",
    overflowX: "hidden",
  },
  SplashImage: {
    height: "calc(100vh - 98px)",
  },
  SplashTitle: {
    position: "absolute",
    top: "30vh",
    left: "0",
    right: "0",
    margin: "auto",
    color: "white",
  },
  SplashSub: {
    position: "absolute",
    top: "40vh",
    left: "0",
    right: "0",
    margin: "auto",
    color: "white",
    fontSize: "24px",
  },
  OrgBackgroundImg: {
    backgroundImage: `url(${SplashImage1})`,
    backgroundSize: "100% 100%",
    height: "450px"
  },
  OrgDetails: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  NeedHelpSection: {
    backgroundImage: `url(${HomeImage3})`,
    backgroundSize: "100% 100%",
    height: "240px",
    display: "flex"
  },
  WhiteBgText: {
    background: "rgb(255, 255, 255, 0.8)",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    margin: "auto"
  },
  BgBlack: {
    backgroundColor: "black"
  },
  WhiteBgTxt: {
    padding: "10px",
    background: "rgb(255, 255, 255, 0.8)"
  },
  WantToHelpSection: {
    backgroundImage: `url(${HomeImage4})`,
    backgroundSize: "100% 100%",
    height: "240px",
    display: "flex"
  },
  Emoticon: {
    height: "36px",
    width: "36px",
    marginLeft: theme.spacing(1),
    verticalAlign: "middle"
  },
  PurpleBg: {
    backgroundColor: theme.color.deepPurple
  },
  RequestByPhoneBg: {
    backgroundImage: `url(${HomeImage2})`,
    backgroundSize: "100% 100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "350px"
  },
  PhoneCard: {
    padding: theme.spacing(2),
    overflow: "visible",
    position: "absolute",
    "& > img": {
      position: "absolute",
      top: "0px",
      left: "0px",
      transform: "translate(-50%, -50%)"
    }
  }
}));

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
const HomePage = ({ auth, history, ...rest }) => {
  const classes = useStyles();
  const isEmpty = useSelector((state) => state.firebase.auth.isEmpty);
  const isLoaded = useSelector((state) => state.firebase.auth.isLoaded);

  return (
    <Page isLoaded={isLoaded} LoadingComponent={LoadingComponent} Appbar={isEmpty ? PublicAppbar : DefaultAppbar}>
      {isEmpty ? (
        <>
          <Box className={classes.OrgBackgroundImg} p={2}>
            <OrgLogo title="OrganisationLogo" role="img" />
            <Heading color="white" className={classes.OrgDetails}>Organization Name</Heading>
            <SubHeading color="white" className={`${classes.OrgDetails} ${classes.White}`}>Neighbors helping neighbors</SubHeading>
            <TransparentButton
              className={classes.SigninButton}
              onClick={() => history.push("/login")}
              data-testid="btn-login"
            >
              Sign in
            </TransparentButton>
          </Box>
          <Box className={classes.BgBlack} p={1}>
            <Text color="white">Powered by</Text>&nbsp;
            <Text color="white" bold>Resilience</Text>
          </Box>
          <Box p={2} textAlign="left">
            <Text>We're a grassroots team in Studio City, CA getting fresh farm produce to our neighbors in need.</Text>
          </Box>
          <Box className={classes.NeedHelpSection} px={8} py={4}>
            <Box className={classes.WhiteBgText}>
              <Heading>Need Help?</Heading>
            </Box>
          </Box>
          <Box p={2} textAlign="left">
            <Text>
              Sign up to request a food box, small errand, or a pharmacy pickup. You'll be matched with a volunteer who will take care of you ASAP.
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
          <Box className={classes.WantToHelpSection} px={8} py={4}>
            <Box className={classes.WhiteBgText}>
              <Heading>Want to help?</Heading>
            </Box>
          </Box>
          <Box p={2} textAlign="left">
            <Text>
              Sign up to join your local network helping neighbors through this crisis. Deliver food, medicine, and supplies to the most vulnerable.
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
          <Box className={classes.PurpleBg} textAlign="left" p={2}>
            <Box>
              <Heading color="white" style={{ display: "inline", verticalAlign: "middle" }}>Donate</Heading>
              <img src={Emoticon} className={classes.Emoticon} alt="smiley"></img>
            </Box>
            <Box my={1}>
              <Text color="white">Many families can't afford fresh food. Please help sponsor food boxes for those in need.</Text>
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
              <Text>To request food by phone, call</Text>&nbsp;<PhoneNo>555-555-5555.</PhoneNo>
            </Card>
          </Box>
        </>
      ) : (
          <VolunteerHome currentUser={auth} />
        )
      }
    </Page >
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
