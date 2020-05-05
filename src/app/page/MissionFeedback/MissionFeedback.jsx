import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import EyeBlue from "../../../img/eye-blue.svg";
import TickGreen from "../../../img/tick-green.svg";
import { H1, H3 } from "../../component/Typography";
import { Button } from "../../component";
import Page from "../../layout/Page";
import { isEmpty, isLoaded } from "react-redux-firebase";
import useForm from "../../hooks/useForm";

//Remove this placeholder after connecting to firestore
import cameraImage from "../../../img/placeholderBackground.svg";

const useStyles = makeStyles((theme) => ({
  DeliveryImage: {
    width: "100%",
  },
  closeIcon: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontSize: 48,
    fill: theme.color.deepPurple,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const DeliveryConfirmation = ({ deliveryImage, handleChange, setStep }) => {
  const classes = useStyles();
  const onClickSuccess = () => {
    handleChange({ target: { name: "status", value: "" } });
    setStep(Step.SUCCESS_FEEDBACK);
  };
  const onClickFailure = () => {
    handleChange({ target: { name: "status", value: "" } });
    setStep(Step.FAILURE_FEEDBACK);
  };
  return (
    <Grid container direction="column" alignItems="center" justify="center" py={2}>
      <img src={EyeBlue} alt="Eye" />
      <H1 mb={2}>Look it's here!</H1>
      <img src={deliveryImage} alt="Delivery confirmation" className={classes.DeliveryImage} />
      <Box p={2}>
        <H3 mb={2}>Did you get everything you needed?</H3>
        <Box px={2}>
          <Button mx={2} onClick={onClickSuccess}>
            Yes
          </Button>
          <Button color="secondary" mx={2} onClick={onClickFailure}>
            No
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

const SuccessFeedback = ({ deliveryImage, goBack, handleChange, handleSubmit, values }) => {
  const classes = useStyles();
  const onClickSubmit = () => {
    handleSubmit().then(goBack);
  };
  const feedbackPlaceholder = "Leave some feedback if desired!";
  return (
    <Grid container direction="column" alignItems="center" justify="center" py={2}>
      <img src={TickGreen} alt="Green tick" />
      <H1 mb={2}>Mission success!</H1>
      <img src={deliveryImage} alt="Delivery confirmation" className={classes.DeliveryImage} />
      <Box p={2}>
        <H3 mb={2}>We're glad to hear that. Let us know if we can help you again!</H3>
        <TextField
          mb={2}
          fullWidth={true}
          variant="outlined"
          value={values.feedbackNotes || ""}
          name="feedbackNotes"
          onChange={handleChange}
          required={true}
          placeholder={feedbackPlaceholder}
          multiline
        />
        <Button mx={2} onClick={onClickSubmit}>
          {"Submit & Close Mission"}
        </Button>
      </Box>
    </Grid>
  );
};

const FailureFeedback = ({ deliveryImage, handleChange, handleSubmit, setStep, values }) => {
  const classes = useStyles();
  const onClickSubmit = () => {
    handleSubmit().then(() => setStep(Step.FAILURE_ACK));
  };
  const feedbackPlaceholder =
    "Provide some details on what was wrong with the dropoff (i.e. 'I didn't receive the dropoff', 'They got the wrong items ..)";
  return (
    <Grid container direction="column" alignItems="center" justify="center" py={2}>
      <H1 mb={2}>What went wrong?</H1>
      <img src={deliveryImage} alt="Delivery confirmation" className={classes.DeliveryImage} />
      <Box p={2}>
        <H3 mb={2}>
          We aplogize for not meeting your needs. Could you let us know what went wrong?
        </H3>
        <TextField
          mb={2}
          fullWidth={true}
          variant="outlined"
          value={values.feedbackNotes || ""}
          name="feedbackNotes"
          onChange={handleChange}
          required={true}
          placeholder={feedbackPlaceholder}
          multiline
        />
        <Button mx={2} onClick={onClickSubmit}>
          {"Submit & Close Mission"}
        </Button>
      </Box>
    </Grid>
  );
};

const FailureAck = ({ goBack }) => {
  return (
    <Grid container direction="column" alignItems="center" justify="center" py={2}>
      <H1 mb={2}>Thanks for the feedback</H1>
      <H3 mb={2}>We've received your message and will work to fix this as soon as we can.</H3>
      <H3 mb={2}>We're sorry for the inconvenience and thank you for your patience!</H3>
      <Button onClick={goBack}>Okay</Button>
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
  const { handleChange, values } = useForm({ status: "", feedbackNotes: "" });
  const [mission, setMission] = useState({});
  useEffect(() => {
    //Dummy mission for now. Populate from firestore in next PR.
    setMission({ deliveryConfirmationImage: cameraImage });
  }, [match.params.id]);

  const handleSubmit = () => {
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
      Content = <FailureFeedback {...contentProps} handleSubmit={handleSubmit} />;
      break;
    case Step.SUCCESS_FEEDBACK:
      Content = <SuccessFeedback {...contentProps} goBack={goBack} handleSubmit={handleSubmit} />;
      break;
    case Step.FAILURE_ACK:
      Content = <FailureAck goBack={goBack} />;
      break;
    default:
      Content = <DeliveryConfirmation {...contentProps} />;
  }
  const classes = useStyles();
  return (
    <Page isLoaded={isLoaded(mission)} isEmpty={isEmpty(mission)}>
      <Grid align="right" item>
        <CloseIcon align="right" className={classes.closeIcon} onClick={goBack} />
      </Grid>
      {Content}
    </Page>
  );
};

export default withRouter(MissionFeedback);
