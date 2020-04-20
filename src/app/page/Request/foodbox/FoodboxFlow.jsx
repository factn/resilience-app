import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Paper } from "@material-ui/core";

import { H1 } from "../styles";
import { H4 } from "../../../component";

import FoodboxStep from "./FoodboxStep";
import DeliveryStep from "./DeliveryStep";
import ConfirmStep from "./ConfirmStep";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
  },
  content: {
    margin: "0rem 1rem",
  },
  tabMargin: {
    margin: "1rem 0",
  },
}));

const stepComponents = [FoodboxStep, DeliveryStep, ConfirmStep];

export default function FoodboxFlow() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const ActiveComponent = stepComponents[activeStep];

  return (
    <div className={classes.root}>
      <H1>Food Box Delivery</H1>
      <Paper className={classes.tabMargin} elevation={3} square>
        <Tabs value={activeStep} indicatorColor="primary" textColor="primary" centered>
          <CustomTab icon={<H4>1</H4>} label="FOODBOX" disableRipple />
          <CustomTab icon={<H4>2</H4>} label="DELIVERY" disableRipple />
          <CustomTab icon={<H4>3</H4>} label="CONFIRM" disableRipple />
        </Tabs>
      </Paper>
      <div className={classes.content}>
        <ActiveComponent onBack={handleBack} onNext={handleNext}></ActiveComponent>
      </div>
    </div>
  );
}

const CustomTab = withStyles((theme) => ({
  root: {
    color: theme.color.vibrantPurple,
  },
}))(Tab);
