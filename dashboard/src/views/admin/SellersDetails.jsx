import React from "react";

const SellersDetails = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="w-full flex flex-wrap text-white">
          <div className="w-3/12 flex justify-center items-center py-3">
            <div>
              <img
                src="http://localhost:3000/images/admin.png"
                className="w-full h-[230px]"
                alt=""
              />
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Thông tin cá nhân</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-700 rounded-md">
                <div className="flex gap-2">
                  <span>Họ tên:</span>
                  <span>Đinh Minh Hiếu</span>
                </div>
                <div className="flex gap-2">
                  <span>Email:</span>
                  <span>dinhminhhieuvn@gmail.com</span>
                </div>
                <div className="flex gap-2">
                  <span>Họ tên:</span>
                  <span>Đinh Minh Hiếu</span>
                </div>
                <div className="flex gap-2">
                  <span>role:</span>
                  <span>seller</span>
                </div>
                <div className="flex gap-2">
                  <span>Trạng thái:</span>
                  <span>Hoạt động</span>
                </div>
                <div className="flex gap-2">
                  <span>TK thanh toán:</span>
                  <span>Hoạt động</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Địa chỉ</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-700 rounded-md">
                <div className="flex gap-2">
                  <span>Tên shop:</span>
                  <span>Thời trang nam</span>
                </div>
                <div className="flex gap-2">
                  <span>Tỉnh / Thành phố:</span>
                  <span>Hồ Chí Minh</span>
                </div>
                <div className="flex gap-2">
                  <span>Quận / Huyện:</span>
                  <span>Gò Vấp</span>
                </div>
                <div className="flex gap-2">
                  <span>Xã / Phường:</span>
                  <span>Phường 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form>
            <div className="flex gap-4 py-3">
              <select className="py-2 px-4 hover:border-indigo-500 outline-none bg-[#283046] border border-slate-400 rounded-md text-white">
                <option value="">--Chọn trạng thái--</option>
                <option value="active">Hoạt động</option>
                <option value="deactive">Vô hiệu hóa</option>
              </select>
              <button className="bg-red-500 hover:shadow-red-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 w-[170px]">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellersDetails;
