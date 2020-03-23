import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";

import Page from "./Page";
import { PageContainer } from "./Page.style";

describe("Page Layout", () => {
  function renderComponent(props) {
    return render(<Page {...props} />);
  }

  afterEach(cleanup);

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
