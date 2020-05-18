import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Button,
  Box,
} from "@material-ui/core";
import { Create } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import PaypalCheckout from "../../../component/PaypalCheckout/PaypalCheckout";
import { TypographyWrapper, H3, H4, H5, Body1 } from "../../../component";
import NavigationButtons from "./NavigationButtons";
import Mission from "../../../model/Mission";
import { MissionFundedStatus, MissionType, MissionStatus } from "../../../model/schema";
import CheckoutItem from "./CheckoutItem";
import { routes } from "../../../routing";

const useStyles = makeStyles((theme) => ({
  yMargin: {
    margin: "1rem 0",
  },
  paper: {
    backgroundColor: "#FCEBDB",
    padding: "1rem 2rem",
    position: "relative",
    marginBottom: "2rem",
  },
  heart: {
    position: "absolute",
    top: "0",
    left: "0",
    transform: "translate(.5rem, 1rem)",
  },
  donation: {
    "&:hover": {
      color: theme.color.secondaryBlue,
    },
    cursor: "pointer",
  },
}));

function ConfirmStep({ dispatch, state }) {
  const history = useHistory();
  const classes = useStyles();

  const { cart } = state;

  const [isDonationRequest, setIsDonationRequest] = useState(false);

  const total = Object.keys(cart).reduce(
    (total, key) => cart[key].resource.cost * cart[key].quantity + total,
    0
  );

  async function confirmRequest() {
    const { cart, details, recipient } = state;
    let mission = {
      type: MissionType.resource,
      status: MissionStatus.unassigned,
      recipientUid: recipient.uid,
      recipientDisplayName: recipient.displayName,
      recipientPhoneNumber: recipient.phoneNumber,
      deliveryLocation: details.location,
      deliveryNotes: details.instructions,
      deliveryType: details.curbsidePickup ? "curbside" : "delivery",
      details: Object.keys(cart).map((key) => ({
        resourceUid: cart[key].resource.uid,
        quantity: cart[key].quantity,
        displayName: cart[key].resource.displayName,
      })),
    };

    if (isDonationRequest) {
      mission = { ...mission, fundedStatus: MissionFundedStatus.notfunded };
    } else {
      mission = {
        ...mission,
        status: MissionStatus.tentative,
        fundedStatus: MissionFundedStatus.fundedbyrecipient,
        fundedDate: new Date().toISOString(),
      };
    }
    try {
      const createdMission = await Mission.create(mission);
      const redirect = isDonationRequest
        ? routes.request.success.donation
        : routes.request.success.payment;
      history.push(redirect);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "There was an error creating your mission. Please contact the organization.",
      });
    }
  }

  const paypalCart = transformForPaypal(cart);

  if (isDonationRequest) {
    return (
      <>
        <H3 className={classes.yMargin} align="left" color="textPrimary">
          Find Me a Donation
        </H3>
        <TypographyWrapper align="left">
          As an organization of volunteers, we will try our best to fulfill your request but please
          understand that wait times for this option may be uncertain.
        </TypographyWrapper>
        <NavigationButtons
          nextText="Confirm"
          onBack={() => setIsDonationRequest(false)}
          onNext={() => confirmRequest()}
        />
      </>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom="1rem">
        <H3 align="left" color="textPrimary">
          Request Summary
        </H3>
        <Button onClick={() => dispatch({ type: "UPDATE_STEP", payload: 0 })}>
          <Create fontSize="small" color="primary" />
          <H4 color="primary">Edit</H4>
        </Button>
      </Box>

      <Grid container direction="row" justify="space-between" alignItems="center">
        <Body1 color="textSecondary">QTY</Body1>
        <Body1 color="textSecondary">SUBTOTAL</Body1>
      </Grid>
      <List dense={true}>
        {Object.keys(cart).map((key) => {
          const { quantity, resource } = cart[key];
          return (
            <CheckoutItem
              key={resource.uid}
              quantity={quantity}
              cost={quantity * resource.cost}
              description={resource.description}
              name={resource.displayName}
            />
          );
        })}
        <Divider />
        <ListItem>
          <ListItemText>
            <H5 color="textSecondary">TOTAL (BEFORE TAX)</H5>
          </ListItemText>
          <ListItemSecondaryAction>
            <H5 color="textPrimary">${parseFloat(total).toFixed(2)}</H5>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <PaypalCheckout
        cart={paypalCart}
        onApprove={() => confirmRequest()}
        onError={(e) =>
          dispatch({ type: "ERROR", payload: "There was an error processing your payment" })
        }
      />

      <TypographyWrapper elementType="subtitle2">
        <i>Pay securly online with your credit card</i>
      </TypographyWrapper>

      <Body1 className={classes.yMargin} color="textSecondary">
        At the moment, we are not accepting cash due to potential health risks.
      </Body1>

      <Paper className={classes.paper} variant="outlined">
        <span role="img" aria-label="heart" className={classes.heart}>
          ❤️
        </span>
        <Body1 align="left" gutterBottom={true}>
          We want to make sure everyone has access to food. If you're unable to pay, we'll try to
          find a donation for your request.
        </Body1>
        <H5
          color="primary"
          align="left"
          className={classes.donation}
          onClick={() => setIsDonationRequest(true)}
        >
          Find me a donation
        </H5>
      </Paper>
      <Button
        style={{ marginBottom: "1rem" }}
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: "BACK" })}
      >
        Back
      </Button>
    </>
  );
}

const currency_code = "USD";

function transformForPaypal(cart) {
  const items = [];
  let total = 0;

  Object.keys(cart).forEach((key) => {
    const { quantity, resource } = cart[key];
    if (quantity > 0) {
      const description = resource.description.slice(0, 127);

      const item = {
        sku: resource.uid,
        quantity: quantity.toString(),
        name: resource.displayName,
        description,
        unit_amount: {
          currency_code,
          value: resource.cost.toString(),
        },
      };

      total += quantity * resource.cost;
      items.push(item);
    }
  });

  const amount = {
    value: total,
    currency_code,
    breakdown: {
      item_total: { value: total, currency_code },
      tax_total: { value: "0", currency_code },
    },
  };

  return {
    amount,
    items,
  };
}

export default ConfirmStep;
