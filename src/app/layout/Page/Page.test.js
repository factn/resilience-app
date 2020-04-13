import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import Page from "./Page";

describe("Page Layout", () => {
  function renderComponent(props) {
    return render(<Page {...props} />, { wrapper: MemoryRouter });
  }

  it("Renders the page layout with a default appbar", () => {
    const page = renderComponent();
    expect(page.getByRole("navigation")).toBeTruthy();
    expect(page.getByRole("main")).toBeTruthy();
  });
  it("Renders the page layout with a custom appbar", () => {
    const page = renderComponent({ children: <div>page test appbar</div> });
    expect(page.getByRole("navigation")).toBeTruthy();
    expect(page.getByRole("navigation")).toBeTruthy();
    expect(page.getByText("page test appbar")).toBeTruthy();
  });
});
