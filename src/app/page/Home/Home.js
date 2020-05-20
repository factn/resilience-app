import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Person from "@material-ui/icons/Person";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";

import HeaderImage1 from "../../../img/HeaderImage1.jpg";
import HeaderImage2 from "../../../img/HeaderImage2.jpg";
import ShopperImage1 from "../../../img/ShopperImage1.jpg";
import SignInHeader1 from "../../../img/SignInHeader1.jpg";
import SplashImage1 from "../../../img/SplashImage1.png";
import { Body1, Button, H1, H2, H3, H4, ContactComponent } from "../../component";
import { Page } from "../../layout";
import AuthenticatedHome from "./AuthenticatedHome";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { User, useOrganization } from "../../model";
import Mission from "../../model/Mission";
import { routes } from "../../routing";
import { useFirestoreConnect } from "react-redux-firebase";
import FoodBoxDeliveryIcon from "../../component/icons/FoodBoxDeliveryIcon";
import EventNoteIcon from "@material-ui/icons/EventNote";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";

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
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 0,
  },
  OrgLogo: {
    height: "150px",
    width: "150px",
    backgroundColor: "#F1F1F1",
    borderRadius: "50%",
    zIndex: 1,
  },
  OrgNameLabel: {
    color: theme.color.white,
    zIndex: 1,
    userSelect: "none",
  },
  TaglineLabel: {
    color: theme.color.white,
    fontWeight: 300,
    fontSize: "18px",
    zIndex: 1,
    userSelect: "none",
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
    height: "200px",
    maxHeight: "200px",
    backgroundSize: "125%",
    position: "relative",
  },
  GreetingCardHeaderLabel: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: "8px 16px",
    fontSize: "42px",
    fontWeight: 600,
    color: theme.color.black,
    zIndex: 1,
    userSelect: "none",
  },
  GreetingCardMessageLabel: {
    margin: "30px",
    lineHeight: "26px",
    fontSize: "18px",
  },
  GreetingCardActionButton: {
    margin: "0 auto 50px auto",
    padding: "10px 50px",
    height: "48px",
  },
  actionLabelIcon: {
    fill: "white",
    fontSize: "18px",
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
  ComingSoon: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginBottom: "20px",
  },
  ComingSoonText: {
    fontWeight: "200",
    color: "#B4B6F1",
    lineHeight: "1.5",
    occupancy: "75%",
  },
  SoonIcon: {
    paddingTop: "24px",
    width: "46px",
    height: "46px",
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
        component={Link}
        to={routes.donate}
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
        <Person data-testid="icon-contact" className={classes.ContactAdIcon} />
        <H3 data-testid="label-contact-mssg-1" className={classes.ContactAdLabel}>
          Any questions? Please contact us <ContactComponent prefix=" at " />.
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
  icon,
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
        {icon} {actionLabel}
      </Button>
    </Grid>
  );
};

const SignInHeaderComponent = ({ history }) => {
  const classes = useStyles();
  const org = useOrganization();
  return (
    <Grid container className={classes.SignInHeaderContainer}>
      <img src={org?.logoURL} className={classes.OrgLogo} alt="Faction Logo" />
      <H1 data-testid="label-org-name" className={classes.OrgNameLabel}>
        {org?.displayName}
      </H1>
      <H3 data-testid="label-org-tagline" className={classes.TaglineLabel}>
        {org?.tagline}
      </H3>
      <Button
        className={classes.SigninButton}
        onClick={() => history.push(routes.login)}
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
  const org = useOrganization();

  useFirestoreConnect(() => {
    if (!auth.uid) {
      return [];
    }
    const id = org.uid;
    return [
      Mission.fsAvailableUserMissions(id, auth.uid),
      Mission.fsAssignedUserMissions(id, auth.uid),
      { collection: "organizations", doc: id },
    ];
  });

  const classes = useStyles();
  useEffect(() => {
    User.createProfileIfNotExist(auth, profile);
  }, [auth, profile]);
  return (
    <Page isLoaded={isLoaded(auth)} LoadingComponent={LoadingComponent}>
      {isLoaded(auth) && !isEmpty(auth) ? (
        <AuthenticatedHome auth={auth} />
      ) : (
        <Grid container>
          <SignInHeaderComponent history={history} />
          <PoweredByComponent />
          <Grid container>
            <H4 className={classes.QuickInfoLabel}>{org?.quickInfo}</H4>
          </Grid>
          <GreetingCardComponent
            title="Need help?"
            message="Sign up to request a food box, small errand, or a pharmacy pickup. You'll be matched with a volunteer who will take care of you ASAP."
            actionLabel="Food Box Delivery"
            actionPress={() => history.push(routes.request.foodbox)}
            backgroundImage={`url(${HeaderImage1})`}
            backgroundPosition={`10% 55%`}
          />
          <Grid className={classes.ComingSoon} container>
            <H4>
              <i>Coming soon:</i>
            </H4>
            <H3 className={classes.ComingSoonText}>
              <EventNoteIcon className={classes.SoonIcon} /> General Errand
            </H3>
            <H3 className={classes.ComingSoonText}>
              <LocalPharmacyIcon className={classes.SoonIcon} /> Pharmacy Run
            </H3>
          </Grid>
          <GreetingCardComponent
            title="Want to help?"
            message="Sign up to join your local network helping neighbors through this crisis. Deliver food, medicine, and supplies to the most vulnerable."
            actionLabel="Volunteer"
            actionPress={() => history.push(routes.user.signup)}
            backgroundImage={`url(${HeaderImage2})`}
            backgroundPosition={`50% 10%`}
          />
          <DonateCardComponent />
          <ContactAdBanner />
        </Grid>
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
