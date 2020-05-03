import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { normalizeLocation } from "../../../utils/helpers";

import PaypalCheckout from "../../../component/PaypalCheckout/PaypalCheckout";
import NavigationButtons from "./NavigationButtons";
import Mission from "../../../model/Mission";
import { MissionFundedStatus, MissionType } from "../../../model/schema";

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
  const user = useSelector((state) => state.firebase.auth);
  console.log(user);

  const { cart } = state;

  const [isDonationRequest, setIsDonationRequest] = useState(false);

  const total = Object.keys(cart).reduce(
    (total, key) => cart[key].resource.cost * cart[key].quantity + total,
    0
  );

  // TODO we should try to create this mission before paying and if payment fails we delete it or something
  async function confirmRequest() {
    const { cart } = state;
    let mission = {
      type: MissionType.foodbox,
      // what does this need to be??
      // status: ???
      recipientId: user.id,
      recipientDisplayName: user.displayName,
      recipientPhoneNumber: user.phoneNumber || user.phone,
      deliveryLocation: normalizeLocation(state.location),
      deliveryNotes: state.instructions,
      missionDetails: {
        // TODO we should make use of the whole resource here instead of just the name
        needs: Object.keys(cart).map((key) => ({
          quantity: cart[key].quantity,
          name: cart[key].resource.name,
        })),
      },
    };

    if (isDonationRequest) {
      mission = { ...mission, fundedStatus: MissionFundedStatus.notfunded };
    } else {
      mission = {
        ...mission,
        fundedStatus: MissionFundedStatus.fundedbyrecipient,
        // TODO change when dates are figured out
        fundedDate: Date.now().toString(),
      };
    }

    try {
      const createdMission = await Mission.create(mission);
      console.log(createdMission);
      history.push("/request/foodbox/success/" + isDonationRequest ? "donation" : "payment");
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ERROR",
        payload: "There was an error creating your mission. Please contact the organization.",
      });
    }
  }

  if (isDonationRequest) {
    return (
      <>
        <Typography className={classes.yMargin} variant="h3" align="left" color="textPrimary">
          Find Me a Donation
        </Typography>
        <Typography align="left">
          As an organization of volunteers, we will try our best to fulfill your request but please
          understand that wait times for this option may be uncertain.
        </Typography>
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
      <Typography className={classes.yMargin} variant="h3" align="left" color="textPrimary">
        Request Summary
      </Typography>

      <Grid container direction="row" justify="space-between" alignItems="center">
        <Typography variant="body1" color="textSecondary">
          QTY
        </Typography>
        <Typography variant="body1" color="textSecondary">
          SUBTOTAL
        </Typography>
      </Grid>
      <button onClick={confirmRequest}>press meq</button>
      <List dense={true}>
        {Object.keys(cart).map((key) => {
          const { quantity, resource } = cart[key];
          return (
            <CheckoutItem
              key={resource.id}
              quantity={quantity}
              subtotal={quantity * resource.cost}
              secondary={resource.provider}
            >
              {resource.name}
            </CheckoutItem>
          );
        })}
        <Divider />
        <ListItem>
          <ListItemText>
            <Typography variant="h5" color="textSecondary">
              TOTAL (BEFORE TAX)
            </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography variant="h5" color="textPrimary">
              ${parseFloat(total).toFixed(2)}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <PaypalCheckout
        cart={transformForPaypal(cart)}
        onApprove={() => confirmRequest()}
        onError={() => history.push("/request/foodbox/error")}
      />

      <Typography variant="subtitle2">
        <i>Pay securly online with your credit card</i>
      </Typography>

      <Typography className={classes.yMargin} variant="body1" color="textSecondary">
        At the moment, we are not accepting cash due to potential health risks.
      </Typography>

      <Paper className={classes.paper} variant="outlined">
        <span role="img" aria-label="heart" className={classes.heart}>
          ❤️
        </span>
        <Typography variant="body1" align="left" gutterBottom={true}>
          We want to make sure everyone has access to food. If you're unable to pay, we'll try to
          find a donation for your request.
        </Typography>
        <Typography
          variant="h5"
          color="primary"
          align="left"
          className={classes.donation}
          onClick={() => setIsDonationRequest(true)}
        >
          Find me a donation
        </Typography>
      </Paper>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: "BACK" })}
        gutterBottom
      >
        Back
      </Button>
    </>
  );
}

function CheckoutItem({ children, quantity, secondary, subtotal }) {
  return (
    <>
      <Divider />
      <ListItem>
        <ListItemIcon>
          <Typography variant="h4" color="textPrimary">
            {quantity}
          </Typography>
        </ListItemIcon>
        <ListItemText secondary={secondary}>
          <Typography variant="h4" color="textPrimary">
            {children}
          </Typography>
        </ListItemText>
        <ListItemSecondaryAction>${parseFloat(subtotal).toFixed(2)}</ListItemSecondaryAction>
      </ListItem>
    </>
  );
}

function transformForPaypal(cart) {
  // only worry about one box for now
  const key = Object.keys(cart)[0];
  const { quantity, resource } = cart[key];
  const currency_code = "USD";

  const item = {
    sku: resource.id,
    quantity: quantity.toString(),
    name: resource.name,
    unit_amount: {
      currency_code,
      value: resource.cost.toString(),
    },
    description: resource.description,
  };

  const total = (quantity * resource.cost).toString();

  const amount = {
    value: total,
    currency_code,
    breakdown: {
      item_total: { value: total, currency_code },
      tax_total: { value: "0", currency_code },
    },
  };

  const newCart = {
    amount,
    items: [item],
  };

  return newCart;
}

export default ConfirmStep;
