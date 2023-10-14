import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import icons from "../assets/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../api/api";

const Dashboard = () => {
  const {
    FaList,
    RxDashboard,
    RiProductHuntLine,
    BsHeart,
    BsChat,
    TfiLock,
    FiLogOut,
  } = icons;
  const [filterShow, setFilterShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await api.get("/customer/logout");
      localStorage.removeItem("customerToken");

      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <Header />
      <div className="bg-slate-200 mt-5">
        <div className="w-[90%] mx-auto pt-5 md-lg:block hidden">
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center py-3 px-3 bg-red-500 text-white"
            >
              <FaList />
            </button>
          </div>
        </div>
        <div className="h-full mx-auto">
          <div className="py-8 flex md-lg:w-[90%] mx-auto relative">
            <div
              className={` rounded-md z-50 md-lg:absolute ${
                filterShow ? "-left-4" : "-left-[360px]"
              } w-[270px] ml-4 bg-white`}
            >
              <ul className="py-4 text-slate-600 px-4">
                <li className="flex justify-start items-center gap-2 py-4">
                  <span className="text-xl">
                    <RxDashboard />
                  </span>
                  <Link to="/dashboard" className="block">
                    Bảng điều khiển
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-4">
                  <span className="text-xl">
                    <RiProductHuntLine />
                  </span>
                  <Link to="/dashboard/my-orders" className="block">
                    Đơn hàng của tôi
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-4">
                  <span className="text-xl">
                    <BsHeart />
                  </span>
                  <Link to="/dashboard/my-wishlist" className="block">
                    Danh sách yêu thích
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-4">
                  <span className="text-xl">
                    <BsChat />
                  </span>
                  <Link to="/dashboard/chat" className="block">
                    Trò chuyện
                  </Link>
                </li>

                <li className="flex justify-start items-center gap-2 py-4">
                  <span className="text-xl">
                    <TfiLock />
                  </span>
                  <Link to="/dashboard/chage-password" className="block">
                    Bảo mật tài khoản
                  </Link>
                </li>
                <li
                  onClick={logout}
                  className="flex justify-start items-center gap-2 py-4 cursor-pointer"
                >
                  <span className="text-xl">
                    <FiLogOut />
                  </span>
                  <div className="block">Đăng xuất</div>
                </li>
              </ul>
            </div>
            <div className="w-[calc(100%-270px)] md-lg:w-full">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
