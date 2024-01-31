import {
  findByText,
  getByText,
  render,
  screen,
  waitFor,
  rerender,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import Root from "./root";
import { http, HttpResponse } from "msw";
import "@testing-library/jest-dom";
import { UserEvent, userEvent } from "@testing-library/user-event";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import RouteError from "../routeError";
import Homepage from "../components/homepage/homepage";
import { describe, expect } from "vitest";
import { setupServer } from "msw/node";
import Products from "../components/products/products";
import Product from "../components/product/product";
import Checkout from "../components/checkout/checkout";

// Set up a Mock Service Worker server with the provided request handlers
const server = setupServer(
  http.get("https://fakestoreapi.com/products", () => {
    // Simulate a successful response with mock data
    return HttpResponse.json([
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: { rate: 3.9, count: 120 },
      },
      {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts ",
        price: 22.3,
        description:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        category: "men's clothing",
        image:
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        rating: { rate: 4.1, count: 259 },
      },
      {
        id: 3,
        title: "Mens Cotton Jacket",
        price: 55.99,
        description:
          "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        rating: { rate: 4.7, count: 500 },
      },
    ]);
  })
);
// Start the server before running your tests
beforeAll(() => server.listen());
// Reset and stop the server after all tests finish
afterAll(() => server.resetHandlers(), server.close());

//GOOD PATHS
describe("Rendering Routes", () => {
  it("Renders Loading Component", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Root />}>
            <Route path="/" element={<Homepage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("API on (Homepage)", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Root />}>
            <Route path="/" element={<Homepage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.queryByText(
          "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        )
      ).toBeInTheDocument()
    );
  });

  it("API data  on (Products Page)", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <Routes>
          <Route element={<Root />}>
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("All Items")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText(
          "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        )
      ).toBeInTheDocument()
    );
  });

  it("API data on (Product/:ProductID Page)", async () => {
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route element={<Root />}>
            <Route path="/product/:productID" element={<Product />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getByText(
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
        )
      ).toBeInTheDocument()
    );
  });

  it("API data (Product/:ProductID Page) and Item visble on checkout page", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route element={<Root />}>
            <Route path="/product/:productID" element={<Product />} />
            <Route path="/Checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getByText(
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
        )
      ).toBeInTheDocument()
    );
    await user.click(screen.getByText("Add to Cart"));
    await user.click(screen.getByText("Checkout"));
    expect(screen.getByText("Total: $109.95")).toBeInTheDocument();
    screen.debug()
  });


//BAD PATHS //

  it("Renders Loading Component and API data (Bad Product)", async () => {
    await waitFor(() => expect (render(
          <MemoryRouter initialEntries={["/product/4"]}>
            <Routes>
              <Route element={<Root />} errorElement={<RouteError/>}>
              <Route  path="/" ></Route>
              <Route path="/product/:productID" element={<Product/> } />
              </Route>
            </Routes>
          </MemoryRouter>
        ,)))
        await waitFor(() =>
            expect(screen.queryByText("Sorry this product does not exist")).toBeInTheDocument()
        );
  });
  
  it("Renders Error message on API 404", async () => {
    server.use(
      http.get("https://fakestoreapi.com/products", () => {
        // Simulate a successful response with mock data
        return HttpResponse("Not found", {
          status: 404,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      })
    );
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Root />}>
            <Route path="/" />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getByText("Error Loading data from API, please try again later")
      ).toBeInTheDocument()
    );
  });


  it("Renders Error message on API 404", async () => {
    server.use(
      http.get("https://fakestoreapi.com/products", () => {
        // Simulate a successful response with mock data
        return HttpResponse("Not found", {
          status: 404,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      })
    );
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Root />}>
            <Route path="/" />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getByText("Error Loading data from API, please try again later")
      ).toBeInTheDocument()
    );
  });

  it("Renders Error message on API 404 (Non Homepage)", async () => {
    server.use(
      http.get("https://fakestoreapi.com/products", () => {
        // Simulate a successful response with mock data
        return HttpResponse("Not found", {
          status: 404,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      })
    );

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <Routes>
          <Route element={<Root />}>
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getByText("Error Loading data from API, please try again later")
      ).toBeInTheDocument()
    );
  });
});
