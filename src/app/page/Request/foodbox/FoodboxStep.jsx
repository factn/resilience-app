import Select from "@material-ui/core/Select";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ReactComponent as HappyFace } from "../../../../img/happy-face.svg";
import { H3, Body1 } from "../../../component";
import { HappyBox, HR, TotalsContainer, useStyles } from "./foodboxSteps.style";
import NavigationButtons from "./NavigationButtons";
import Organization from "../../../model/Organization";
import { routes } from "../../../routing";

function FoodboxStep({ dispatch, state }) {
  const history = useHistory();
  const classes = useStyles();
  const [boxes, setBoxes] = useState([]);
  const { cart } = state;

  const updateOrder = (resource, quantity) =>
    dispatch({ type: "UPDATE_CART", payload: { resource, quantity } });

  useEffect(() => {
    // We only need to do this once to get the initial foodboxes
    Organization.getFoodBoxes().then((boxes) => {
      console.log(boxes);
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

  const getTotalPrice = () => {
    return Object.keys(cart).reduce(
      (total, key) => cart[key].resource.cost * cart[key].quantity + total,
      0
    );
  };

  const getTotalBoxes = () => {
    const total = Object.keys(cart).reduce((total, key) => cart[key].quantity + total, 0);
    return `${total} box${total === 1 ? "" : "es"}`;
  };

  return (
    <>
      <Body1 className={classes.body1}>
        Help out local farms by ordering seasonal fresh food boxes from them so good food doesn’t go
        to waste.
      </Body1>
      {boxes.map((box) => (
        <div key={box.uid}>
          <H3 align="left" color="textPrimary" gutterBottom>
            {box.displayName} ${box.cost}
          </H3>
          <Select
            style={{ width: "75%", borderRadius: "4px 0 0 4px" }}
            autoWidth
            native
            variant="outlined"
            inputProps={{
              name: "basket",
              id: "basket",
            }}
          >
            <option key={box.uid} value={box.displayName}>
              {box.displayName}
            </option>
          </Select>
          <Select
            style={{ width: "25%", borderRadius: "0 4px 4px 0" }}
            native
            variant="outlined"
            value={cart[box.uid]?.quantity || 0}
            onChange={(e) => updateOrder(box, parseInt(e.currentTarget.value))}
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
        </div>
      ))}
      <Body1 className={classes.bodyItalicsMuted}>
        The farm supplies seasonal food to us based on availability. Our volunteers are unable to
        customize food boxes.
      </Body1>
      <HR />
      <TotalsContainer>
        <span>Total Price:</span>
        <span>
          <strong>${getTotalPrice()}</strong>
        </span>
        <span>({getTotalBoxes()})</span>
      </TotalsContainer>
      <HappyBox>
        <HappyFace />
        <Body1 className={classes.bodyItalics}>
          Would you be willing to order a box for your neighbour too?
        </Body1>
      </HappyBox>

      <NavigationButtons
        backText="Cancel"
        onBack={() => history.push(routes.request.start)}
        onNext={() => dispatch({ type: "NEXT" })}
      />
    </>
  );
}

// maximum allowable orders of a single resource
const MAX_ORDER = 5;

export default FoodboxStep;
