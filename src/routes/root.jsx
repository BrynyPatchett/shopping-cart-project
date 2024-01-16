import { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import styles from './root.module.css'
import logoSplash from './logo_splash.svg'


function Root() {
 const[products,setProducts] = useState(null);
 const[loading,setLoading] = useState(true);
 const[error,setError] = useState(null);

  useEffect(()=>{
    console.log("Why hello there");

    async function getProductsData (){
      try{
        const response = await fetch('https://fakestoreapi.com/products?limit=5');
        if(!response.ok ){
          throw new Error(`There was an HTTP error in API response ${response.status}`)
        }
        let data = await response.json();
        setProducts(data);
        setError(null);
        console.log(data);
      }catch(err){
        console.log(err.message);
        setError(err.message);
        setProducts(null)
      }finally{
        setLoading(false);
      }


    }
     getProductsData();
  },[])

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
      <Navbar navlinks={NavbarLinks}/>
      <div className={styles.main}>
        <Outlet products={products}/>
      </div>
    </div>
  )
}

export default Root;
