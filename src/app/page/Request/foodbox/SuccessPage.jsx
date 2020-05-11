import { Box, Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { H1, Body1 } from "../../../component";
import { routes } from "../../../routing";

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
      <H1 color="textPrimary" align="left" gutterBottom>
        Request Sent!
      </H1>

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
        to={routes.home}
      >
        Next
      </Button>
    </Box>
  );
}

const ByDonationSuccess = () => (
  <Body1 color="textPrimary" align="left" gutterBottom>
    Once we receive a donation and confirm with the farms, we will notify you prior to delivery.
  </Body1>
);

const ByPaymentSuccess = () => (
  <Body1 color="textPrimary" align="left" gutterBottom>
    Once we confirm with the farms, we will notify you prior to delivery.
    <br />
    <br />
    Thank you for your support of local farms!
  </Body1>
);
