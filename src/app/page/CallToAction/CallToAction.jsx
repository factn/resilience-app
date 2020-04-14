import React, { useState } from "react";
import PropTypes from 'prop-types';
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import "firebase/storage";
import CallToActionForm from "./CallToActionForm";
import useForm from "../../hooks/useForm";

function CallToAction({ history }) {
  const [loading, setLoading] = useState(false);
  const { handleChange, values, setValues } = useForm();

  /**
   * Volunteer Call to Action
   * Form accepts zipcode
   * TODO:
   *  - What are we doing with the zipcode?
   *  - Is zipcode required? Need validation?
   */
  function handleNext(payload) {

    console.log('values', values)
    console.log('payload', payload)
    history.push('/signup/signin')
    // Do anything with the zipcode?
    // Redirect to SignIn page
  };

  if (loading) return <CircularProgress />;

  return (
    <CallToActionForm
      onSubmit={handleNext}
      handleChange={handleChange}
    />
  )
}

CallToAction.propTypes = {
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object.isRequired,
};

export default withRouter(CallToAction)
