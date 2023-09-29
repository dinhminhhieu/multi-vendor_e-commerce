import { lazy } from "react";
const Home = lazy(() => import("../../views/Home"));
const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard"));
const AddProducts = lazy(() => import("../../views/seller/AddProducts"));
const Products = lazy(() => import("../../views/seller/Products"));
const Discount = lazy(() => import("../../views/seller/Discount"));
const Orders = lazy(() => import("../../views/seller/Orders"));
const Payments = lazy(() => import("../../views/seller/Payments"));
const SellerToCustomer = lazy(() =>
  import("../../views/seller/SellerToCustomer")
);
const SellerToAdmin = lazy(() => import("../../views/seller/SellerToAdmin"));
const Profile = lazy(() => import("../../views/seller/Profile"));
const EditProduct = lazy(() => import("../../views/seller/EditProduct"));
const OrderDetails = lazy(() => import("../../views/seller/OrderDetails"));

export const sellerRoutes = [
  {
    path: "/",
    element: <Home />,
    ability: ["admin", "seller"],
  },
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/add-products",
    element: <AddProducts />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/edit-product/:productId",
    element: <EditProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/products",
    element: <Products />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/discount-products",
    element: <Discount />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/orders",
    element: <Orders />,
    role: "seller",
    ability: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/order/order-details/:orderId",
    element: <OrderDetails />,
    role: "seller",
    ability: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/payments",
    element: <Payments />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-customers/:customerId",
    element: <SellerToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-customers",
    element: <SellerToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-admin",
    element: <SellerToAdmin />,
    ability: ["active", "deactive, pending"],
  },
  {
    path: "/seller/dashboard/profile",
    element: <Profile />,
    role: "seller",
    status: "active",
  },
];
