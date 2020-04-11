import React from "react";
import { render } from "@testing-library/react";
import MapView from "./MapView";

describe("Map Component", () => {
  function renderComponent(props) {
    return render(<MapView {...props} />);
  }

  it("Renders to the screen correctly", () => {
    const mapView = renderComponent({
      values: {
        lat: 0,
        long: 0,
      },
    });
    expect(mapView.getByTestId("leaflet-mapview")).toBeVisible();
  });
});
