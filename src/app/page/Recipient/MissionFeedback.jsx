import React, { useState, useContext, useEffect } from "react";
import { Mission } from "../../model";
import { MissionStatus } from "../../model/schema";
import Snackbar from "../../component/Snackbars";
import {
  DeliveryConfirmation,
  Feedback,
  FeedbackWithSuccess,
  Acknowledgement,
  Step,
} from "./Steps";

import { SlideUpContainer } from "../../component";

const MissionFeedback = ({ deliveryImage, missionUid, setShow, show }) => {
  const [step, setStep] = useState(Step.CONFIRM_DELIVERY);
  const [feedback, setFeedback] = useState("");
  const snackbarContext = useContext(Snackbar.Context.SnackbarContext);

  // clears feedback when closed
  useEffect(() => {
    if (!show) {
      setFeedback("");
    }
  }, [show]);

  const goBack = () => {
    setShow(false);
  };

  const handleChange = ({ target }) => {
    setFeedback(target.value);
  };

  const submitFeedback = (success) => {
    Mission.update(missionUid, {
      feedbackNotes: feedback,
      status: success ? MissionStatus.succeeded : MissionStatus.delivered,
    })
      .then(() => {
        snackbarContext.show({
          message: "Successfully submitted feedback",
        });
        if (!success) {
          setStep(Step.ACK);
        } else {
          goBack();
        }
      })
      .catch((e) => {
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
    values: { feedback },
    deliveryImage,
    goBack,
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
      Content = <Acknowledgement {...contentProps} />;
      break;
    default:
      Content = <DeliveryConfirmation {...contentProps} />;
  }
  return (
    <SlideUpContainer show={show} onClose={goBack}>
      {Content}
    </SlideUpContainer>
  );
};

export default MissionFeedback;
