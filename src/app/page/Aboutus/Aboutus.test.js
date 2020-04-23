import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";

import theme from "../../../theme";
import ThemeProvider from "../../component/ThemeProvider";
import Aboutus from "./Aboutus";

describe("Aboutus page", () => {
  function renderComponent(props) {
    const initialState = {
      firebase: {
        auth: {
          isLoaded: true,
          isEmpty: true,
        },
      },
    };

    const store = createStore(() => initialState);

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <Aboutus {...props} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  }

  it("Renders the Aboutus page", () => {
    const page = renderComponent();
    expect(page.getByRole("navigation")).toBeInTheDocument();
    expect(page.getByRole("main")).toBeInTheDocument();
  });
});
