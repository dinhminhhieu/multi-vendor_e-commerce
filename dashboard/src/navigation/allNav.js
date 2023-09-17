import icons from "../assets/icons";

const { AiFillDashboard, AiOutlineShoppingCart } = icons;

export const allNav = [
  {
    id: 1,
    title: "Bảng Điều Khiển",
    icon: <AiFillDashboard size={20} />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Đơn Hàng",
    icon: <AiOutlineShoppingCart size={20}/>,
    role: "admin",
    path: "/admin/orders",
  },
];
