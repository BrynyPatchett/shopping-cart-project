import { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import styles from './root.module.css'
import logoSplash from './logo_splash.svg'
import Footer from '../components/footer/footer';
import Loader from '../components/loader/loader';


function Root() {

  const [data,setData] = useState();
  const [error,setError] = useState(false);

  let initCart = JSON.parse(localStorage.getItem('cart'));
  if(!initCart){
    initCart = [];
  }

  const [cart,setCart] = useState(initCart);

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart));
  },[cart])


  useEffect(()=>{
    async function getProductsData() {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=13',{cors: 'cors'});
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
        setData(products);
      } catch (err) {
        setError(true);
        
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
  ]




  return (
    <div className={styles.root}>
      <header className={styles.header}><img src={logoSplash} alt="" /></header>
      <Navbar navlinks={NavbarLinks} cart={cart} />

      {error?  
       <div className={styles.main}>
       <div>Error Loading data from API, please try again later</div>
     </div> 
      :(data ?
      <div className={styles.main}>
        <Outlet context={{cart:[cart,setCart],products:[data,setData]}}/>
      </div> 
     : <div className={styles.main}><Loader/></div> )}
      {( data && data.error ? <div className={styles.main}> {data.error}
      </div> : <></>)}
      <Footer/>
    </div>
  )
}

export default Root;
