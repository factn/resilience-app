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
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import PaypalCheckout from "../../../component/PaypalCheckout/PaypalCheckout";
import NavigationButtons from "./NavigationButtons";

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

function ConfirmStep({ values, mockData }) {
  const history = useHistory();
  const classes = useStyles();

  const [isDonationRequest, setIsDonationRequest] = useState(false);
  // const cart = useSelector( grab the cart object)
  // static mock cart
  const cart = {
    items: [
      {
        quantity: values.quantity,
        name: values.basket,
        description: values.farm,
        unit_amount: {
          value: mockData.BASKET_PRICE,
        },
      },
    ],
  };

  const total = cart.items.reduce((total, cur) => total + cur.quantity * cur.unit_amount.value, 0);

  function confirmRequest() {
    //TODO create a new mission here based on customer details
    if (isDonationRequest) {
      //TODO set the funding status to not funded
      //Send mission to firestore

      history.push("/request/foodbox/success/donation");
    } else {
      // Set funding status to funded
      history.push("/request/foodbox/success/payment");
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

      <List dense={true}>
        {cart.items.map((item) => (
          <CheckoutItem
            quantity={item.quantity}
            subtotal={item.quantity * item.unit_amount.value}
            secondary={item.description}
          >
            {item.name}
          </CheckoutItem>
        ))}
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
        cart={cart}
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

export default ConfirmStep;
