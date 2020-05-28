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
import { makeStyles, Slide, Modal, Backdrop, Paper, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    paddingTop: "5rem",
    paddingBottom: "2rem",
    width: "100%",
    maxWidth: theme.breakpoints.width("sm"),
    position: "relative",
    height: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  close: {
    position: "absolute",
    top: "0",
    right: "0",
    "& svg": {
      width: "2.5rem",
      height: "2.5rem",
    },
  },
}));

const MissionFeedback = ({ deliveryImage, missionUid, setShow, show }) => {
  const classes = useStyles();
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
    <Modal className={classes.modal} open={show} BackdropComponent={Backdrop}>
      <Slide direction="up" in={show} mountOnEnter unmountOnExit>
        <Paper square={true} className={classes.root}>
          <IconButton className={classes.close} onClick={() => setShow(false)}>
            <Close />
          </IconButton>
          {Content}
        </Paper>
      </Slide>
    </Modal>
  );
};

export default MissionFeedback;
