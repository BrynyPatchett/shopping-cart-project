import { useState } from 'react'
import Navbar from '../components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import styles from './root.module.css'
import logoSplash from './logo_splash.svg'


function Root() {

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
    {
      text: "Product broken",
      path: "product/2"
    },
  ]

  return (
    <>
      <header className={styles.header}><img src={logoSplash} alt="" /></header>
      <Navbar navlinks={NavbarLinks}/>
      <div className='main'>
        <Outlet/>
      </div>
    </>
  )
}

export default Root;
