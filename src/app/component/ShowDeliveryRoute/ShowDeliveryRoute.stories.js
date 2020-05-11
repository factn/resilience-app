import { storiesOf } from "@storybook/react";
import React from "react";

import ShowDeliveryRoute from "./ShowDeliveryRoute";

storiesOf("ShowDeliveryRoute", module).add("Default", () => {
  const componentProps = {};

  return <ShowDeliveryRoute {...componentProps} />;
});
