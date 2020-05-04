import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import PhoneIcon from "@material-ui/icons/Phone";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import HeaderImage1 from "../../../img/HeaderImage1.webp";
import HeaderImage2 from "../../../img/HeaderImage2.webp";
import ShopperImage1 from "../../../img/ShopperImage1.webp";
import SignInHeader1 from "../../../img/SignInHeader1.webp";
import SplashImage1 from "../../../img/SplashImage1.png";
import { Body1, Button, H1, H2, H3, H4 } from "../../component";
import { Page } from "../../layout";
import VolunteerHome from "./VolunteerHome";
import { isEmpty, isLoaded } from "react-redux-firebase";
import User from "../../model/User";

const useStyles = makeStyles((theme) => ({
  HomeImage: {
    width: "100%",
  },
  SigninButton: {
    width: "200px",
    height: "48px",
    margin: "24px auto",
    backgroundColor: "transparent",
    border: `2px solid ${theme.color.white}`,
    borderRadius: "4px",
    zIndex: 1,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
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
  SignInHeaderContainer: {
    height: "380px",
    position: "relative",
    overflow: "hidden",
    backgroundImage: `url(${SignInHeader1})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    padding: "30px",
    zIndex: 1,
  },
  SignInHeaderOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
  },
  FactnLogo: {
    height: "100px",
    width: "100px",
    backgroundColor: "#F1F1F1",
    borderRadius: "50%",
    zIndex: 1,
  },
  OrgNameLabel: {
    color: theme.color.white,
    zIndex: 1,
  },
  TaglineLabel: {
    color: theme.color.white,
    fontWeight: 300,
    fontSize: "18px",
    zIndex: 1,
  },
  PoweredByContainer: {
    height: "48px",
    backgroundColor: theme.color.black,
  },
  PoweredByLabel: {
    color: theme.color.white,
    "&:first-child": {
      fontWeight: 300,
      paddingRight: "6px",
    },
  },
  QuickInfoLabel: {
    color: theme.color.black,
    fontWeight: 400,
    fontSize: "18px",
    margin: "30px",
    textJustify: "justify",
  },
  GreetingCardContainer: {},
  GreetingCardOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 0,
  },
  GreetingCardHeaderContainer: {
    height: "160px",
    maxHeight: "160px",
    backgroundSize: "125%",
    position: "relative",
  },
  GreetingCardHeaderLabel: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "8px 16px",
    fontSize: "30px",
    fontWeight: 400,
    color: theme.color.black,
    zIndex: 1,
  },
  GreetingCardMessageLabel: {
    margin: "30px",
    lineHeight: "26px",
    fontSize: "18px",
  },
  GreetingCardActionButton: {
    margin: "0 30px 16px 30px",
    height: "48px",
  },
  DonateCardContainer: {
    backgroundColor: "#150E60",
    padding: "30px",
  },
  DonateCardTitle: {
    fontWeight: 400,
    color: theme.color.white,
    marginRight: "8px",
  },
  DonateCardIcon: {
    width: "40px",
    height: "40px",
    color: theme.color.white,
  },
  DonateCardMessage: {
    fontSize: "18px",
    color: theme.color.white,
    marginTop: "17px",
  },
  DonateCardAction: {
    backgroundColor: theme.color.secondaryBlue,
    marginTop: "32px",
    height: "48px",
    color: theme.color.black,
  },
  ContactAdContainer: {
    maxHeight: "360px",
    height: "360px",
    backgroundImage: `url(${ShopperImage1})`,
    backgroundSize: "cover",
    padding: "30px",
  },
  ContactAdInfo: {
    backgroundColor: theme.color.white,
    padding: "16px",
    width: "100%",
    borderRadius: "5px",
    boxShadow:
      "0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.14)",
    position: "relative",
  },
  ContactAdLabel: {
    color: theme.color.black,
    fontWeight: 300,
    fontSize: "18px",
    textAlign: "left",
  },
  ContactAdIcon: {
    width: "40px",
    height: "40px",
    position: "absolute",
    top: "-18px",
    left: "-18px",
    padding: "8px",
    backgroundColor: theme.color.vibrantPurple,
    borderRadius: "50%",
    fontSize: "10px",
    color: theme.color.white,
  },
  ContactAdLink: {
    color: theme.color.darkBlue,
    fontWeight: 500,
  },
}));

const LoadingComponent = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.LoadingScreenContainer}>
      <img src={SplashImage1} className={classes.SplashImage} alt="" />
      <H1 className={classes.SplashTitle}>Resilience</H1>
      <H3 className={classes.SplashSub}>Neighbors helping neighbors</H3>
    </Grid>
  );
};

const DonateCardComponent = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.DonateCardContainer}>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <H1 data-testid="label-donate-title" className={classes.DonateCardTitle}>
          Donate
        </H1>
        <InsertEmoticonIcon data-testid="icon-donate" className={classes.DonateCardIcon} />
      </Grid>
      <Body1 data-testid="label-donate-mssg" className={classes.DonateCardMessage}>
        Many families can't afford fresh food. Please help sponsor food boxes for those in need.
      </Body1>
      <Button
        data-testid="btn-donate-action"
        className={classes.DonateCardAction}
        onClick={() => null}
      >
        Donate Funds
      </Button>
    </Grid>
  );
};

const ContactAdBanner = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.ContactAdContainer}
    >
      <Grid className={classes.ContactAdInfo}>
        <PhoneIcon data-testid="icon-contact" className={classes.ContactAdIcon} />
        <H3 data-testid="label-contact-mssg-1" className={classes.ContactAdLabel}>
          To request food by phone,
        </H3>
        <H3 data-testid="label-contact-mssg-2" className={classes.ContactAdLabel}>
          call {/* TODO: Turn it back to Link when correct phone number is populated */}
          <span className={classes.ContactAdLink}>555-555-555</span>
        </H3>
      </Grid>
    </Grid>
  );
};

const PoweredByComponent = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.PoweredByContainer}
    >
      <H4 data-testid="label-powered-by" className={classes.PoweredByLabel}>
        Powered by
      </H4>
      <H4 data-testid="label-powered-by-name" className={classes.PoweredByLabel}>
        <b>Resilience</b>
      </H4>
    </Grid>
  );
};

const GreetingCardComponent = ({
  actions = [],
  backgroundImage,
  backgroundPosition,
  message,
  title,
  actionLabel,
  actionPress,
}) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.GreetingCardContainer}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.GreetingCardHeaderContainer}
        style={{ backgroundImage, backgroundPosition }}
      >
        <H2 data-testid="label-greeting-title" className={classes.GreetingCardHeaderLabel}>
          {title}
        </H2>
        <div data-testid="label-greeting-overlay" className={classes.GreetingCardOverlay} />
      </Grid>
      <Body1 data-testid="label-greeting-mssg" className={classes.GreetingCardMessageLabel}>
        {message}
      </Body1>
      <Button
        className={classes.GreetingCardActionButton}
        onClick={actionPress}
        data-testid="btn-greeting-action"
      >
        {actionLabel}
      </Button>
    </Grid>
  );
};

const SignInHeaderComponent = ({ history }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.SignInHeaderContainer}>
      <img
        src="https://avatars2.githubusercontent.com/u/46978689?s=200&v=4"
        className={classes.FactnLogo}
        alt="Faction Logo"
      />
      <H1 data-testid="label-org-name" className={classes.OrgNameLabel}>
        Organisation Name
      </H1>
      <H3 data-testid="label-org-tagline" className={classes.TaglineLabel}>
        Neighbors helping neighbors (optional org tagline)
      </H3>
      <Button
        className={classes.SigninButton}
        onClick={() => history.push("/login")}
        data-testid="btn-login"
      >
        Sign In
      </Button>
      <div className={classes.SignInHeaderOverlay} />
    </Grid>
  );
};

/**
 * Component for Home Page
 *
 * @component
 */
const HomePage = ({ auth, history, profile }) => {
  const classes = useStyles();
  /**
   * In case an user have logged in but his user profile is empty
   * This can only happens if user decided to login without
   * going the proper signup channel as firebase allow singup
   * by login as a default
   */
  if (isLoaded(auth) && !isEmpty(auth) && !isEmpty(auth) && isLoaded(profile)) {
    User.createProfile(auth.uid, auth);
  }

  return (
    <Page isLoaded={isLoaded(auth)} LoadingComponent={LoadingComponent}>
      {isEmpty(auth) ? (
        <Grid container>
          <SignInHeaderComponent history={history} />
          <PoweredByComponent />
          <Grid container>
            <H4 className={classes.QuickInfoLabel}>
              We're a grassroots team in Studio City, CA getting fresh farm produce to our neighbors
              in need.
            </H4>
          </Grid>
          <GreetingCardComponent
            title="Need help?"
            message="Sign up to request a food box, small errand, or a pharmacy pickup. You'll be matched with a volunteer who will take care of you ASAP."
            actionLabel="I Need Help"
            actionPress={() => history.push("/request")}
            backgroundImage={`url(${HeaderImage1})`}
            backgroundPosition={`10% 55%`}
          />
          <GreetingCardComponent
            title="Want to help?"
            message="Sign up to join your local network helping neighbors through this crisis. Deliver food, medicine, and supplies to the most vulnerable."
            actionLabel="Volunteer"
            actionPress={() => history.push("/signup")}
            backgroundImage={`url(${HeaderImage2})`}
            backgroundPosition={`50% 10%`}
          />
          <DonateCardComponent />
          <ContactAdBanner />
        </Grid>
      ) : (
        <>
          <VolunteerHome currentUser={auth} />
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
    profile: state.firebase.profile,
  };
};
export default compose(connect(mapStateToProps))(withRouter(HomePage));
