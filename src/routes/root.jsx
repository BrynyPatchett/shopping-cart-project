import { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import styles from './root.module.css'
import logoSplash from './logo_splash.svg'
import { useLoaderData } from 'react-router-dom';


function Root() {

  const data = useLoaderData();


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
      
      {(data.products && <div className={styles.main}>
        <Outlet />
      </div>)}
      {(data.error && <div className={styles.main}> {data.error}
      </div>)}
    </div>
  )
}

export default Root;



export async function loader(){
  try {
    let products = await getProductsData();
    return {products};
  } catch (error) {
    return {error:error.message};
  }
 
}

async function getProductsData (){
  try{
    const response = await fetch('https://fakestoreapi.com/products?limit=5');
    if(!response.ok ){
      throw new Error(`There was an HTTP error in API response ${response.status}`)
    }
    let data = await response.json();
    console.log(data);
    return data;
  }catch(err){
    // console.log(err.message);
    throw new Error(err.message)
  }
}