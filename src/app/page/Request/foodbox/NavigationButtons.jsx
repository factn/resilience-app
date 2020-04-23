import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyle = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(1),
  },
  buttonsContainer: {
    display: "flex",
    padding: "1rem",
    bottom: "1rem",
  },
}));

export default function NavigationButtons({
  backText = "Back",
  nextText = "Next",
  onBack,
  onNext,
}) {
  const classes = useStyle();

  return (
    <div className={classes.buttonsContainer}>
      <Button
        onClick={onBack}
        className={classes.backButton}
        variant="contained"
        color="secondary"
        disableElevation
        fullWidth
      >
        {backText}
      </Button>
      <Button variant="contained" color="primary" onClick={onNext} disableElevation fullWidth>
        {nextText}
      </Button>
    </div>
  );
}
