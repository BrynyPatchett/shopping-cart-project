
import '@testing-library/jest-dom';
import { describe, expect, vi } from "vitest"
import { useOutletContext,BrowserRouter,useParams,MemoryRouter} from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import Product from '../product/product';
import {
    render,
    screen,
} from "@testing-library/react";

let setCart;
let x = [];
setCart = function(args){
     x = args;
}


vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal()
    return {
      ...mod,
      // replace some exports
      useParams: vi.fn(),
      useOutletContext: vi.fn(),
    }
  })
       vi.mocked(useOutletContext).mockReturnValue({ products: 
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
            ],
             cart: [x,setCart]
        });
            vi.mocked(useParams).mockReturnValueOnce({productID: '0'});
    
describe("Product Render", () => {
    it("Render Does not exist prompt on invalid ID",  () => {
        render(<Product/>,{wrapper:BrowserRouter})
        expect(screen.getByText('Sorry this product does not exist'));
    })

    vi.mocked(useParams).mockReturnValue({productID: '1'});
    it("Render Product information",  () => {
        render(<Product/>,{wrapper:BrowserRouter})
        expect(screen.getByText("Test"));
        expect(screen.getByText("$109.95"));
        expect(screen.getByText("Test Description"))
        expect(screen.getByRole('img')).toHaveAttribute('src', "testImage");
    })
    it("Render Product with quantity select defaulted to 1",  () => {
        render(<Product/>,{wrapper:BrowserRouter})
        expect(screen.getByText("1"));
    })
    it("Render Product clicking quantity selector buttons increases and decreases quantity value ",  async () => {
        const user = userEvent.setup()
        render(<Product/>,{wrapper:BrowserRouter})
        await user.click(screen.getByText("+"));
        expect(screen.getByText("2"));
        await user.click(screen.getByText("-"));
        expect(screen.getByText("1"));
    })

    it("Render Product clicking quantity selector buttons decreases quantity value cannot go below 1 ",  async () => {
        const user = userEvent.setup()
        render(<Product/>,{wrapper:BrowserRouter})
        expect(screen.getByText("1"));
        await user.click(screen.getByText("-"));
        expect(screen.getByText("1"));
    })

    it("Item added to cart",  async () => {

        const user = userEvent.setup()
        render(<Product/>,{wrapper:BrowserRouter})
        await user.click(screen.getByText("Add to Cart"));
        expect(x[0].itemCount).toBe(1);
    })
    it("Items added to cart",  async () => {

        const user = userEvent.setup()
        render(<Product/>,{wrapper:BrowserRouter})
        await user.click(screen.getByText("+"));
        await user.click(screen.getByText("+"));
        await user.click(screen.getByText("Add to Cart"));
        expect(x[0].itemCount).toBe(3);
    })
})


