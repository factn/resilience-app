import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

import { ReactComponent as HappyFace } from "../../../../img/happy-face.svg";
import { useStyles, StyledHeader, HR, TotalsContainer, HappyBox } from "./foodboxSteps.style";
import { Body1 } from "../../../component";
import Select from "@material-ui/core/Select";

import NavigationButtons from "./NavigationButtons";

function FoodboxStep({ mockData, handleChange, onNext, values }) {
  const history = useHistory();
  const classes = useStyles();

  const getTotalPrice = () => {
    return (mockData.BASKET_PRICE * values.quantity).toFixed(2);
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
        {values.farm}
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
        <option value={mockData.BASKET_NAME}>{mockData.BASKET_NAME}</option>
      </Select>
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
        {_.range(mockData.MAX_BASKETS).map((idx) => (
          <option value={idx + 1}>{idx + 1}</option>
        ))}
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

FoodboxStep.propTypes = {
  mockData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default FoodboxStep;
