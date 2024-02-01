
import '@testing-library/jest-dom';
import { describe } from 'vitest'
import ProductCard from './productcard'
import { render,screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'


describe("Product Card render",() => {
    it("Product card renders with no props", ()=>{
        render(<ProductCard/>,{wrapper:BrowserRouter})
        expect(screen.findByText("asd"));
    })
    it("Product card renders with all props", ()=>{
        const productInfo ={
            productId:1, title:"test product", price:25, imagesrc:"testimage"
        }
        render(<ProductCard {...productInfo} />,{wrapper:BrowserRouter})
        expect(screen.getByRole('link')).toHaveAttribute('href', `/product/${productInfo.productId}`);
        expect(screen.getByRole('img')).toHaveAttribute('src', `${productInfo.imagesrc}`);
        expect(screen.getByText(productInfo.title));
        expect(screen.getByText(`$${productInfo.price}`));
    })
})

