import React from "react";

import NavigationButtons from "./NavigationButtons";
import { useHistory } from "react-router-dom";

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
