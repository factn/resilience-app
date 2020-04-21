import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { ImageUpload } from "./ImageUpload";

describe("ImageUpload Component", () => {
  global.URL.createObjectURL = jest.fn(); // Mock

  it("renders camera icon and two buttons", () => {
    const { getByTestId, getByText } = render(<ImageUpload />);
    expect(getByTestId("cameraIcon")).toBeTruthy();
    expect(getByText(/Take Photo/)).toBeInTheDocument();
    expect(getByText(/Upload Photo/)).toBeInTheDocument();
  });

  it("Uploading file should show its preview", () => {
    const { getByTestId } = render(<ImageUpload />);
    const inputEl = getByTestId("uploadField");

    const file = new File(["(⌐□_□)"], "example.png", {
      type: "image/png",
    });

    Object.defineProperty(inputEl, "files", {
      value: [file],
    });

    fireEvent.change(inputEl);

    expect(getByTestId("preview")).toBeInTheDocument();
  });
});
