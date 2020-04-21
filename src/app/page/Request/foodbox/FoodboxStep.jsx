import React from "react";
import { useHistory } from "react-router-dom";

import NavigationButtons from "./NavigationButtons";

function FoodboxStep({ onNext }) {
  const history = useHistory();

  return (
    <>
      <h1>foodbox</h1>
      <NavigationButtons
        backText="Cancel"
        onBack={() => history.push("/request")}
        onNext={onNext}
      />
    </>
  );
}

export default FoodboxStep;
