import { useOutletContext } from 'react-router-dom'
import styles from './checkout.module.css'
import removeIcon from './removeIcon.svg'
function Checkout() {
    const{cart:[cart, setCart]} = useOutletContext();


    function getTotal() {
        return cart.reduce((total, elem) => total + elem.itemCount * elem.product.price, 0);
    }

    function removeFromCart(item) {
        setCart(cart.filter(elem => elem !== item));
    }

    if (cart.length === 0) {
        return (<div className={styles.empty}><h2>Cart is Empty</h2></div>);
    }

    return (
        <>
            <div className={styles.checkout}>
                {
                    cart.map((elem) => {
                        return <div className={styles.checkoutItem} key={elem.product.productID}>
                            <div className={styles.imageContainer}><img src={elem.product.imagesrc}></img></div>
                            <div className={styles.itemTitle}>{elem.product.title}</div>
                            <div className={styles.itemPrice}>{elem.product.price}</div>
                            <div className={styles.itemCount}>{elem.itemCount}</div>
                            <button className={styles.remove} onClick={() => removeFromCart(elem)}><img src={removeIcon}/></button>
                        </div>
                    })
                }
                <div className={styles.checkoutTotal}><h3>Total: ${getTotal().toFixed(2)}</h3></div>
                <div className={styles.buttonContainer}><button>Purchase</button></div>
            </div>
        </>
    )
}

export default Checkout