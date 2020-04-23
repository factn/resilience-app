import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "1rem 0",
    width: "8rem",
  },
}));

export default function SuccessPage() {
  const { type } = useParams();
  const classes = useStyles();
  return (
    <Box margin="0rem 1rem" display="flex" flexDirection="column">
      <Typography variant="h1" color="textPrimary" align="left" gutterBottom>
        Request Sent!
      </Typography>

      {type === "donation" ? (
        <ByDonationSuccess />
      ) : type === "payment" ? (
        <ByPaymentSuccess />
      ) : null}

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        component={Link}
        to="/"
      >
        Next
      </Button>
    </Box>
  );
}

const ByDonationSuccess = () => (
  <Typography variant="body1" color="textPrimary" align="left" gutterBottom>
    Once we receive a donation and confirm with the farms, we will notify you prior to delivery.
  </Typography>
);

const ByPaymentSuccess = () => (
  <Typography variant="body1" color="textPrimary" align="left" gutterBottom>
    Once we confirm with the farms, we will notify you prior to delivery.
    <br />
    <br />
    Thank you for your support of local farms!
  </Typography>
);
