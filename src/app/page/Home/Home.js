import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { useSelector, connect } from "react-redux";
import { compose } from "redux";

import { Page, Card } from "../../layout";
import { Button, Body1, H1, H2, H3 } from "../../component";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { StyledHomeButton } from "./Home.style";
import HomeImage1 from "../../../img/HomeImage1.png";
import HomeImage2 from "../../../img/HomeImage2.png";
import SplashImage1 from "../../../img/SplashImage1.png";

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
    width: "200px",
    height: "48px",
    margin: "12px auto",
  },
  Paragraph: {
    paddingBottom: "12px",
    textAlign: "left",
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
const HomePage = ({ history, ...rest }) => {
  const classes = useStyles();
  const isEmpty = useSelector((state) => state.firebase.auth.isEmpty);
  const isLoaded = useSelector((state) => state.firebase.auth.isLoaded);

  return (
    <Page isLoaded={isLoaded} LoadingComponent={LoadingComponent}>
      {isEmpty ? (
        <Grid container>
          <Grid container>
            <img src={HomeImage1} className={classes.HomeImage} alt="" />
          </Grid>
          <Grid container>
            <Button
              className={classes.SigninButton}
              onClick={() => history.push("/login")}
              data-testid="btn-login"
            >
              Signin
            </Button>
          </Grid>
          <Grid container justify="center">
            <Body1>Dont have an account yet?</Body1>
          </Grid>
          <Grid container>
            <Button
              variant="outlined"
              className={classes.SignupButton}
              onClick={() => history.push("/signup")}
              data-testid="btn-signup"
            >
              Sign Up Here
            </Button>
          </Grid>
          <Card>
            <Grid container>
              <H2 className={classes.Paragraph}>How it works</H2>
              <Grid container>
                <Body1>Need help?</Body1>
                <Body1 className={classes.Paragraph}>
                  Sign up to make a request for a food box, small errand, or a pharmacy pickup. Your
                  ask goes right to the local coordinator, and is matched with a volunteer who will
                  take care of your need ASAP.
                </Body1>
                <Body1>Want to help?</Body1>
                <Body1 className={classes.Paragraph}>
                  Sign up to join your local network of volunteers helping their neighbors through
                  this crisis. Deliver food, medicine, and other supplies to the most vulnerable.
                </Body1>
              </Grid>
              <Grid container>
                <img src={HomeImage2} className={classes.HomeImage} alt="" />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ) : (
        <>
          <StyledHomeButton
            onClick={() => history.push("/request/create")}
            text="Request Help"
            color="secondary"
            data-testid="btn-request-help"
          />
        </>
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
