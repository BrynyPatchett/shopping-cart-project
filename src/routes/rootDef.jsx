import RouteError  from "../routeError";
import Homepage from "../components/homepage/homepage";
import Products from "../components/product/product";
import Product from "../components/product/product";
import Checkout from "../components/checkout/checkout";
import Root from "./root";
import {RouterProvider,createBrowserRouter}from "react-router-dom";
const router = [{
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
            errorElement: <p>Sorry, this product does not exist.</p>
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