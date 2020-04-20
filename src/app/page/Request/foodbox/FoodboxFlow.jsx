import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, StepConnector } from "@material-ui/core";

import { H1 } from "../styles";
import { H4 } from "../../../component";

import FoodboxStep from "./FoodboxStep";
import DeliveryStep from "./DeliveryStep";
import ConfirmStep from "./ConfirmStep";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    marginBottom: "-3rem",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonsContainer: {
    display: "flex",
    padding: "1rem",
    bottom: "1rem",
  },
  content: {
    margin: "0rem 1rem",
    minHeight: "calc(100vh -70px)",
  },
}));

const steps = ["FOODBOX", "DELIVERY", "CONFIRM"];
const stepComponents = [FoodboxStep, DeliveryStep, ConfirmStep];

export default function FoodboxFlow() {
  const history = useHistory();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      history.push("/request");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const ActiveComponent = stepComponents[activeStep];

  return (
    <div className={classes.root}>
      <H1>Food Box Delivery</H1>
      <CustomStepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <CustomStepLabel StepIconComponent={CustomStepIcon}>{label}</CustomStepLabel>
          </Step>
        ))}
      </CustomStepper>
      {/* <div className={classes.content}>{getStepContent(activeStep, handleNext, handleBack)} {
        }</div> */}
      <div className={classes.content}>
        <ActiveComponent onBack={handleBack} onNext={handleNext}></ActiveComponent>
      </div>
    </div>
  );
}

const CustomStepper = withStyles((theme) => ({
  root: {
    padding: "1rem 1.5rem 0",
    boxShadow: "0px 2px 10px rgba(0,0,0,.3)",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
}))(Stepper);

const CustomConnector = withStyles({
  line: {
    opacity: 0,
  },
})(StepConnector);

const CustomStepLabel = withStyles((theme) => ({
  active: {
    borderBottom: `solid ${theme.color.vibrantPurple}`,
  },
  labelContainer: {
    marginTop: "-1rem",
  },
  label: {
    // only way to override these... =(
    color: `${theme.color.vibrantPurple} !important`,
    fontWeight: "600 !important",
    fontSize: ".9rem",
    paddingBottom: ".5rem",
  },
}))(StepLabel);

const CustomStepIcon = (props) => {
  return <H4>{props.icon}</H4>;
};
