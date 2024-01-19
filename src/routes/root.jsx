import { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import styles from './root.module.css'
import logoSplash from './logo_splash.svg'
import { useRouteLoaderData } from 'react-router-dom';
import Footer from '../components/footer/footer';


function Root() {

  const data = useRouteLoaderData("root");
  const [cart,setCart] = useState([]);

  useEffect(()=>{
    console.log(cart);
  },[cart])


  const NavbarLinks = [
    {
      text: "Home",
      path: "/"
    },
    {
      text: "Products",
      path: "products"
    },
    {
      text: "Product Fav",
      path: "product/1"
    },
  ]



  return (
    <div className={styles.root}>
      <header className={styles.header}><img src={logoSplash} alt="" /></header>
      <Navbar navlinks={NavbarLinks} cart={cart} />

      {(data.products && <div className={styles.main}>
        <Outlet context={[cart,setCart]}/>
      </div>)}
      {(data.error && <div className={styles.main}> {data.error}
      </div>)}
      <Footer/>
    </div>
  )
}

export default Root;



export async function loader() {
  try {
    let products = await getProductsData();
    return { products };
  } catch (error) {
    return { error: error.message };
  }

}

async function getProductsData() {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=13');
    if (!response.ok) {
      throw new Error(`There was an HTTP error in API response ${response.status}`)
    }
    let data = await response.json();
    let products = data.map((elem) => (
      {
        productID: elem.id,
        title: elem.title, price: elem.price, description: elem.description,
        imagesrc:elem.image,
      }
    ))
    console.log(products);
    return products;
  } catch (err) {
    // console.log(err.message);
    throw new Error(err.message)
  }
}