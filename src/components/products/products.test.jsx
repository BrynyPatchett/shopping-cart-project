
import '@testing-library/jest-dom';
import { describe, expect, vi } from "vitest"
import { useOutletContext,BrowserRouter} from "react-router-dom";
import Products from '../products/products';
import Product from '../product/product';
import {
    render,
    screen,
} from "@testing-library/react";



vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal()
    return {
      ...mod,
      // replace some exports
      useOutletContext: vi.fn(),
    }
  })
       vi.mocked(useOutletContext).mockReturnValueOnce({ products: 
            [
              [
                {
                  productID: 1,
                  title: 'Test',
                  price: 109.95,
                  description: 'Test Description',
                  imagesrc: 'testImage',
                },
              ],
              []
            ]});

describe("Product List Render", () => {
    it("Render single product",  () => {
        render(<Products/>,{wrapper: BrowserRouter})
        expect(screen.getByText("Test")).toBeInTheDocument();
        expect(screen.getByText("$109.95")).toBeInTheDocument();
    })
    vi.mocked(useOutletContext).mockReturnValueOnce({ products: 
        [
          [{
            productID: 1,
            title: 'Test Item 1',
            price: 111.95,
            description: 'Test Item 2 Description',
            imagesrc: 'testImage',
          },
            {
              productID: 2,
              title: 'Test Item 2',
              price: 109.95,
              description: 'Test Description',
              imagesrc: 'testImage',
            },
          ],
          []
        ]});
        it("Render multiple products",  () => {
            render(<Products/>,{wrapper: BrowserRouter})
            expect(screen.getByText("Test Item 1")).toBeInTheDocument();
            expect(screen.getByText("$109.95")).toBeInTheDocument();
            expect(screen.getByText("Test Item 2")).toBeInTheDocument();
            expect(screen.getByText("$111.95")).toBeInTheDocument();
        })
        vi.mocked(useOutletContext).mockReturnValueOnce({ products: [[]]});
            it("Render no products if empty context",  () => {
                render(<Products/>,{wrapper: BrowserRouter})
                expect(screen.queryByText("Test Item 1")).not.toBeInTheDocument();
            })
})
