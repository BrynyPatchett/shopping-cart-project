import { useParams } from "react-router-dom"
import styles from './products.module.css'
import productPlaceHolder from "./logo_placeholder.jpg";
import ProductCard from "./product_card/productcard";


function Products({products}){

    const tempArray = [0,1,2,3,4,5,6,7,8,9,10,11];
    console.log(tempArray);
    console.log("hello");
    console.log(products);

    const product = {
        productID:2,
        title: "Placeholder Product",
        price: 5.99,
        imgsrc: productPlaceHolder,
    }


return(<>
<div className={styles.products}>
    <h1>All Items</h1>
    <div className={styles.productsList}>
        {tempArray.map((elem,i)=>{
            return < ProductCard key={elem} productId={product.productID} title={product.title} price={product.price} imgsrc={product.imgsrc}/>
        })}
    </div>
</div>

</>)
}

export default Products;