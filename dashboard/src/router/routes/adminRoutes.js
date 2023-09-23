import { lazy } from "react";
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));
const Categories = lazy(() => import("../../views/admin/Categories"));
const Sellers = lazy(() => import("../../views/admin/Sellers"));
const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest"));
const DeactiveSellers = lazy(() => import("../../views/admin/DeactiveSellers"));
const SellersRequest = lazy(() => import("../../views/admin/SellersRequest"));
const SellersDetails = lazy(() => import("../../views/admin/SellersDetails"));
const ChatSellers = lazy(() => import("../../views/admin/ChatSellers"));
const OrdersDetails = lazy(() => import("../../views/admin/OrdersDetails"));

export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/orders",
    element: <Orders />,
    role: "admin",
  },
  {
    path: "admin/dashboard/categories",
    element: <Categories />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers",
    element: <Sellers />,
    role: "admin",
  },
  {
    path: "admin/dashboard/payment-request",
    element: <PaymentRequest />,
    role: "admin",
  },
  {
    path: "admin/dashboard/deactive-sellers",
    element: <DeactiveSellers />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers-request",
    element: <SellersRequest />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers/details/:sellerId",
    element: <SellersDetails />,
    role: "admin",
  },
  {
    path: "admin/dashboard/chat-sellers",
    element: <ChatSellers />,
    role: "admin",
  },
  {
    path: "admin/dashboard/orders/details/:orderId",
    element: <OrdersDetails />,
    role: "admin",
  },
];
