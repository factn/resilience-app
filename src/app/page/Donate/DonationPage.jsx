import React, { useEffect, useState } from "react";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { Typography, Box, makeStyles, Divider, Button } from "@material-ui/core";

import { Page } from "../../layout";
import PaypalCheckout from "../../component/PaypalCheckout/PaypalCheckout";
import { Organization } from "../../model";
import DonateIllustration from "./DonateIllustration";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100vw",
    height: "auto",
    marginLeft: "-1rem",
  },
  marginVertical: {
    margin: "1rem 0",
  },
  currencyField: {
    width: "100%",
    marginBottom: "2rem",
    "& input, p": {
      fontSize: "4rem",
    },
    "& input": {
      transform: "translateX(-1.5rem)",
    },
  },
  paypal: {
    marginBottom: "2rem",
  },
  successDetails: {
    ...theme.typography.body1,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
}));

const orgPhoneNumber = "555-555-5555";
const organizationEIN = "XX-XXXXXXX";
const organizationName = "Org_name_replace_me";

const states = { Donate: DonateState, Error: ErrorState, "Thank you!": SuccessState };

export default function DonationPage() {
  const classes = useStyles();
  const [state, setState] = useState({ title: "Donate", details: {} });

  const ActiveState = states[state.title];

  return (
    <Page>
      <Box margin="0 1rem">
        <Typography variant="h1" align="left" color="textPrimary">
          {state.title}
        </Typography>
        <ActiveState classes={classes} setState={setState} state={state} />
      </Box>
    </Page>
  );
}

function formatPaypalDetails(details) {
  const { payer, purchase_units } = details;
  const donation = purchase_units[0];

  return {
    amount: donation?.amount?.value,
    createdDate: Date.now(),
    method: "PayPal",
    recieptId: donation?.payments?.captures[0]?.id,
    donorName: `${payer?.name?.given_name} ${payer?.name?.surname}`,
    donorEmail: payer?.email_address,
  };
}

function DonateState({ classes, setState }) {
  const [amount, setAmount] = useState();

  return (
    <>
      <DonateIllustration />

      <Typography align="left" variant="body1" gutterBottom>
        Help your neighbors by donating money to help cover the cost of food boxes.
      </Typography>
      <Typography align="left" variant="body1" gutterBottom>
        Any bit helps!
      </Typography>
      <Typography align="left" variant="body1" gutterBottom>
        All donations are 100% tax-deductible.
      </Typography>
      <CurrencyTextField
        minimumValue="0.00"
        placeholder="0.00"
        className={classes.currencyField}
        outputFormat="string"
        autoFocus={true}
        value={amount}
        textAlign="center"
        onChange={(event, value) => setAmount(value)}
      />
      <PaypalCheckout
        color="black"
        cart={{ amount: { value: amount }, description: "Donation" }}
        className={classes.paypal}
        onError={() => setState({ title: "Error", details: {} })}
        onApprove={(details) =>
          setState({ title: "Thank you!", details: formatPaypalDetails(details) })
        }
      />
      <Typography align="left" variant="body1" gutterBottom>
        If you would like to donate using check or a different method, please reach out to our
        volunteers at <a href={`tel:${orgPhoneNumber}`}>{orgPhoneNumber}</a> for further help.
      </Typography>
    </>
  );
}

function SuccessState({ classes, state }) {
  const { details } = state;
  useEffect(() => {
    if (details.recieptId) {
      Organization.logDonation(details);
    }
  }, [details, state]);

  const date = new Date(details.createdDate).toLocaleString();
  return (
    <>
      <Typography align="left" variant="body1" gutterBottom>
        Thank you for your generosity! Your donation will help our team of volunteers connect food
        to those in need.
      </Typography>
      <Typography align="left" variant="h2" gutterBottom color="textPrimary">
        Donation Summary
      </Typography>
      <Box className={classes.successDetails}>
        <span>Organization: {organizationName} </span>
        <span> Donor Name: {details.donorName} </span>
        <span>Amount: ${details.amount} </span>
        <span>Reciept #: {details.recieptId} </span>
        <span>Donated At: {date} </span>
        <span>Payment Method: {details.method}</span>
      </Box>
      {organizationEIN && (
        <>
          <Divider className={classes.marginVertical} />
          <Typography align="left" variant="subtitle2" gutterBottom>
            <em>
              {organizationName} is a registered 501(c)3 non-profit organization #{organizationEIN}.
              Your donation is tax deductible to the extent allowable by law. No goods or services
              were provided by {organizationName} in return for this contribution.
            </em>
          </Typography>
        </>
      )}
    </>
  );
}

function ErrorState({ setState }) {
  return (
    <>
      <Typography align="left" variant="body1" gutterBottom>
        It looks like something went wrong when you tried to donate through PayPal.
      </Typography>
      <Typography align="left" variant="body1" gutterBottom>
        If you would like to try again, use the back button to start over.
      </Typography>
      <Typography align="left" variant="body1" gutterBottom>
        Otherwise, our volunteers can help you donate through a different method, such as by check.
        For more information please call: <a href={`tel:${orgPhoneNumber}`}>{orgPhoneNumber}</a>
      </Typography>
      <Box display="flex" alignItems="start">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setState({ title: "Donate", details: {} })}
        >
          Back
        </Button>
      </Box>
    </>
  );
}
