import React from "react";
import { render, screen } from "@testing-library/react";

import ThemeProvider from "../ThemeProvider";
import theme from "../../../theme";
import MissionCard from "../MissionCard";

const renderMissionCard = (props) => {
  return render(
    <ThemeProvider theme={theme}>
      <MissionCard {...props} />
    </ThemeProvider>
  );
};

describe("MissionCard", () => {
  it("should render", () => {
    const props = {
      mission: {
        title: "Test title",
        status: "Available",
        pickUpLocation: {
          address: "23 New Avenue, NY",
        },
        pickUpWindow: {
          startTime: "06-06-2020",
        },
      },
    };

    renderMissionCard(props);

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText(/available/i)).toBeInTheDocument();
    expect(screen.getByText("23 New Avenue, NY")).toBeInTheDocument();
    expect(screen.getByText("06-06-2020")).toBeInTheDocument();
  });
});
