import PropTypes from "prop-types";
import React, { useContext, useState } from "react";

import Snackbar from "../../component/Snackbars/Snackbar";
import useForm from "../../hooks/useForm";
import { User, useOrganization } from "../../model";
import { VolunteerStatus } from "../../model/schema";
import addressLookup from "../../utils/addressLookUp";
import CallToActionPage from "./CallToAction";
import ConnectSocialMediaPage from "./ConnectSocialMedia";
import PhoneAuthPage from "./PhoneAuth";
import SignupSuccessPage from "./SignupSuccess";
import UserProfilePage from "./UserProfile";
import { withRouter } from "react-router-dom";
import { routes } from "../../routing";
import { SnackbarContext } from "../../component/Snackbars/Context";

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
  const snackbarContext = useContext(SnackbarContext);
  const org = useOrganization();

  function getPayload() {
    return {
      ...values,
      organizationUid: org.uid,
      isVolunteer: true,
      volunteerDetails: {
        availability: values.availability || "",
        hasTransportation: !!values.hasTransportation,
        status: VolunteerStatus.pending,
        privateNotes: "",
      },
    };
  }

  async function handleSignupSuccess(user) {
    let data = {
      ...getPayload(),
      phoneNumber: user.phoneNumber,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    };
    await updateUser(data, () => setActiveTab(Tabs.CONNECT));
  }

  async function handleConnectSuccess(user) {
    let data = {
      ...getPayload(),
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    };
    await updateUser(data, () => setActiveTab(Tabs.PROFILE));
  }

  async function handleProfileUpdate() {
    await updateUser({ ...getPayload() }, () => {
      setActiveTab(Tabs.SUCCESS);
      snackbarContext.show({
        message: "Congratulations, your volunteer account has been created!",
        type: "success",
      });
    });
  }

  async function updateUser(payload, callback) {
    try {
      await User.update(payload.uid, payload);
      setValues({ ...payload });
      callback();
    } catch (error) {
      snackbarContext.show({
        message: `Error while submitting request. Please try again: ${error.message}`,
        type: "error",
      });
      setValues({ ...payload });
    }
  }

  let Active;
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
        <UserProfilePage
          handleChange={handleChange}
          onSubmit={handleProfileUpdate}
          values={values}
        />
      );
      break;
    case Tabs.SUCCESS:
    default:
      Active = <SignupSuccessPage handleButtonClick={() => props.history.push(routes.home)} />;
      break;
  }

  return <>{Active}</>;
}

SignupScene.propTypes = {
  /**
   * From react-router
   */
  history: PropTypes.object,
};

export default withRouter(SignupScene);
