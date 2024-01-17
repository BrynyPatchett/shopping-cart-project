import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.jsx'
import RouteError from './routeError.jsx'
import Product from './components/product/product.jsx'
import Products from './components/products/products.jsx'
import {  loader as rootLoader } from './routes/root.jsx'
import './index.css'

const router = createBrowserRouter([{
  path: "/",
  element: <Root />,
  errorElement: <RouteError />,
  loader: rootLoader,
  children: [
    {
      errorElement: <RouteError />,
      children: [
        {
          path: "home",
          element: <p>HOMEPAGE</p>,
          // loader: rootLoader,
        },
        {
          path: "products",
          element: <Products/>
        },
        {
          path: "product/:productID",
          element:<Product/>,
          errorElement: <p>Sorry, this product does not exist.</p>
        },
        {
          path: "*",
          element: <RouteError />
        }
      ]
    }

  ]
},],)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
