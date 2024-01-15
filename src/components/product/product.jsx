import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./product.module.css";
import productPlaceHolder from "./logo_placeholder.jpg";

function Product() {
  const [itemCount, setItemCount] = useState(1);
  const product = {
    title: "Placeholder Product",
    price: 5.99,
    description:
      "A great description of this great product, look at it. Isn't it Great?! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ipsum fugiat eveniet voluptas suscipit, accusantium magnam aperiam earum odio officiis quas amet repellendus. Ex et nesciunt dolorem consequuntur laboriosam adipisci?",
    imgsrc: productPlaceHolder,
  };

  let { productID } = useParams();
  console.log(productID);

  //this will need to be later changed to a look up to see if ID exists in data, throw error if ID not exist
  if (productID >= "3") {
    throw new Error("Sorry this product does not exist");
  }

  function incrementCount() {
    setItemCount((itemCount) => itemCount + 1);
  }
  function decrementCount() {
    if (itemCount > 1) {
      setItemCount((itemCount) => itemCount - 1);
    }
  }

  return (
    <>
    <div className={styles.product}>
    <h1 className={styles.productTitle}>{product.title}</h1>
      <div className={styles.display}>
        <div className={styles.imageContainer}>
          <img src={productPlaceHolder} alt="" />
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
      <button className={styles.buttonAddCart} onClick={null}> Add to Cart </button>
    </div>
    </>
  );
}

export default Product;
