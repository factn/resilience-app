import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import EyeBlue from "../../../img/eye-blue.svg";
import TickGreen from "../../../img/tick-green.svg";
import { Button, H1, Body1 } from "../../component";
import Page from "../../layout/Page";
import { isEmpty, isLoaded } from "react-redux-firebase";
import useForm from "../../hooks/useForm";
import PropTypes from "prop-types";

//Remove this placeholder after connecting to firestore
import cameraImage from "../../../img/placeholderBackground.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0),
  },
  DeliveryImage: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  Heading: {
    margin: theme.spacing(0, 2, 2, 2),
    color: theme.color.deepPurple,
  },
  Description: {
    margin: theme.spacing(0, 2, 2, 2),
    textAlign: "left",
  },
  Button: {
    margin: theme.spacing(0, 1),
  },
  FeedbackInputFeild: {
    width: `calc(100% - ${theme.spacing(4)}px)`,
    marginBottom: theme.spacing(2),
  },
}));

const DeliveryConfirmation = ({ deliveryImage, handleChange, setStep }) => {
  const classes = useStyles();
  const onClickSuccess = () => {
    setStep(Step.SUCCESS_FEEDBACK);
  };
  const onClickFailure = () => {
    setStep(Step.FAILURE_FEEDBACK);
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <img src={EyeBlue} alt="Eye" />
      <H1 className={classes.Heading}>Look it's here!</H1>
      <img src={deliveryImage} alt="Delivery confirmation" className={classes.DeliveryImage} />
      <Body1 className={classes.Description}>Did you get everything you needed?</Body1>
      <Box>
        <Button className={classes.Button} onClick={onClickSuccess}>
          Yes
        </Button>
        <Button color="secondary" onClick={onClickFailure} className={classes.Button}>
          No
        </Button>
      </Box>
    </Grid>
  );
};

const FeedbackForm = ({ handleChange, handleSubmit, placeholder, submitBtnText, value }) => {
  const classes = useStyles();
  return (
    <>
      <TextField
        variant="outlined"
        value={value || ""}
        name="feedback"
        onChange={handleChange}
        required={true}
        placeholder={placeholder}
        multiline
        className={classes.FeedbackInputFeild}
        rows={8}
      />
      <Button className={classes.Button} onClick={handleSubmit}>
        {submitBtnText}
      </Button>
    </>
  );
};

const SuccessFeedback = ({ deliveryImage, goBack, handleChange, onSubmit, values }) => {
  const classes = useStyles();
  const handleSubmit = () => {
    onSubmit().then(goBack);
  };
  const feedbackPlaceholder = "Leave some feedback if desired!";
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <img src={TickGreen} alt="Green tick" />
      <H1 className={classes.Heading}>Mission success!</H1>
      <img src={deliveryImage} alt="Delivery confirmation" className={classes.DeliveryImage} />
      <Body1 className={classes.Description}>
        We're glad to hear that. Let us know if we can help you again!
      </Body1>
      <FeedbackForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        placeholder={feedbackPlaceholder}
        submitBtnText={"Submit & Close Mission"}
        value={values.feedback}
      />
    </Grid>
  );
};

const FailureFeedback = ({ deliveryImage, handleChange, onSubmit, setStep, values }) => {
  const classes = useStyles();
  const handleSubmit = () => {
    onSubmit().then(() => setStep(Step.FAILURE_ACK));
  };
  const feedbackPlaceholder =
    "Provide some details on what was wrong with the dropoff (i.e. 'I didn't receive the dropoff', 'They got the wrong items ..)";
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <H1 className={classes.Heading}>What went wrong?</H1>
      <img src={deliveryImage} alt="Delivery confirmation" className={classes.DeliveryImage} />
      <Body1 className={classes.Description}>
        We aplogize for not meeting your needs. Could you let us know what went wrong?
      </Body1>
      <FeedbackForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        placeholder={feedbackPlaceholder}
        submitBtnText={"Submit & Close Mission"}
        value={values.feedback}
      />
    </Grid>
  );
};

const FailureAck = ({ goBack }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <H1 className={classes.Heading}>Thanks for the feedback</H1>
      <Body1 className={classes.Description}>
        We've received your message and will work to fix this as soon as we can.
      </Body1>
      <Body1 className={classes.Description}>
        We're sorry for the inconvenience and thank you for your patience!
      </Body1>
      <Button onClick={goBack} className={classes.Button}>
        Okay
      </Button>
    </Grid>
  );
};

const Step = {
  CONFIRM_DELIVERY: "confirmDelivery",
  FAILURE_FEEDBACK: "failureFeedback",
  SUCCESS_FEEDBACK: "successFeedback",
  FAILURE_ACK: "failureAck",
};

const MissionFeedback = ({ history, match }) => {
  const [step, setStep] = useState(Step.CONFIRM_DELIVERY);
  const { handleChange, values } = useForm({ feedback: "" });
  const [mission, setMission] = useState({});
  useEffect(() => {
    //Dummy mission for now. Populate this from firestore in next PR.
    setMission({ deliveryConfirmationImage: cameraImage });
  }, [match.params.id]);

  const submitMissionFailure = () => {
    //Implement this in next PR
    console.log(values);
    return Promise.resolve();
  };

  const submitMissionSuccess = () => {
    //Implement this in next PR
    console.log(values);
    return Promise.resolve();
  };

  const goBack = () => {
    history.goBack();
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
    case Step.FAILURE_FEEDBACK:
      Content = <FailureFeedback {...contentProps} onSubmit={submitMissionFailure} />;
      break;
    case Step.SUCCESS_FEEDBACK:
      Content = (
        <SuccessFeedback {...contentProps} goBack={goBack} onSubmit={submitMissionSuccess} />
      );
      break;
    case Step.FAILURE_ACK:
      Content = <FailureAck goBack={goBack} />;
      break;
    default:
      Content = <DeliveryConfirmation {...contentProps} />;
  }
  return (
    <Page isLoaded={isLoaded(mission)} isEmpty={isEmpty(mission)}>
      {Content}
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
