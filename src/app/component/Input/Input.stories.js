import { radios, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import Input from ".";

export const Basic = () => {
  const variantOptions = {
    text: "text",
    password: "password",
    textarea: "textarea",
  };
  const variantDefaultValue = "text";

  const inputProps = {
    inputType: radios("Input Type", variantOptions, variantDefaultValue),
    label: text("Label", "This is input label"),
    dataId: text("Data id", "input-data-id"),
    inputName: text("Name", "input-name"),
  };
  return <Input {...inputProps} />;
};

export default {
  title: "Components | Input",
  decorators: [withKnobs],
};
