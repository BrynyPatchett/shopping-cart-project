import { createFactory, useState } from "react";
import { useOutletContext, useParams, useRouteLoaderData } from "react-router-dom";
import styles from "./product.module.css";
import productPlaceHolder from "./logo_placeholder.jpg";

function Product() {
  const {
    cart: [cart,setCart],
    products
  } = useOutletContext();

  const [itemCount, setItemCount] = useState(1);

  let { productID } = useParams();


  const product = products[0].find((elem) => (elem.productID === Number(productID)));
  if (product === undefined) {
    return (<p>Sorry this product does not exist</p>)
  }


  function incrementCount() {
    setItemCount((itemCount) => itemCount + 1);
  }
  function decrementCount() {
    if (itemCount > 1) {
      setItemCount((itemCount) => itemCount - 1);
    }
  }

  /*If the item already exists in the cart update it, else add it to the cart */
  function updateCart() {
    const updateCart = [...cart];
    const order = updateCart.find(cItem => cItem.product.productID === product.productID);
    if (order === undefined) {
      setCart([...cart, { product, itemCount }])
    } else {
      order.itemCount = order.itemCount + itemCount;
      setCart(updateCart);
    }
    //reset the current amount to one
    setItemCount(1);
  }

  return (
    <>
      <div className={styles.product}>
        <h1 className={styles.productTitle}>{product.title}</h1>
        <div className={styles.display}>
          <div className={styles.imageContainer}>
            <img src={product.imagesrc} alt="" />
          </div>
          <div className={styles.infoContainer}>
            <p>
              {product.description}
            </p>
            <div className={styles.priceContainer}><h2>Price</h2><h2>{'$' + (product.price * itemCount).toFixed(2)}</h2></div>
          </div>
        </div>
        <div className={styles.orderNumber}>
          <button onClick={decrementCount}> - </button>
          <div>{itemCount}</div>
          <button onClick={incrementCount}> + </button>
        </div>
        <button className={styles.buttonAddCart} onClick={() => updateCart()}> Add to Cart </button>
      </div>
    </>
  );
}

export default Product;
