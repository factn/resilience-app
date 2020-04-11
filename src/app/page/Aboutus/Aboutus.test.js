import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Aboutus from "./Aboutus";

describe("Aboutus page", () => {
  function renderComponent(props) {
    return render(<Aboutus {...props} />, { wrapper: MemoryRouter });
  }

  it("Renders the Aboutus page", () => {
    const page = renderComponent();
    expect(page.getByRole("navigation")).toBeInTheDocument();
    expect(page.getByRole("main")).toBeInTheDocument();
  });
});
