import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Snackbar from "../../component/Snackbars/Snackbar";
import useForm from "../../hooks/useForm";
import { User, Organization } from "../../model";
import { VolunteerStatus } from "../../model/schema";
import addressLookup from "../../utils/addressLookUp";
import CallToActionPage from "./CallToAction";
import ConnectSocialMediaPage from "./ConnectSocialMedia";
import PhoneAuthPage from "./PhoneAuth";
import SignupSuccessPage from "./SignupSuccess";
import UserProfilePage from "./UserProfile";
import { withRouter } from "react-router-dom";
import { routes } from "../../routing";

const Tabs = {
  GET_STARTED: "volunteer call to action to sign up",
  SIGNUP: "sign up with phone",
  CONNECT: "connect to social media",
  PROFILE: "update user profile",
  SUCCESS: "user are now a tentative volunteer",
};
/**
 * Top level component for Signup
 *
 */
function SignupScene(props) {
  const { handleChange, setValues, values } = useForm(User.defaultData);
  const [activeTab, setActiveTab] = useState(Tabs.GET_STARTED);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  function getPayload() {
    return {
      ...values,
      organizationUid: Organization.uid,
      isVolunteer: true,
      volunteerDetails: {
        availability: values.availability || "",
        hasTransportation: !!values.hasTransportation,
        status: VolunteerStatus.pending,
        privateNotes: "",
      },
    };
  }

  function handleSignupSuccess(user) {
    setValues({
      ...values,
      phoneNumber: user.phoneNumber,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
    updateUser();
    setActiveTab(Tabs.CONNECT);
    return false;
  }
  function handleConnectSuccess(user) {
    setValues({
      ...values,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
    updateUser();
    setActiveTab(Tabs.PROFILE);
    return false;
  }
  async function updateUser() {
    const payload = getPayload();

    let location = payload?.location;
    try {
      if (location.address) {
        const data = await addressLookup(location.address);
        location = { ...location, lat: data.lat, lng: data.long };
      }
    } catch (error) {
      console.log("ERROR WHEN GETTiNG LOCATION", error);
      console.log("address: ", location.address);
    }

    /*
    try {
      setLoading(true);
      User.update(payload.id, payload).then(() => {
        setLoading(false);
        setActiveTab(Tabs.SUCCESS);
      });
    } catch (error) {
      setLoading(false);
      setErrorSnackbarMessage(error);
      setActiveTab(Tabs.SUCCESS);
    }
    */
  }

  let Active = null;
  switch (activeTab) {
    case Tabs.GET_STARTED:
      Active = (
        <CallToActionPage
          onClick={() => {
            setActiveTab(Tabs.SIGNUP);
          }}
        />
      );

      break;
    case Tabs.SIGNUP:
      Active = <PhoneAuthPage onSignupSuccess={handleSignupSuccess} />;
      break;
    case Tabs.CONNECT:
      Active = (
        <ConnectSocialMediaPage
          onConnectSuccess={handleConnectSuccess}
          onSkip={() => {
            setActiveTab(Tabs.PROFILE);
          }}
        />
      );
      break;
    case Tabs.PROFILE:
      Active = (
        <UserProfilePage handleChange={handleChange} onSubmit={updateUser} values={values} />
      );
      break;
    case Tabs.SUCCESS:
    default:
      Active = <SignupSuccessPage onClick={() => props.history.push(routes.missions.main)} />;
      break;
  }

  if (loading) return <CircularProgress />;

  const showSuccessSnackbar = !errorSnackbarMessage && activeTab === 4;
  const snackbarOpen = errorSnackbarMessage || showSuccessSnackbar;
  const snackbarType = showSuccessSnackbar ? "success" : "error";
  const snackbarMessage = showSuccessSnackbar
    ? "Your account request has been successfully submitted and is pending approval"
    : `Error while submitting request. Please try again. ${errorSnackbarMessage}`;
  return (
    <>
      {Active}
      <Snackbar
        open={snackbarOpen}
        handleClose={() => setErrorSnackbarMessage(false)}
        type={snackbarType}
        message={snackbarMessage}
        autoHideDuration={4000}
      />
    </>
  );
}

SignupScene.propTypes = {
  /**
   * From react-router
   */
  history: PropTypes.object,
};

export default withRouter(SignupScene);
