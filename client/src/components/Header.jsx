import React, { useState } from "react";
import icons from "../assets/icons";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const {
    AiOutlineMail,
    FaFacebookF,
    GrInstagram,
    BsTwitter,
    BsGithub,
    MdOutlineKeyboardArrowDown,
    FaUser,
    FaLock,
    FaList,
  } = icons;

  const user = true;
  const [showSideBar, setShowSideBar] = useState(false);
  const {pathname} = useLocation()
  console.log(pathname)

  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#eeeeee] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex justify-start items-center gap-8">
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <AiOutlineMail size={20} />
                </span>
                <span className="font-medium">dinhminhhieuvn@gmail.com</span>
              </li>
              <span className="font-medium">Welcome to SnapDeal</span>
            </ul>
            <div>
              <div className="flex justify-center items-center gap-10">
                <div className="flex justify-center items-center gap-4">
                  <a href="https://www.facebook.com/profile.php?id=100058689467091">
                    <FaFacebookF />
                  </a>
                  <a href="https://www.instagram.com/hieuminh833/">
                    <GrInstagram />
                  </a>
                  <a href="https://twitter.com/dinhminhhieuvn">
                    <BsTwitter />
                  </a>
                  <a href="https://github.com/dinhminhhieu">
                    <BsGithub />
                  </a>
                </div>
                <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]">
                  <img
                    className="w-[40px]"
                    src="http://localhost:3000/images/vietnam-flag.jpg"
                    alt=""
                  />
                  <span>
                    <MdOutlineKeyboardArrowDown size={18} />
                  </span>
                  <ul className="absolute invisible transition-all to-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                    <li>Tiếng Việt</li>
                    <li>English</li>
                  </ul>
                </div>
                {user ? (
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm"
                    to="/dashboard"
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span className="font-medium">Đinh Minh Hiếu</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm"
                  >
                    <span>
                      <FaLock />
                    </span>
                    <span className="font-medium">ĐĂNG NHẬP</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-white">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <Link to="/" className="w-[180px] h-[50px]">
                  <img
                    src="http://localhost:3000/images/Snapdeal_2016.svg"
                    alt="logo"
                    className="w-full h-full"
                  />
                </Link>
                <div
                  onClick={() => setShowSideBar(false)}
                  className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>
            <div className="md-lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                <ul className="flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden">
                    <li>
                        <Link className={`p-2 block ${pathname === '/' ? 'text-[#33cc33]' : 'text-slate-600'}`}>Trang chủ</Link>
                    </li>
                    <li>
                        <Link className={`p-2 block ${pathname === '/shop' ? 'text-[#33cc33]' : 'text-slate-600'}`}>Cửa hàng</Link>
                    </li>
                    <li>
                        <Link className={`p-2 block ${pathname === '/blog' ? 'text-[#33cc33]' : 'text-slate-600'}`}>Blog</Link>
                    </li>
                    <li>
                        <Link className={`p-2 block ${pathname === '/contact' ? 'text-[#33cc33]' : 'text-slate-600'}`}>Liên hệ</Link>
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
