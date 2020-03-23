import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Input from "./Input";

describe("Input Component", () => {
  function renderComponent(props) {
    return render(<Input {...props} />);
  }

  afterEach(cleanup);
  const props = {
    inputType: "text",
    dataId: "input-data-id",
    inputName: "input-name",
    label: "This is label text"
  };

  it("Renders text type input when type is text", () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId("input-data-id-text")).toBeTruthy();
  });

  it("Renders textarea type input when type is textarea", () => {
    const textareaProps = {
      ...props,
      inputType: "textarea"
    }
    const { getByTestId } = renderComponent(textareaProps);
    expect(getByTestId("input-data-id-textarea")).toBeTruthy();
  });
});
