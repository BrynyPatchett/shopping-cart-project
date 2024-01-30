import { findByText, getByText, render, screen, waitFor, rerender, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import Root from "./root";
import "@testing-library/jest-dom";
import { UserEvent, userEvent } from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Outlet, RouterProvider, createBrowserRouter, Route, Routes } from "react-router-dom";
import RouteError from "../routeError";
import Homepage from "../components/homepage/homepage";
import Products from "../components/products/products";
import Product from "../components/product/product";
import Checkout from "../components/checkout/checkout";
import Carousel from "../components/carousel/carousel";
import { describe, expect } from "vitest";
import rootDef from "./rootDef";



const router = createBrowserRouter(rootDef)

describe(
  "Root component loading", () => {
    it("renders Loading Component", async () => {
      render(<RouterProvider router={router} />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

describe(
  "Root component loading loads api and displayes on main page", () => {
    it("renders Loading Component", async () => {
      render(<RouterProvider router={router} />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      await waitFor(() => expect(screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")).toBeInTheDocument(), {
        timeout: 2000,
      });
    });
  });


describe(
  "Root component loading loads api and displayes on main page", () => {
    it("renders Loading Component", async () => {
      const user = userEvent.setup()
      const main = render(<MemoryRouter >
        <Routes>
          <Route element={<Root />}>
          <Route path="/" element={<Homepage/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/product/:productID" element={<Product/>} />
          </Route>
        </Routes>
      </MemoryRouter>);

      await waitFor(() => expect(main.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")).toBeInTheDocument(), {
        timeout: 2000,
      });
     ;
      await user.click(main.getByText("Products"))
      await user.click(main.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"))
      main.debug()
    });
  });
