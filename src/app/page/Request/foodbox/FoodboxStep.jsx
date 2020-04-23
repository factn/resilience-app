import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Checkbox, Container, FormControlLabel, TextField } from "@material-ui/core";

import { ReactComponent as HappyFace } from "../../../../img/happy-face.svg";
import { useStyles, StyledHeader, HR, TotalsContainer, HappyBox } from "./foodboxSteps.style";
import AddressInput from "../../../component/AddressInput";
import { Body1 } from "../../../component";
import Select from "@material-ui/core/Select";

import NavigationButtons from "./NavigationButtons";

const BASKET_PRICE = 28;

function FoodboxStep({ handleChange, onNext, values }) {
  const history = useHistory();
  const classes = useStyles();

  function changeFormValue(name, value) {
    handleChange({ target: { name, value } });
  }

  function handleCheckBoxChange(event, value) {
    changeFormValue(event.currentTarget.name, value);
  }

  function handleChangeLocation(data) {
    const { location } = data;
    changeFormValue("location", location);
  }

  const getTotalPrice = () => {
    return (BASKET_PRICE * values.quantity).toFixed(2);
  };

  const getTotalBoxes = () => {
    return `${values.quantity} box${values.quantity === 1 ? "" : "es"}`;
  };

  return (
    <div className={classes.container}>
      <Body1 className={classes.body1}>
        Help out local farms by ordering seasonal fresh food boxes from them so good food doesn’t go
        to waste.
      </Body1>
      <StyledHeader main align="left" variant="h3">
        Happy Farms
      </StyledHeader>
      <Select
        native
        variant="outlined"
        value={values.basket}
        onChange={handleChange}
        inputProps={{
          name: "basket",
          id: "basket",
        }}
      >
        <option value="Fruit & Veggies Medley">Fruit & Veggies Medley</option>
      </Select>

      {/* <TextField
        variant="outlined"
        style={{ width: "2.5rem", marginLeft: '1rem', textAlign: 'center' }}
        id="quantity"
        // label="Qty"
        type="number"
        onChange={handleChange}
        value={values.quantity}
        InputLabelProps={{
          shrink: false,
          id: 'quantity-input',
        }}
      /> */}
      <Select
        style={{ width: "3rem", marginLeft: "1rem", textAlign: "center" }}
        native
        variant="outlined"
        value={values.quantity}
        onChange={handleChange}
        inputProps={{
          name: "quantity",
          id: "quantity",
        }}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </Select>
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
        onBack={() => history.push("/request")}
        onNext={onNext}
      />
    </div>
  );
}

export default FoodboxStep;
