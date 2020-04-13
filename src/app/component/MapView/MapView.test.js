import React from "react";
import { render } from "@testing-library/react";
import MapView from "./MapView";

describe("Map Component", () => {
  function renderComponent(props) {
    return render(<MapView {...props} />);
  }

  it("Renders to the screen correctly", () => {
    const { getByText } = renderComponent({
      values: { lat: 37.796323930015284, long: -122.41264243216386 },
    });
    expect(getByText("Leaflet")).toBeTruthy();
  });
});
