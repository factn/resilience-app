import { storiesOf } from "@storybook/react";
import React from "react";

import AddressInput from "./AddressInput";

storiesOf("AddressInput", module).add("Default", () => {
  const componentProps = {};

  return <AddressInput {...componentProps} />;
});
