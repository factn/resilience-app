import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import useForm from "../../hooks/useForm";

import CallToActionPage from './CallToAction';
import UserProfilePage from "./UserProfile";
import ConnectSocialMediaPage from "./ConnectSocialMedia";
import PhoneAuthPage from "./PhoneAuth/PhoneAuth";


/**
 * Top level component for Signup
 *
 */
function SignupScene(props) {
    const { location } = props
    const { handleChange, values } = useForm();
    const [activeTab, setActiveTab] = useState(0);

    function updateFormValues(data) {
        if (activeTab === 1) {
            const target = { name: 'phone', value: data.phoneNumber }
            handleChange({ target })
        }
        if (activeTab === 2) {
            handleChange({target: { name: 'fullName', value: data.displayName }})
            handleChange({target: { name: 'email', value: data.email }})
        }
    };

    const handleSubmit = (data) => {
        if (data) {
            updateFormValues(data)
        }
        if (activeTab === 0) {
            const target = { name: 'phoneNumber', value: '+18182794555' }
            handleChange({ target })
            setActiveTab(2)
            return
        }
        if (activeTab in [0, 1, 2]) setActiveTab(activeTab + 1)
    };

    function getComponentProps() {
        const baseProps = {
            onSubmit: handleSubmit,
        }
        if (activeTab !== 3) return baseProps

        //   additional props for volunteer profile form
        return {
            ...baseProps,
            location, // needed?
            handleChange,
            values,
        }
    };

    const ActivePage = {
        0: CallToActionPage,
        1: PhoneAuthPage,
        2: ConnectSocialMediaPage,
        3: UserProfilePage,
    }[activeTab]


    return <ActivePage {...getComponentProps()} />

  }

  SignupScene.propTypes = {
    /**
     * Location provided by React Router
     */
    location: PropTypes.object.isRequired,
  };

  export default withRouter(SignupScene)