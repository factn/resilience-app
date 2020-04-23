import { Paper, Tab, Tabs } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

import { H4 } from "../../../component";
import useForm from "../../../hooks/useForm";
import { H1 } from "../styles";
import ConfirmStep from "./ConfirmStep";
import DeliveryStep from "./DeliveryStep";
import FoodboxStep from "./FoodboxStep";

// Mock data
const mockData = {
  BASKET_NAME: "Fruit & Veggies Medley",
  BASKET_PRICE: 28,
  FARM_NAME: "Happy Farms",
  MAX_BASKETS: 5,
};

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
const tabNames = ["FOODBOX", "DELIVERY", "CONFIRM"];

const defaultFormValues = {
  quantity: 1,
  basket: mockData.BASKET_NAME,
};

export default function FoodboxFlow() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const { handleChange, values } = useForm(defaultFormValues);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleTabClick = (newStep) => {
    setActiveStep(newStep);
  };

  const ActiveComponent = stepComponents[activeStep];

  return (
    <div className={classes.root}>
      <H1>Food Box Delivery</H1>
      <Paper className={classes.tabMargin} elevation={3} square>
        <Tabs value={activeStep} indicatorColor="primary" textColor="primary" centered>
          {tabNames.map((tab, idx) => (
            <CustomTab
              icon={<H4>{idx + 1}</H4>}
              key={tab}
              label={tab}
              onClick={handleTabClick.bind(null, idx)}
              disableRipple
            />
          ))}
        </Tabs>
      </Paper>
      <div className={classes.content}>
        <ActiveComponent
          mockData={mockData}
          onBack={handleBack}
          onNext={handleNext}
          handleChange={handleChange}
          values={values}
        />
      </div>
    </div>
  );
}

const CustomTab = withStyles((theme) => ({
  root: {
    color: theme.color.vibrantPurple,
  },
}))(Tab);
