import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";
import MiniMap from "./MiniMap";

describe("Minimap Component", () => {
  afterEach(cleanup);

  it("renders a map correctly", () => {
    const { getByText, getByTestId } = render(<MiniMap />);
    expect(getByTestId("maps")).toBeTruthy();
  });
});
