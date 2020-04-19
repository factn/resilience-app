import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import useForm from "../../hooks/useForm";
import CallToActionPage from "./CallToAction";
import UserProfilePage from "./UserProfile";
import ConnectSocialMediaPage from "./ConnectSocialMedia";
import PhoneAuthPage from "./PhoneAuth";
import SignupSuccessPage from "./SignupSuccess";
import { User } from "../../model";
import { SuccessSnackbar, ErrorSnackbar } from "../../component/Snackbars";
import { VolunteerStatus } from "../../model/schema";
import { convertFullName,convertLocation } from './helpers'

/**
 * Top level component for Signup
 *
 */
function SignupScene(props) {
  const [loading, setLoading] = useState(false);

  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState(false);
  const { handleChange, values } = useForm();
  const [activeTab, setActiveTab] = useState(3);

  function getPayload() {
    return {
      description: values.description || "",
      displayName: `${values.firstName} ${values.lastName}`,
      email: values.email || "",
      isOrganizer: false,
      isVolunteer: true,
      location: values.location && convertLocation(values.location),
      organizerDetails: {},
      phone: values.phone || "",
      photoUrl: "",
      volunteerDetails: {
        availability: values.availability || "",
        hasTransportation: Boolean(values.hasTransportation),
        status: VolunteerStatus.pending,
        privateNotes: "",
      },
    };
  }

  function saveUserProfile() {
    const payload = getPayload()
    debugger
    try {
      setLoading(true)
      User.saveNewUser(payload).then(()=> {
        setLoading(false)
      })

    } catch (error) {
      setLoading(false);
      setErrorSnackbarMessage(error);
    }
  }

  function changeFormValues(changes) {
    for (const change of changes) {
      const [name, value] = change;
      handleChange({ target: { name, value } });
    }
  }

  function updateFormValues(data) {
    // Retain phone number from phone auth response
    if (activeTab === 1) {
      changeFormValues([["phone", data.phoneNumber || ""]]);
    }
    // Retain full name and email from social media auth response
    if (activeTab === 2) {
      const [firstName, lastName] = convertFullName(data.displayName);
      changeFormValues([
        ["firstName", firstName],
        ["lastName", lastName],
        ["email", data.email || ""],
      ]);
    }
  }

  /**
   * This is a catchall function that is passed down to
   * sub components for use as:
   * 1) primary button click handler
   * 2) submit handler
   * 3) success callback for firebaseAuth
   */
  function processPage(data) {
    if (data) updateFormValues(data);
    if (activeTab === 3) saveUserProfile();
    if (activeTab === 4) props.history.push("/missions");
    if ([0, 1, 2, 3].includes(activeTab)) setActiveTab(activeTab + 1);
  }

  const ActivePage = {
    0: CallToActionPage,
    1: PhoneAuthPage,
    2: ConnectSocialMediaPage,
    3: UserProfilePage,
    4: SignupSuccessPage,
  }[activeTab];

  if (loading) return <CircularProgress />;

  const showSuccessSnackbar = !errorSnackbarMessage && activeTab === 4

  return (
    <>
      <ActivePage
        onSubmit={processPage}
        signInSuccess={processPage}
        handleButtonClick={processPage}
        handleChange={handleChange}
        values={values}
      />
      <ErrorSnackbar
        open={errorSnackbarMessage}
        handleClose={() => setErrorSnackbarMessage(false)}
        errorMessage={`Error while submitting request. Please try again. ${errorSnackbarMessage}`}
        autoHideDuration={4000}
      />
      <SuccessSnackbar
        open={showSuccessSnackbar}
        successMessage="Your account request has been successfully submitted and is pending approval"
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
