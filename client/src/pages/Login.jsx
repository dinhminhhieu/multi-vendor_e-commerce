import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FadeLoader from "react-spinners/FadeLoader";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import icons from "../assets/icons";
import { customer_login, messageClear } from "../store/Reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { AiOutlineEye, AiOutlineEyeInvisible } = icons;
  const [visible, setVisible] = useState(false);
  const { loader, successMessage, errorMessage, userInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(customer_login(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
          <FadeLoader />
        </div>
      )}
      <Header />
      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md">
            <div className="px-8 py-8">
              <h2 className="text-center w-full text-xl text-red-600 font-bold">
                ĐĂNG NHẬP
              </h2>
              <div>
                <form onSubmit={login} className="text-slate-600">
                  <div className="flex flex-col gap-1 mb-2">
                    <label className="font-medium" htmlFor="email">
                      Nhập email
                    </label>
                    <input
                      onChange={inputHandle}
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
                      onChange={inputHandle}
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
