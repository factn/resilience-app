import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import ThemeProvider from "../ThemeProvider";
import theme from "../../../theme";
import MissionCard from "../MissionComponent/MissionCard";

const renderMissionCard = (props) => {
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
      <ThemeProvider theme={theme}>
        <MissionCard {...props} />
      </ThemeProvider>
    </Provider>
  );
};

describe("MissionCard", () => {
  it("should render", () => {
    const props = {
      mission: {
        notes: "Test title",
        status: "Available",
        pickUpLocation: {
          address: "23 New Avenue, NY",
        },
        pickUpWindow: {
          startTime: "06-06-2020",
        },
        type: "resource",
        details: [
          {
            displayName: "Apple",
            quantity: 2,
          },
        ],
      },
    };

    renderMissionCard(props);

    expect(screen.getByText("2 x Apple")).toBeInTheDocument();
    expect(screen.getByText("23 New Avenue, NY")).toBeInTheDocument();
    expect(screen.getByText("06-06-2020")).toBeInTheDocument();
  });
});
