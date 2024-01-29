import { useParams,useOutletContext } from "react-router-dom"
import styles from './products.module.css'
import productPlaceHolder from "./logo_placeholder.jpg";
import ProductCard from "./product_card/productcard";
import { useRouteLoaderData } from "react-router-dom";


function Products(){
    
    const {
       products
     } = useOutletContext();
    //  console.log(products);

return(<>
<div className={styles.products}>
    <h1>All Items</h1>
    <div className={styles.productsList}>
        {products[0].length && products[0].map((product)=>{
            return <ProductCard key={product.productID} productId={product.productID} title={product.title} price={product.price} imagesrc={product.imagesrc}/>
        })}
    </div>
</div>

</>)
}

export default Products;