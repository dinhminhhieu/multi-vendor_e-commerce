import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNavs } from "../navigation/index";
import icons from "../assets/icons";
import { useSelector, useDispatch } from "react-redux";
import {logout} from '../store/Reducers/authReducer'

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { role } = useSelector((state) => state.auth);
  const { FiLogOut } = icons;
  const [allNav, setAllNav] = useState([]);
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const navs = getNavs(role);
    setAllNav(navs);
  }, [role]);

  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#22292f8] top-0 left-0 z-10`}
      ></div>
      <div
        className={`w-[260px] fixed bg-white z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
          showSidebar ? "left-0" : "-left-[260px] lg:left-0"
        }`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[50px]">
            <img
              src="http://localhost:3000/images/Snapdeal_2016.svg"
              alt="logo"
              className="w-full h-full"
            />
          </Link>
        </div>
        <div className="px-[16px] pt-2">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? "bg-red-600 shadow-red-500/30 text-white duration-500"
                      : "font-normal duration-200"
                  } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 mb-5`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button onClick={() => dispatch(logout({ navigate, role }))} className="font-normal duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-5">
                <span>
                  <FiLogOut size={20} />
                </span>
                <span>Đăng Xuất</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
