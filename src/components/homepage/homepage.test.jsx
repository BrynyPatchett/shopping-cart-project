
import '@testing-library/jest-dom';
import { describe, expect, vi } from "vitest"
import { useOutletContext,BrowserRouter} from "react-router-dom";
import Homepage from './homepage'
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




describe("Homepage renders with item link in carousel", () => {
    it("Render single product in carousel",  () => {
        render(<Homepage/>,{wrapper: BrowserRouter})
        expect(screen.getByText("Test")).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', `/product/1`);
        expect(screen.getByRole('img')).toHaveAttribute('src', `testImage`);
    })
    vi.mocked(useOutletContext).mockReturnValueOnce({ products: 
        [
          [
            {
              productID: 1,
              title: 'Test 1',
              price: 109.95,
              description: 'Test Description',
              imagesrc: 'testImage1',
            },
            {
                productID: 2,
                title: 'Test 2',
                price: 109.95,
                description: 'Test Description',
                imagesrc: 'testImage2',
              },
              {
                productID: 3,
                title: 'Test 3',
                price: 109.95,
                description: 'Test Description',
                imagesrc: 'testImage3',
              },
          ],
          []
        ]});
    
        it("Render multiples product in carousel",  () => {
            render(<Homepage/>,{wrapper: BrowserRouter})
            expect(screen.getByText("Test 1")).toBeInTheDocument();
            expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', `/product/1`);
            expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', `testImage1`);
            expect(screen.getByText("Test 2")).toBeInTheDocument();
            
            expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', `/product/2`);
            expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', `testImage2`);
            expect(screen.getByText("Test 3")).toBeInTheDocument();

            expect(screen.getAllByRole('link')[2]).toHaveAttribute('href', `/product/3`);
            expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', `testImage3`);
        })
})