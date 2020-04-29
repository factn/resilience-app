import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";

import theme from "../../../theme";
import ThemeProvider from "../../component/ThemeProvider";
import Page from "./Page";

describe("Page Layout", () => {
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
            <Page {...props} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
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
