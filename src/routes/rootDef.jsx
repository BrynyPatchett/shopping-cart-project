import RouteError  from "../routeError";
import Homepage from "../components/homepage/homepage";
import Product from "../components/product/product";
import Products from "../components/products/products";
import Checkout from "../components/checkout/checkout";
import Root from "./root";
import {RouterProvider,createBrowserRouter}from "react-router-dom";
const rootDef = [{
    path: "/",
    element: <Root />,
    errorElement: <RouteError />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          {
            path: "/",
            element: <Homepage/>,
          
          },
          {
            path: "products",
            element: <Products/>
          },
          {
            path: "product/:productID",
            element:<Product/>,
          },
          {
              path: "checkout",
              element: <Checkout />
          },
          {
            path: "*",
            element: <RouteError />
          }
        ]
      }
  
    ]
  },]

  export default rootDef;