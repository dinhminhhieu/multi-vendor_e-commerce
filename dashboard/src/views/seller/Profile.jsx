import React from "react";
import icons from "../../assets/icons";
import { FadeLoader } from "react-spinners";

const Profile = () => {
  const image = true;
  const loader = false;
  const status = "active";
  const userInfo = true;
  const { BsImage, FaEdit } = icons;
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#283046] rounded-md text-white">
            <div className="flex justify-center items-center py-3">
              {image ? (
                <label
                  htmlFor="img"
                  className="h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img
                    src="http://localhost:3000/images/admin.png"
                    alt=""
                    className="w-full h-full"
                  />
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  htmlFor="img"
                  className="h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img
                    src="http://localhost:3000/images/admin.png"
                    alt=""
                    className="w-full h-full"
                  />
                  {!loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input type="file" className="hidden" id="img" />
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>
                <div className="flex gap-2">
                  <span>Họ tên: </span>
                  <span>Đinh Minh Hiếu</span>
                </div>
                <div className="flex gap-2">
                  <span>Email: </span>
                  <span>dinhminhhieuvn@gmail.com</span>
                </div>
                <div className="flex gap-2">
                  <span>Role: </span>
                  <span>Seller</span>
                </div>
                <div className="flex gap-2">
                  <span>Trạng thái: </span>
                  <span>Đang hoạt động</span>
                </div>
                <div className="flex gap-2">
                  <span>Tài khoản thanh toán: </span>
                  <p>
                    {status === "active" ? (
                      <span className="bg-red-500 text-white text-sm cursor-default font-medium px-2 py-1 rounded-md">
                        Chờ xử lý
                      </span>
                    ) : (
                      <span className="bg-green-500 text-white text-sm cursor-default font-medium px-2 py-1 rounded-md">
                        Nhấn để kích hoạt
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-0 md:px-5 py-2">
              {!userInfo ? 
                <form>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="Shop">Tên shop</label>
                    <input
                      type="text"
                      name="shopName"
                      id="Shop"
                      placeholder="Nhập tên shop..."
                      className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="province">Tỉnh/Thành phố</label>
                    <input
                      type="text"
                      name="province"
                      id="province"
                      placeholder="Nhập tỉnh/thành phố..."
                      className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="district">Quận/Huyện</label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      placeholder="Nhập tên quận/huyện..."
                      className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="ward">Xã/Phường</label>
                    <input
                      type="text"
                      name="ward"
                      id="ward"
                      placeholder="Nhập tên xã/phường..."
                      className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                    />
                  </div>
                  <div className="flex justify-end">
                  <button className="bg-red-500 hover:shadow-red-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2">
                    Thêm
                  </button>
                  </div>
                </form> :               <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>
                <div className="flex gap-2">
                  <span>Tên shop: </span>
                  <span>High Fashion</span>
                </div>
                <div className="flex gap-2">
                  <span>Tỉnh/Thành phố: </span>
                  <span>Hồ Chí Minh</span>
                </div>
                <div className="flex gap-2">
                  <span>Quận/Huyện: </span>
                  <span>Gò Vấp</span>
                </div>
                <div className="flex gap-2">
                  <span>Xã/Phường: </span>
                  <span>Thạnh Xuân</span>
                </div> 
              </div>
                }
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
                <div className='bg-[#283046] rounded-md text-[#d0d2d6] p-4'>
                  <h1 className='text-[#d0d2d6] text-lg mb-3 font-semibold'>Thay đổi mật khẩu</h1>
                  <form>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Nhập email..."
                      className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="old_pass">Mật khẩu cũ</label>
                    <input
                      type="password"
                      name="old_pass"
                      id="old_pass"
                      placeholder="Nhập mật khẩu cũ..."
                      className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="new_pass">Mật khẩu mới</label>
                    <input
                      type="password"
                      name="new_pass"
                      id="new_pass"
                      placeholder="Nhập mật khẩu mới..."
                      className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
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
