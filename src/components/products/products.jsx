import { useParams } from "react-router-dom"
import styles from './products.module.css'
import productPlaceHolder from "./logo_placeholder.jpg";


function Products(){

    const tempArray = Array(10);
    tempArray[2] = 5;
    console.log(tempArray);
    console.log("hello");

    const product = {
        title: "Placeholder Product",
        price: 5.99,
        imgsrc: productPlaceHolder,
    }


return(<>
<h1>All Items</h1>
</>)
}

export default Products;