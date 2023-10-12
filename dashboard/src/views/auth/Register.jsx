import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners"; // Tạo các hiệu ứng loader hoặc tiến trình tải
import { overrideStyle } from "../../utils/utils";
import {
  messageClear,
  seller_register,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";

const Register = () => {
  const { AiOutlineEye, AiOutlineEyeInvisible } = icons;
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(seller_register(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/")
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center">
          <img
            src="http://localhost:3000/images/Snapdeal_2016.svg"
            alt="logo"
            className="w-[50%] h-[50%] mt-4"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-[#e60042]">
          ĐĂNG KÝ TÀI KHOẢN
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form from action="" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Họ và tên
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required
                  placeholder="Nhập họ và tên ví dụ: Nguyễn Văn A"
                  className="appearance-none block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-red-500 focus:border-red-500 sm:text-sm"
                  onChange={handleInput}
                  value={state.name}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  placeholder="Nhập email ví dụ: abc@gmail.com"
                  className="appearance-none block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-red-500 focus:border-red-500 sm:text-sm"
                  onChange={handleInput}
                  value={state.email}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="password"
                  required
                  placeholder="Nhập mật khẩu"
                  className="appearance-none block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus: ring-red-500 focus:border-red-50 sm:text-sm"
                  onChange={handleInput}
                  value={state.password}
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer text-red-500"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer text-red-500"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center">
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
            <div>
              <button
                type="submit"
                disabled={loader ? true : false}
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "ĐĂNG KÝ"
                )}
              </button>
            </div>
            <div className="flex items-center w-full">
              <h4>Bạn đã có tài khoản?</h4>
              <Link
                to="/login"
                className="text-red-600 pl-2 text-sm font-medium"
              >
                ĐĂNG NHẬP
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
