import { getByText, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import Root from "./root";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter, Outlet } from "react-router-dom";
import Carousel from "../components/carousel/carousel";

describe(//check loading is displayed when page loads
"Root component loading", () => {
  it("renders Loading Component", () => {
    render(<Root />, { wrapper: BrowserRouter });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  //check loading is removed when page loads
  it("Loading removed on data load", async () => {
    render(<Root />, { wrapper: BrowserRouter });
    await waitFor(() => {
      const loadingText = screen.queryByText("Loading...");
      expect(loadingText).not.toBeInTheDocument();
    });
  });
});
