import React from "react";
import "jest-dom/extend-expect";
import MapView from "./MapView";

describe("Map Component", () => {
  function renderComponent(props) {
    return render(<Mapview {...props} />);
  }

  it("Renders to the screen correctly", () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId("map")).toBeTruthy();
  });
});
