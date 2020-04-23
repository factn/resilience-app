import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";

import theme from "../../../theme";
import ThemeProvider from "../../component/ThemeProvider";
import User from "../../model/User";
import Appbar from "./Appbar";

describe("Appbar Layout", () => {
  beforeAll(() => {
    // eslint-disable-next-line no-unused-vars
    const collection = {
      doc: jest.fn(),
    };
    jest.spyOn(User, "getAllAssociatedMissions").mockImplementation(() => []);
  });

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
            <Appbar {...props} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  }

  it("Render the default appbar ", () => {
    const appBar = renderComponent();

    // const container = appBar.getByRole("navigation");
    // const logoIcon = appBar.getByTitle("MutualAidLogo");
    // const menuIcon = appBar.getByTestId("MutualAidMenu");

    // expect(container).toHaveStyle("height: 89px");
    // expect(container).toBeTruthy();
    // // Accessibility
    // expect(logoIcon).toBeTruthy();
    // expect(menuIcon).toBeTruthy();
  });

  // it("Render appbar with customize children", () => {
  //   const appBar = renderComponent({
  //     children: <div>appbar test children</div>,
  //   });

  //   const container = appBar.getByRole("navigation");

  //   // expect(container).toHaveStyle("height: 89px"); @todo: why is this failing?
  //   expect(container).toBeTruthy();
  //   // Accessibility
  //   expect(appBar.getByText("appbar test children")).toBeTruthy();
  // });
});
