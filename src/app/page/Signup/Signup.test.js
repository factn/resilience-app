import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Signup from "./Signup";

describe("Signup page", () => {
  function renderComponent(props) {
    return render(<Signup {...props} />, { wrapper: MemoryRouter });
  }

  it("Renders the signup layout with login / signup appbar", () => {
    const page = renderComponent();
    expect(page.getByRole("navigation")).toBeInTheDocument();
    expect(page.getByRole("main")).toBeInTheDocument();
    expect(page.getByTestId("btn-login")).toBeInTheDocument();
    expect(page.getByTestId("btn-create-account")).toBeInTheDocument();
  });
});
