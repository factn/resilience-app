import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import User from "../../model/User";
describe("Home page", () => {
  beforeAll(() => {
    const collection = {
      doc: jest.fn(),
    };
    jest.spyOn(User, "getAllAssociatedMissions").mockImplementation(() => []);
  });

  function renderComponent({ state } = {}) {
    const initialState = {
      firebase: {
        auth: {
          isLoaded: true,
          isEmpty: true,
        },
      },
      ...state,
    };

    const store = createStore(() => initialState);

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
  }

  it("Renders the home layout with login / signup appbar", () => {
    const page = renderComponent();
    expect(page.getByRole("navigation")).toBeInTheDocument();
    expect(page.getByRole("main")).toBeInTheDocument();
    expect(page.getByTestId("btn-login")).toBeInTheDocument();
    expect(page.getByTestId("btn-signup")).toBeInTheDocument();
    expect(page.queryByTestId("btn-request-help")).not.toBeInTheDocument();
  });

  it("Renders the home layout with Request Help", () => {
    const state = {
      firebase: {
        auth: {
          isLoaded: true,
          isEmpty: false,
        },
      },
    };
    const page = renderComponent({ state });
    expect(page.getByRole("navigation")).toBeInTheDocument();
    expect(page.getByRole("main")).toBeInTheDocument();
    expect(page.queryByTestId("btn-login")).not.toBeInTheDocument();
    expect(page.queryByTestId("btn-signup")).not.toBeInTheDocument();
  });
});
