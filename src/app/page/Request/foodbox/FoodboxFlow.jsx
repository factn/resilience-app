import { Paper, Tab, Tabs } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

import { H4 } from "../../../component";
import { H1 } from "../styles";

import useForm from "../../../hooks/useForm";
import FoodboxStep from "./FoodboxStep";
import ConfirmStep from "./ConfirmStep";
import DeliveryStep from "./DeliveryStep";

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
  const { handleChange, values } = useForm({ quantity: 1, basket: 'resourceId' });

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
        <ActiveComponent onBack={handleBack} onNext={handleNext} handleChange={handleChange} values={values}></ActiveComponent>
      </div>
    </div>
  );
}

const CustomTab = withStyles((theme) => ({
  root: {
    color: theme.color.vibrantPurple,
  },
}))(Tab);
