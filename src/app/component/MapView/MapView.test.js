import { render } from "@testing-library/react";
import React from "react";

import MapView from "./MapView";

describe("Map Component", () => {
  function renderComponent(props) {
    return render(<MapView {...props} />);
  }

  it("Renders to the screen correctly", () => {
    renderComponent({
      values: {
        lat: 0,
        long: 0,
      },
    });
    expect(document.querySelector(".data-test-leaflet-mapview")).toBeTruthy();
  });
});
