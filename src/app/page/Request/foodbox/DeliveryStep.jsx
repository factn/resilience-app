import React from "react";

import NavigationButtons from "./NavigationButtons";

function DeliveryStep({ onBack, onNext }) {
  return (
    <>
      <h1>delivery</h1>
      <NavigationButtons onBack={onBack} onNext={onNext} />
    </>
  );
}

export default DeliveryStep;
