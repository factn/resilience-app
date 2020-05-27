import { Box, Grid, makeStyles, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { H1, Body1 } from "../../component";

const useStyles = makeStyles((theme: any) => ({
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
  Icon: {
    height: "48px",
    width: "48px",
  },
  IconSuccess: {
    height: "48px",
    width: "48px",
    color: theme.palette.success.main,
  },
}));

enum Step {
  CONFIRM_DELIVERY = "confirmDelivery",
  FEEDBACK = "feedback",
  FEEDBACK_WITH_SUCCESS = "feedbackWithSuccess",
  ACK = "ack",
}

const DeliveryConfirmation = ({ deliveryImage, setStep }: any) => {
  const classes = useStyles();
  const onClickYes = () => {
    setStep(Step.FEEDBACK_WITH_SUCCESS);
  };
  const onClickNo = () => {
    setStep(Step.FEEDBACK);
  };
  return (
    <Grid container direction="column" alignItems="center" className={classes.root}>
      <VisibilityIcon color="primary" className={classes.Icon} />
      <H1 className={classes.Heading}>Look it's here!</H1>
      <img src={deliveryImage} alt="Delivery confirmation" className={classes.DeliveryImage} />
      <Body1 className={classes.Description}>Did you get everything you needed?</Body1>
      <Box>
        <Button className={classes.Button} onClick={onClickYes}>
          Yes
        </Button>
        <Button color="secondary" onClick={onClickNo} className={classes.Button}>
          No
        </Button>
      </Box>
    </Grid>
  );
};

const FeedbackForm = ({
  handleChange,
  handleSubmit,
  placeholder,
  required,
  submitBtnText,
  success,
  value,
}: any) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const onSubmit = () => {
    if (required && !value) {
      setError(true);
    } else {
      handleSubmit(success);
    }
  };
  return (
    <>
      <TextField
        variant="outlined"
        value={value || ""}
        name="feedback"
        onChange={handleChange}
        required
        placeholder={placeholder}
        multiline
        className={classes.FeedbackInputFeild}
        rows={8}
        error={error}
      />
      <Button className={classes.Button} onClick={onSubmit}>
        {submitBtnText}
      </Button>
    </>
  );
};

const FeedbackWithSuccess = ({ deliveryImage, handleChange, handleSubmit, values }: any) => {
  const classes = useStyles();
  const feedbackPlaceholder = "Leave some feedback if desired!";
  return (
    <Grid container direction="column" alignItems="center" className={classes.root}>
      <CheckCircleIcon className={classes.IconSuccess} />
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
        success={true}
      />
    </Grid>
  );
};

const Feedback = ({ deliveryImage, handleChange, handleSubmit, values }: any) => {
  const classes = useStyles();
  const feedbackPlaceholder =
    "Provide some details on what was wrong with the dropoff (i.e. 'I didn't receive the dropoff', 'They got the wrong items ..)";
  return (
    <Grid container direction="column" alignItems="center" className={classes.root}>
      <H1 className={classes.Heading}>What went wrong?</H1>
      <img src={deliveryImage} alt="Delivery confirmation" className={classes.DeliveryImage} />
      <Body1 className={classes.Description}>
        We aplogize for not meeting your needs. Could you let us know what went wrong?
      </Body1>
      <FeedbackForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        placeholder={feedbackPlaceholder}
        submitBtnText="Submit"
        value={values.feedback}
        required
        success={false}
      />
    </Grid>
  );
};

const Acknowledgement = ({ goBack }: any) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center" className={classes.root}>
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

export { DeliveryConfirmation, Feedback, FeedbackWithSuccess, Acknowledgement, Step };
