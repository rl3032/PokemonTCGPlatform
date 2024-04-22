import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";

jest.mock("../components/FeatureCards", () => () => (
  <div>FeatureCards component</div>
));

describe("Home component tests", () => {
  it("renders without crashing", () => {
    render(<Home />);
    expect(screen.getByText(/welcome to pokecollector/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /the ultimate platform for all pokémon trading card game/i
      )
    ).toBeInTheDocument();
  });

  it("contains the introductory welcome text", () => {
    render(<Home />);
    const introText = screen.getByText(
      /whether you are a seasoned trainer or just starting out/i
    );
    expect(introText).toBeInTheDocument();
  });

  it("renders the FeatureCards component", () => {
    render(<Home />);
    expect(screen.getByText("FeatureCards component")).toBeInTheDocument();
  });
});
