import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { createStore } from "redux";

import theme from "../../../theme";
import ThemeProvider from "../../component/ThemeProvider";
import User from "../../model/User";
import Mission from "../../model/Mission";
import Home from "./Home";
import { OrganizationContext } from "../../model";
import { UserPermissionsService } from "../../model/permissions";

describe("Home page", () => {
  let page;
  beforeAll(() => {
    jest.spyOn(User, "getAllAssociatedMissions").mockImplementation(() => []);
    jest.spyOn(UserPermissionsService, "getUserRole").mockResolvedValue("USER");
    jest.spyOn(Mission, "getAllAvailable").mockImplementation(() => []);
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

    jest.spyOn(Mission, "selectAssignedUserMissions").mockImplementation(() => []);
    jest.spyOn(Mission, "selectAvailableUserMissions").mockImplementation(() => []);

    const store = createStore(() => initialState);

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <OrganizationContext.Provider value={{}}>
              <Home />
            </OrganizationContext.Provider>
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  }

  it("Renders the home layout with login / signup appbar", () => {
    const page = renderComponent();
    expect(page.getByRole("navigation")).toBeInTheDocument();
    expect(page.getByRole("main")).toBeInTheDocument();

    expect(page.queryByTestId("label-org-name")).toBeInTheDocument();
    expect(page.queryByTestId("label-org-tagline")).toBeInTheDocument();
    expect(page.getByTestId("btn-login")).toBeInTheDocument();

    expect(page.queryByTestId("label-powered-by")).toBeInTheDocument();
    expect(page.queryByTestId("label-powered-by-name")).toBeInTheDocument();

    expect(page.queryAllByTestId("label-greeting-title")).toHaveLength(2);
    expect(page.queryAllByTestId("label-greeting-overlay")).toHaveLength(2);
    expect(page.queryAllByTestId("label-greeting-mssg")).toHaveLength(2);
    expect(page.queryAllByTestId("btn-greeting-action")).toHaveLength(2);

    expect(page.queryByTestId("label-donate-title")).toBeInTheDocument();
    expect(page.queryByTestId("icon-donate")).toBeInTheDocument();
    expect(page.queryByTestId("label-donate-mssg")).toBeInTheDocument();
    expect(page.queryByTestId("btn-donate-action")).toBeInTheDocument();

    expect(page.queryByTestId("icon-contact")).toBeInTheDocument();
    expect(page.queryByTestId("label-contact-mssg-1")).toBeInTheDocument();
  });

  it("Renders the Authenticated Home page", () => {
    const state = {
      firebase: {
        auth: {
          isLoaded: false,
          isEmpty: false,
        },
      },
    };

    act(() => {
      page = renderComponent({ state });
      state.firebase.auth.isLoaded = true;
    });

    expect(page.getByRole("navigation")).toBeInTheDocument();
    expect(page.getByRole("main")).toBeInTheDocument();
    expect(page.queryByTestId("btn-login")).not.toBeInTheDocument();
    expect(page.queryByTestId("btn-signup")).not.toBeInTheDocument();
  });
});
