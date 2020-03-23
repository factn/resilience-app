import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";

import Appbar from "./Appbar";
import { AppbarContainer } from "./Appbar.style";

describe("Appbar Layout", () => {
  function renderComponent(props) {
    return render(<Appbar {...props} />);
  }

  afterEach(cleanup);

  it("Render the default appbar ", () => {
    const appBar = renderComponent();

    const container = appBar.getByRole("navigation")
    const logoIcon = appBar.getByTitle("MutualAidLogo")
    const menuIcon = appBar.getByTitle("MutualAidMenu")

    expect(container).toHaveStyle('height: 89px');
    expect(container).toBeTruthy();
    // Accessibility
    expect(logoIcon).toBeTruthy();
    expect(menuIcon).toBeTruthy();
  });

  it("Render appbar with customize children", () => {
    const appBar = renderComponent({children: <div>appbar test children</div>});

    const container = appBar.getByRole("navigation")

    expect(container).toHaveStyle('height: 89px');
    expect(container).toBeTruthy();
    // Accessibility
    expect(appBar.getByText("appbar test children")).toBeTruthy();
  });

});
