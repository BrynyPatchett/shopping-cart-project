import { useParams } from "react-router-dom"

function Product(){
    
    let {productID} = useParams();
    console.log(productID);
    if(productID !== '1'){
        throw new Error("Sorry this product does not exist");
    }
return(<>
<h1>PRODUCT</h1>
</>)
}

export default Product;