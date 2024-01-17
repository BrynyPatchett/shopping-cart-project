import { useOutletContext} from 'react-router-dom'
function Checkout() {
    const [cart,setCart] = useOutletContext();
    
    return (
        <>
        <p>Hello From the checkout</p>
        {
            cart.map((elem)=>{
                return <p>{elem.product.title}{elem.product.price} * {elem.itemCount} </p>
            })
        }
        </>
    )
}

export default Checkout