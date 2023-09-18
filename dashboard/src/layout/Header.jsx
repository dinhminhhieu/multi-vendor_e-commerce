import React from "react";
import icons from "../assets/icons";

const Header = ({ showSidebar, setShowSidebar }) => {
  const { FaListAlt } = icons;

  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
      <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#283046] text-white px-5 transition-all">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer"
        >
          <span>
            <FaListAlt size={20} />
          </span>
        </div>
        <div className="hidden md:block">
          <input
            type="text"
            name="search"
            placeholder="Tìm kiếm..."
            className="w-[450px] px-3 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
          />
        </div>
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                  <h2 className="text-sm font-bold">SnapDeal_E-commerce</h2>
                  <span className="text-[14px] w-full font-normal">admin</span>
              </div>
              <img src="http://localhost:3000/images/admin.png" alt="logo_admin" className="w-[45px] h[45px] rounded-full overflow-hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
