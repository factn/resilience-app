import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import useForm from "../../hooks/useForm";

import CallToActionPage from "./CallToAction";
import UserProfilePage from "./UserProfile";
import ConnectSocialMediaPage from "./ConnectSocialMedia";
import PhoneAuthPage from "./PhoneAuth";
import SignupSuccessPage from "./SignupSuccess";

/**
 * Takes fullName as string and converts to First/Last name
 * by assuming the last word is the last name and everything before the
 * last name is the first name.  Returns an array [firstName, lastName]
 * Example:  'Joseph J. J. Shmoseph' => ['Joseph J. J.', 'Shmoseph']
 * This is a naive solution, it can't handle suffixes like Jr.
 * @param {string} fullName
 * @function
 */
const convertFullName = (fullName) => {
  let firstName = "";
  let lastName = "";
  if (fullName) {
    const parts = fullName.split(" ");
    lastName = parts[parts.length - 1];
    if (parts.length > 1) {
      firstName = parts.slice(0, parts.length - 1).join(" ");
    }
  }
  return [firstName, lastName];
};

/**
 * Top level component for Signup
 *
 */
function SignupScene(props) {
  const { handleChange, values } = useForm();
  const [activeTab, setActiveTab] = useState(2); // CHANGE ME!

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

  function submitUserDataToFirebase() {
    const {
      firstName,
      lastName,
      email,
      phone,
      availability,
      description,
      hasTransportation,
    } = values;

    let locationFormatted;
    if (values.location) {
      const { address, lat, long, county, countryCode } = values.location;
      locationFormatted = { address, lat, long, label: `${countryCode.toUpperCase()} - ${county}` };
    }

    const payload = {
      availability,
      description,
      email,
      phone,
      profileName: `${firstName} ${lastName}`,
      location: locationFormatted,
      isVolunteer: true,
      volunteerDetails: {
        hasTransportation: !!hasTransportation,
        status: "pending", //TODO: Use constants
      },
    };
    console.log("submiting user profile to firebase");
    console.log(payload);
  }

  /**
   * This is a catchall function that is passed down to
   * sub components for use as:
   * 1) primary button click handler
   * 2) submit handler
   * 3) success callback for firebaseAuth
   *
   */
  function processPage(data) {
    if (data) updateFormValues(data);
    if (activeTab === 3) submitUserDataToFirebase();
    if (activeTab === 4) props.history.push("/missions");
    if (activeTab in [0, 1, 2, 3]) setActiveTab(activeTab + 1);
  }

  const ActivePage = {
    0: CallToActionPage,
    1: PhoneAuthPage,
    2: ConnectSocialMediaPage,
    3: UserProfilePage,
    4: SignupSuccessPage,
  }[activeTab];

  return (
    <ActivePage
      onSubmit={processPage}
      signInSuccess={processPage}
      handleButtonClick={processPage}
      handleChange={handleChange}
      values={values}
    />
  );
}

SignupScene.propTypes = {
  /**
   * From react-router
   */
  history: PropTypes.object,
};

export default withRouter(SignupScene);
