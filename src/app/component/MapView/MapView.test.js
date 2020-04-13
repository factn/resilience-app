import React from "react";
import { render } from "@testing-library/react";
import MapView from "./MapView";

describe("Map Component", () => {
  function renderComponent(props) {
    return render(<MapView {...props} />);
  }

  it("Renders to the screen correctly", () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId("map")).toBeTruthy();
  });
});
