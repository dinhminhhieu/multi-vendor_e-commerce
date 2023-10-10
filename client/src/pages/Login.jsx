import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import icons from "../assets/icons";

const Login = () => {
  const { AiOutlineEye, AiOutlineEyeInvisible } = icons;
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Header />
      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md">
            <div className="px-8 py-8">
              <h2 className="text-center w-full text-xl text-red-600 font-bold">
                ĐĂNG NHẬP
              </h2>
              <div>
                <form className="text-slate-600">
                  <div className="flex flex-col gap-1 mb-2">
                    <label className="font-medium" htmlFor="email">
                      Nhập email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                      id="email"
                      name="email"
                      placeholder="Nhập email ví dụ: abc@gmail.com"
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-4 relative">
                    <label className="font-medium" htmlFor="password">
                      Nhập password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                      id="password"
                      name="password"
                      placeholder="Nhập mật khẩu"
                    />
                    {visible ? (
                      <AiOutlineEye
                        className="absolute right-2 top-2 cursor-pointer text-red-500 mt-7 mr-1"
                        size={25}
                        onClick={() => setVisible(false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute right-2 top-2 cursor-pointer text-red-500 mt-7 mr-1"
                        size={25}
                        onClick={() => setVisible(true)}
                      />
                    )}
                  </div>
                  <button className="px-8 w-full py-2 bg-red-500 shadow-lg hover:shadow-indigo-500/30 text-white rounded-md">
                    ĐĂNG NHẬP
                  </button>
                </form>
                <div className="flex justify-center items-center py-2">
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                  <span className="px-3 text-slate-600">or</span>
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                </div>
              </div>
              <div className="text-center text-slate-600 pt-1">
                <p>
                  Bạn chưa có tài khoản ?{" "}
                  <Link className="text-red-500 font-medium" to="/register">
                    ĐĂNG KÝ
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full h-full p-4">
              <img
                className="w-full h-[95%]"
                src="http://localhost:3000/images/poster1.jpg "
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;