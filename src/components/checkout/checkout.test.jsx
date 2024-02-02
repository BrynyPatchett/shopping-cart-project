import '@testing-library/jest-dom';
import { describe, expect, vi } from "vitest"
import { useOutletContext, BrowserRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";

import {
    fireEvent,
    render,
    screen, rerender,
    waitFor,
} from "@testing-library/react";
import Checkout from './checkout';
import { Simulate } from 'react-dom/test-utils';

let setCart;
let cart = [];
setCart = function (args) {
    cart = args;
}


vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal()
    return {
        ...mod,
        useOutletContext: vi.fn(),
    }
})
vi.mocked(useOutletContext).mockReturnValueOnce({
    cart: [cart, setCart]
});

describe("Render Checkout", () => {

    it("Checkout renders empty message", () => {
        render(<Checkout />, { wrapper: BrowserRouter })
        expect(screen.getByText('Cart is Empty'));
    })
    let price = 100;
    let itemcount = 3;
    cart = [
        {
            product: {
                productID: 1,
                title: 'Test',
                price: price,
                imagesrc: 'testImage',

            },
            itemCount: itemcount
        }
    ]
    vi.mocked(useOutletContext).mockReturnValue({
        cart: [cart, setCart]
    });

    it("Checkout renders single item in cart with correct total", () => {
        render(<Checkout />, { wrapper: BrowserRouter })
        expect(screen.getByText('Test'));
        expect(screen.getByText(`${price}`));
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', `testImage`);
        expect(screen.getByText(`Total: $${(price * itemcount).toFixed(2)}`));
    })

    it("Checkout removes single item in cart", async () => {
        const user = userEvent.setup()
        render(<Checkout />, { wrapper: BrowserRouter })
        expect(screen.getByText('Test'));
        expect(screen.getByText(`${price}`));
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', `testImage`);
        const elem = (screen.getAllByRole('button')[0]);
        await fireEvent.click(elem);
        expect(cart).toStrictEqual([]);

    })

    it("Checkout renders multiple items with correct total", async () => {


        let itemcount = 3;
        cart = [
            {
                product: {
                    productID: 1,
                    title: 'Test 1',
                    price: 100,
                    imagesrc: 'testImage1',

                },
                itemCount: itemcount
            },
            {
                product: {
                    productID: 2,
                    title: 'Test 2',
                    price: 200,
                    imagesrc: 'testImage2',

                },
                itemCount: itemcount
            },
            {
                product: {
                    productID: 3,
                    title: 'Test 3',
                    price: 300,
                    imagesrc: 'testImage3',

                },
                itemCount: itemcount
            }
        ]
        vi.mocked(useOutletContext).mockReturnValue({
            cart: [cart, setCart]
        });

        render(<Checkout />, { wrapper: BrowserRouter })
        expect(screen.getByText('Test 1'));
        expect(screen.getByText(`${price}`));
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', `testImage1`);
        expect(screen.getByText('Test 2'));
        expect(screen.getByText(`${price}`));
        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', `testImage2`);
        expect(screen.getByText('Test 3'));
        expect(screen.getByText(`${price}`));
        expect(screen.getAllByRole('img')[4]).toHaveAttribute('src', `testImage3`);
        expect(screen.getByText(`Total: $${((100 * itemcount) + (200 * itemcount) + (300 * itemcount)).toFixed(2)}`));
    })

    it("Checkout removes items from cart", async () => {


        let itemcount = 3;
        cart = [
            {
                product: {
                    productID: 1,
                    title: 'Test 1',
                    price: 100,
                    imagesrc: 'testImage1',

                },
                itemCount: itemcount
            },
            {
                product: {
                    productID: 2,
                    title: 'Test 2',
                    price: 200,
                    imagesrc: 'testImage2',

                },
                itemCount: itemcount
            },
            {
                product: {
                    productID: 3,
                    title: 'Test 3',
                    price: 300,
                    imagesrc: 'testImage3',

                },
                itemCount: itemcount
            }
        ]
        vi.mocked(useOutletContext).mockReturnValue({
            cart: [cart, setCart]
        });
        render(<Checkout />, { wrapper: BrowserRouter })
        expect(cart.length).toBe(3);
        expect(screen.getByText('Test 1'));
        expect(screen.getByText(`${price}`));
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', `testImage1`);
        await fireEvent.click(screen.getAllByRole('button')[0]);
        expect(cart.length).toBe(2);
    
    })






})