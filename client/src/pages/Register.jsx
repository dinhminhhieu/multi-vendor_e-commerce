import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import icons from "../assets/icons";
import { customer_register } from "../store/Reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const { AiOutlineEye, AiOutlineEyeInvisible } = icons;
  const {loader} = useSelector(state=>state.auth)
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    dispatch(customer_register(state));
  };
  return (
    <div>
      <Header />
      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md">
            <div className="px-8 py-8">
              <h2 className="text-center w-full text-xl text-red-600 font-bold">
                ĐĂNG KÝ
              </h2>
              <div>
                <form onSubmit={register} className="text-slate-600">
                  <div className="flex flex-col gap-1 mb-2">
                    <label className="font-medium" htmlFor="name">
                      Họ và tên
                    </label>
                    <input
                      onChange={inputHandle}
                      value={state.name}
                      type="text"
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                      id="name"
                      name="name"
                      placeholder="Nhập họ và tên ví dụ: Nguyễn Văn A"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label className="font-medium" htmlFor="email">
                      Nhập email
                    </label>
                    <input
                      required
                      onChange={inputHandle}
                      value={state.email}
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
                      required
                      onChange={inputHandle}
                      value={state.password}
                      type={visible ? "text" : "password"}
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
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="checkbox"
                      required
                      className="h-4 w-4 text-red-400 focus:ring-red-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="checkbox"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Đồng ý về{" "}
                      <Link className="text-red-500">Điều khoản dịch vụ</Link> &{" "}
                      <Link className="text-red-500">Chính sách bảo mật</Link>
                    </label>
                  </div>
                  <button className="px-8 py-2 w-full bg-red-500 shadow-lg text-white rounded-md">
                    ĐĂNG KÝ
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
                  Bạn đã đã tài khoản ?{" "}
                  <Link className="text-red-500 font-medium" to="/login">
                    ĐĂNG NHẬP
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

export default Register;
