import { lazy } from "react";
const Home = lazy(() => import("../../views/Home"));
const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard"));
const AddProducts = lazy(() => import("../../views/seller/AddProducts"));
const Products = lazy(() => import("../../views/seller/Products"));
const Discount = lazy(() => import("../../views/seller/Discount"));

export const sellerRoutes = [
  {
    path: "/",
    element: <Home />,
    ability: ["admin", "seller"],
  },
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    ability: ["seller"],
  },
  {
    path: "/seller/dashboard/add-products",
    element: <AddProducts />,
    ability: ["seller"],
  },
  {
    path: "/seller/dashboard/products",
    element: <Products />,
    ability: ["seller"],
  },
  {
    path: "/seller/dashboard/discount-products",
    element: <Discount />,
    ability: ["seller"],
  },
];
