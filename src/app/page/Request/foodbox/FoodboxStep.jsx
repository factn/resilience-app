import Select from "@material-ui/core/Select";
import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Divider, ListItem, ListItemText, RootRef, Grid, Collapse, Box } from "@material-ui/core";

import { ReactComponent as HappyFace } from "../../../../img/happy-face.svg";
import { H4, Body1 } from "../../../component";
import { HappyBox, HR, TotalsContainer, useStyles, Expand } from "./foodboxSteps.style";
import NavigationButtons from "./NavigationButtons";
import Organization from "../../../model/Organization";
import { routes } from "../../../routing";

// maximum allowable orders of a single resource
const MAX_ORDER = 5;

function FoodboxStep({ dispatch, state }) {
  const history = useHistory();
  const classes = useStyles();
  const [boxes, setBoxes] = useState([]);
  const { cart } = state;
  const totalPrice = Object.keys(cart).reduce(
    (total, key) => cart[key].resource.cost * cart[key].quantity + total,
    0
  );

  const totalBoxes = Object.keys(cart).reduce((total, key) => cart[key].quantity + total, 0);

  useEffect(() => {
    // We only need to do this once to get the initial foodboxes
    Organization.getFoodBoxes().then((boxes) => {
      if (boxes.length > 0) {
        setBoxes(boxes);
      } else {
        dispatch({
          type: "ERROR",
          payload: "We're sorry, there are no foodboxes available at this time.",
        });
      }
    });
  }, [dispatch]);

  const updateOrder = (resource, quantity) =>
    dispatch({ type: "UPDATE_CART", payload: { resource, quantity } });

  const onNext = () => {
    if (totalPrice === 0) {
      dispatch({ type: "ERROR", payload: "Must select at least one box to continue." });
      return;
    }
    dispatch({ type: "NEXT" });
  };

  return (
    <>
      <Body1 className={classes.body1}>
        Help out local farms by ordering seasonal fresh food boxes from them so good food doesn’t go
        to waste.
      </Body1>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Body1 color="textSecondary">QTY</Body1>
        <Body1 color="textSecondary">$ PER BOX</Body1>
      </Grid>
      {boxes.map((box) => (
        <CheckoutItem
          key={box.uid}
          quantity={cart[box.uid]?.quantity || 0}
          description={box.description}
          cost={box.cost}
          onChange={(e) => updateOrder(box, parseInt(e.currentTarget.value))}
        >
          {box.displayName}
        </CheckoutItem>
      ))}
      <Body1 className={classes.bodyItalicsMuted}>
        The farm supplies seasonal food to us based on availability. Our volunteers are unable to
        customize food boxes.
      </Body1>
      <HR />
      <TotalsContainer>
        <span>Total Price:</span>
        <span>
          <strong>${totalPrice}</strong>
        </span>
        <span>
          {totalBoxes} box{totalBoxes > 1 && "es"}
        </span>
      </TotalsContainer>
      <HappyBox>
        <HappyFace />
        <Body1 className={classes.bodyItalics}>
          Would you consider adding a box or two for your neighbour? You can also create an order
          for them!
        </Body1>
      </HappyBox>

      <NavigationButtons
        backText="Cancel"
        onBack={() => history.push(routes.request.start)}
        onNext={onNext}
      />
    </>
  );
}

// The approximate width in the pixels of a single character
const CHAR_WIDTH = 7;

function CheckoutItem({ children, cost, description, onChange, quantity }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [width, setWidth] = useState(0);
  const ref = useCallback((node) => node && setWidth(node.offsetWidth), []);

  const crop = width / CHAR_WIDTH;
  const formatedDescription =
    description.length > crop ? description.slice(0, crop) + "..." : description;

  return (
    <>
      <Divider />
      <ListItem className={classes.listItem}>
        <Select
          className={classes.select}
          native
          variant="outlined"
          value={quantity}
          onChange={onChange}
          inputProps={{
            name: "quantity",
            id: "quantity",
          }}
        >
          {[...Array(MAX_ORDER + 1)].map((e, i) => (
            <option value={i} key={i}>
              {i}
            </option>
          ))}
        </Select>
        <RootRef rootRef={ref}>
          <Box onClick={() => setOpen(!open)} flex={1} display="flex" flexDirection="column">
            <H4 color="textPrimary">{children}</H4>
            {!open && formatedDescription}
            <Collapse in={open} timeout="none">
              {description}
            </Collapse>
            <Expand open={open} />
          </Box>
        </RootRef>
        <ListItemText className={classes.cost}>
          <H4 color="textPrimary">${parseFloat(cost).toFixed(2)}</H4>
        </ListItemText>
      </ListItem>
    </>
  );
}

export default FoodboxStep;
