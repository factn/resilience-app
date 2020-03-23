import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Home from "./Home";

describe("Home page", () => {
  function renderComponent(props) {
    return render(<Home {...props} />, { wrapper: MemoryRouter });
  }

  afterEach(cleanup);

  it("Renders the home layout with login / signup appbar", () => {
    const page = renderComponent();
    expect(page.getByRole("navigation")).toBeInTheDocument();
    expect(page.getByRole("main")).toBeInTheDocument();
    expect(page.getByText("Login")).toBeInTheDocument();
    expect(page.getByText("Signup")).toBeInTheDocument();
    expect(page.getByText("View Jobs")).toBeInTheDocument();
    expect(page.getByText("Request Help")).toBeInTheDocument();
  });
});
