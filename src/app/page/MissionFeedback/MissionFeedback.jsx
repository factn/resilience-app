import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import Page from "../../layout/Page";
import { isEmpty, isLoaded } from "react-redux-firebase";
import useForm from "../../hooks/useForm";
import PropTypes from "prop-types";
import { Mission } from "../../model";
import { CircularProgress } from "@material-ui/core";
import Snackbar from "../../component/Snackbars";
import {
  DeliveryConfirmation,
  Feedback,
  FeedbackWithSuccess,
  Acknowledgement,
  Step,
} from "./Steps";

/**
 * Page component for submitting feedback after mission delivery
 *
 * @param {object} props.history - History object obtained from React Router
 * @param {object} props.match - Match object obtained from React Router. Mission id should be passed as path variable in route.
 */
const MissionFeedback = ({ history, match }) => {
  const [step, setStep] = useState(Step.CONFIRM_DELIVERY);
  const { handleChange, values } = useForm({ feedback: "" });
  const [mission, setMission] = useState({});
  const [loading, setLoading] = useState(false);
  const snackbarContext = useContext(Snackbar.Context.SnackbarContext);
  useEffect(() => {
    const missionUid = match.params.id;
    const fetchMissionById = async () => {
      const mission = await Mission.getByUid(missionUid);
      setMission(mission);
    };
    fetchMissionById();
  }, [match.params.id]);
  const goBack = () => {
    history.goBack();
  };
  const submitFeedback = (success) => {
    setLoading(true);
    Mission.submitFeedback(mission.uid, values.feedback, success)
      .then(() => {
        snackbarContext.show({
          message: "Successfully submitted feedback",
        });
        if (!success) {
          setStep(Step.ACK);
          setLoading(false);
        } else {
          goBack();
        }
      })
      .catch((e) => {
        setLoading(false);
        snackbarContext.show({
          message: "Unable to submit feedback",
          type: "error",
        });
      });
  };
  let Content;
  const contentProps = {
    setStep,
    handleChange,
    values,
    deliveryImage: mission.deliveryConfirmationImage,
  };
  switch (step) {
    case Step.CONFIRM_DELIVERY:
      Content = <DeliveryConfirmation {...contentProps} />;
      break;
    case Step.FEEDBACK:
      Content = <Feedback {...contentProps} handleSubmit={submitFeedback} />;
      break;
    case Step.FEEDBACK_WITH_SUCCESS:
      Content = <FeedbackWithSuccess {...contentProps} handleSubmit={submitFeedback} />;
      break;
    case Step.ACK:
      Content = <Acknowledgement goBack={goBack} />;
      break;
    default:
      Content = <DeliveryConfirmation {...contentProps} />;
  }
  return (
    <Page isLoaded={isLoaded(mission)} isEmpty={isEmpty(mission)}>
      {loading ? <CircularProgress style={{ alignSelf: "center" }} /> : Content}
    </Page>
  );
};

export default withRouter(MissionFeedback);

MissionFeedback.propTypes = {
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object,

  match: PropTypes.object,
};
