import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  profile_image_upload,
  messageClear,
  profile_info_add
} from "../../store/Reducers/authReducer";
import { overrideStyle } from "../../utils/utils";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import {create_stripe_connect_account} from '../../store/Reducers/sellerReducer'

const Profile = () => {
  const { BsImages, FaEdit } = icons;
  const dispatch = useDispatch();
  const { userInfo, loader, successMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    shopName: "",
    province: "",
    district: "",
    ward: "",
  });

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const add_pro = (e) => {
    e.preventDefault();
    dispatch(profile_info_add(state))
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-white rounded-md">
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img className="w-full h-full" src={userInfo.image} alt="" />
                  {loader && (
                    <div className="bg-white absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-black border-dashed hover:border-indigo-500 relative"
                  htmlFor="img"
                >
                  <span>
                    <BsImages />
                  </span>
                  <span>Chọn ảnh</span>
                  {loader && (
                    <div className="bg-white absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={add_image}
                type="file"
                className="hidden"
                id="img"
              />
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#eeeeee] rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit color="white" />
                </span>
                <div className="flex gap-2">
                  <span>Họ tên: </span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex gap-2">
                  <span>Email: </span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-2">
                  <span>Role: </span>
                  <span>{userInfo.role}</span>
                </div>
                <div className="flex gap-2">
                  <span>Trạng thái: </span>
                  <span>{userInfo.status}</span>
                </div>
                <div className="flex gap-2">
                  <span>Tài khoản thanh toán: </span>
                  <p>
                    {userInfo.payment === "active" ? (
                      <span className="bg-green-500 text-white text-xs cursor-default font-normal px-2 py-1 rounded-md">
                        {userInfo.payment}
                      </span>
                    ) : (
                      <span onClick={() => dispatch(create_stripe_connect_account())} className="bg-red-500 cursor-pointer text-white text-xs cursor-default font-medium px-2 py-1 rounded-md">
                        Nhấn để kích hoạt
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-0 md:px-5 py-2">
              {!userInfo?.shopInfo ? (
                <form onSubmit={add_pro}>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="Shop">Tên shop</label>
                    <input
                      onChange={inputHandle}
                      value={state.shopName}
                      type="text"
                      name="shopName"
                      id="Shop"
                      placeholder="Nhập tên shop..."
                      className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md  focus:border-indigo-500 overflow-hidden"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="province">Tỉnh/Thành phố</label>
                    <input
                      onChange={inputHandle}
                      value={state.province}
                      type="text"
                      name="province"
                      id="province"
                      placeholder="Nhập tỉnh/thành phố..."
                      className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md focus:border-indigo-500 overflow-hidden"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="district">Quận/Huyện</label>
                    <input
                      onChange={inputHandle}
                      value={state.district}
                      type="text"
                      name="district"
                      id="district"
                      placeholder="Nhập tên quận/huyện..."
                      className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md focus:border-indigo-500 overflow-hidden"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="ward">Xã/Phường</label>
                    <input
                      onChange={inputHandle}
                      value={state.ward}
                      type="text"
                      name="ward"
                      id="ward"
                      placeholder="Nhập tên xã/phường..."
                      className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md focus:border-indigo-500 overflow-hidden"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loader ? true : false}
                      className="group relative text-white w-[200px] h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md bg-red-500 hover:bg-red-600"
                    >
                      {loader ? (
                        <PropagateLoader
                          color="#fff"
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        "Thêm thông tin"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#eeeeee] rounded-md relative">
                  <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaEdit color="white" />
                  </span>
                  <div className="flex gap-2">
                    <span>Tên shop: </span>
                  <span>{userInfo.shopInfo.shopName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Tỉnh/Thành phố: </span>
                    <span>{userInfo.shopInfo.province}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Quận/Huyện: </span>
                    <span>{userInfo.shopInfo.district}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Xã/Phường: </span>
                    <span>{userInfo.shopInfo.ward}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
            <div className="bg-white rounded-md p-4">
              <h1 className="text-lg mb-3 font-semibold">
                Thay đổi mật khẩu
              </h1>
              <form>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Nhập email..."
                    className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md focus:border-indigo-500 overflow-hidden"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="old_pass">Mật khẩu cũ</label>
                  <input
                    type="password"
                    name="old_pass"
                    id="old_pass"
                    placeholder="Nhập mật khẩu cũ..."
                    className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md focus:border-indigo-500 overflow-hidden"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="new_pass">Mật khẩu mới</label>
                  <input
                    type="password"
                    name="new_pass"
                    id="new_pass"
                    placeholder="Nhập mật khẩu mới..."
                    className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md focus:border-indigo-500 overflow-hidden"
                  />
                </div>
                <div className="flex justify-end">
                  <button className="bg-red-500 hover:shadow-red-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2">
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
