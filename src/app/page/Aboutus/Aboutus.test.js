import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import theme from "../../../theme";
import ThemeProvider from "../../component/ThemeProvider";
import Aboutus from "./Aboutus";

describe("Aboutus page", () => {
  function renderComponent(props) {
    return render(
      <ThemeProvider theme={theme}>
        <Aboutus {...props} />
      </ThemeProvider>,
      { wrapper: MemoryRouter }
    );
  }

  it("Renders the Aboutus page", () => {
    const page = renderComponent();
    expect(page.getByRole("navigation")).toBeInTheDocument();
    expect(page.getByRole("main")).toBeInTheDocument();
  });
});
