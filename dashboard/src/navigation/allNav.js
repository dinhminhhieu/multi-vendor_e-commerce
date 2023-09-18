import icons from "../assets/icons";

const {
  AiFillDashboard,
  AiOutlineShoppingCart,
  BiCategory,
  BiLoaderCircle,
  BiChat,
  FiUser,
  FiUsers,
  MdOutlinePayment,
} = icons;

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
    icon: <AiOutlineShoppingCart size={20} />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "Danh Mục",
    icon: <BiCategory size={20} />,
    role: "admin",
    path: "/admin/dashboard/categories",
  },
  {
    id: 4,
    title: "Người Bán",
    icon: <FiUser size={20} />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    title: "Yêu Cầu Thanh Toán",
    icon: <MdOutlinePayment size={20} />,
    role: "admin",
    path: "/admin/dashboard/payment-request",
  },
  {
    id: 6,
    title: "Tạm Ngừng Người Bán",
    icon: <FiUsers size={20} />,
    role: "admin",
    path: "/admin/dashboard/deactive-sellers",
  },
  {
    id: 7,
    title: "Hỗ Trợ Người Bán",
    icon: <BiLoaderCircle size={20} />,
    role: "admin",
    path: "/admin/dashboard/sellers-request",
  },
  {
    id: 8,
    title: "Chat với Người Bán",
    icon: <BiChat size={20} />,
    role: "admin",
    path: "/admin/dashboard/chat-sellers",
  },
];
