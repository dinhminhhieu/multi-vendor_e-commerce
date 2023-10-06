import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F3F6Fa]">
      <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <Link to="/" className="w-[180px] h-[50px]">
              <img
                src="http://localhost:3000/images/Snapdeal_2016.svg"
                alt="logo"
                className="w-full h-full"
              />
            </Link>
            <ul className="flex flex-col gap-2 text-slate-600">
              <li>Địa chỉ: TP. Hồ Chí Minh</li>
              <li>Điện thoại : 0386690205</li>
              <li>Email : dinhminhhieuvn@gmail.com</li>
            </ul>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
