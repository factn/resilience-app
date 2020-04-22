import { render } from "@testing-library/react";
import React from "react";

import Input from "./Input";

describe("Input Component", () => {
  function renderComponent(props) {
    return render(<Input {...props} />);
  }

  const props = {
    inputType: "text",
    dataId: "input-data-id",
    inputName: "input-name",
    label: "This is label text",
    onChange: () => {},
  };

  it("Renders text type input when type is text", () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId("input-data-id-text")).toBeTruthy();
  });

  it("Renders textarea type input when type is textarea", () => {
    const textareaProps = {
      ...props,
      inputType: "textarea",
    };
    const { getByTestId } = renderComponent(textareaProps);
    expect(getByTestId("input-data-id-textarea")).toBeTruthy();
  });
});
