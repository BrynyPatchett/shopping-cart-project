import { useState } from 'react'
import Navbar from '../components/navbar/navbar';
import { Outlet } from 'react-router-dom';


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
      <h1>Hello WOrld</h1>
      <Navbar navlinks={NavbarLinks}/>
      <div className='main'>
        <Outlet/>
      </div>
    </>
  )
}

export default Root;
