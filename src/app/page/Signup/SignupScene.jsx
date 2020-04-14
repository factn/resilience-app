import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import useForm from "../../hooks/useForm";

import CallToActionPage from './CallToAction';
import UserProfilePage from "./UserProfile";
import ConnectSocialMediaPage from "./ConnectSocialMedia";
import PhoneAuthPage from "./PhoneAuth";
import SignupSuccessPage from "./SignupSuccess";


/**
 * Top level component for Signup
 *
 */
function SignupScene(props) {
    const { handleChange, values } = useForm();
    const [activeTab, setActiveTab] = useState(0);

    function changeFormValue(name, value) {
        handleChange({ target: { name, value}})
    }

    function updateFormValues(data) {
        // Retain phone number from phone auth response
        if (activeTab === 1) {
            changeFormValue('phone', data.phoneNumber)
        }
        // Retain full name and email from social media auth response
        if (activeTab === 2) {
            changeFormValue('fullName', data.displayName)
            changeFormValue('email', data.email)
        }
    };

    function submitUserDataToFirebase(data) {
        const { firstName, lastName, email, phone, availability, description, hasTransportation  } = values;
        const { address, lat, long, county, countryCode } = data?.location || {};
        const location = { address, lat, long, label: `${countryCode} - ${county}` };
        const payload = {
            availability,
            description,
            email,
            phone,
            profileName: `${firstName} ${lastName}`,
            location,
            isVolunteer: true,
            volunteerDetails: {
                hasTransportation: !!hasTransportation,
                status: 'pending',
            }
        };
        console.log('submiting user profile to firebase');
        console.log(payload);
    }

    function handleSubmit(data) {
        if (data) updateFormValues(data);
        if (activeTab === 3) submitUserDataToFirebase(data);
        if (activeTab in [0, 1, 2, 3]) setActiveTab(activeTab + 1);
        if (activeTab === 4) props.history.push("/missions");
    };

    function getComponentProps() {
        const baseProps = {
            onSubmit: handleSubmit,
        }
        if (activeTab !== 3) return baseProps

        //   additional props for volunteer profile form
        return {
            ...baseProps,
            handleChange,
            values,
        }
    };

    const ActivePage = {
        0: CallToActionPage,
        1: PhoneAuthPage,
        2: ConnectSocialMediaPage,
        3: UserProfilePage,
        4: SignupSuccessPage,
    }[activeTab]


    return <ActivePage {...getComponentProps()} />

  }

  SignupScene.propTypes = {
      history: PropTypes.object,
  };

  export default withRouter(SignupScene)