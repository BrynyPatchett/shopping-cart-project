import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.jsx'
import RouteError from './routeError.jsx'
import Product from './components/product/product.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <Root />,
  errorElement: <RouteError />,

  children: [
    {
      errorElement: <RouteError />,
      children: [
        {
          path: "products",
          element: <h1>HEY THIS IS THE PRODUCT PAGE</h1>,
          errorElement: <h1>WHOOPS</h1>
        },
        {
          path: "product/:productID",
          element:<Product/>,
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
