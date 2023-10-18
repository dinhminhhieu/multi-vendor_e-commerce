import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_seller,
  messageClear,
  seller_status_update,
} from "../../store/Reducers/sellerReducer";
import toast from "react-hot-toast";

const SellersDetails = () => {
  const dispatch = useDispatch();
  const { seller, successMessage } = useSelector((state) => state.seller);
  const { sellerId } = useParams();
  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId]);

  const [status, setStatus] = useState("");

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      seller_status_update({
        sellerId,
        status,
      })
    );
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="w-full flex flex-wrap">
          <div className="w-3/12 flex justify-center items-center py-3">
            <div>
              {seller?.image ? (
                <img src={seller?.image} className="w-full h-[230px]" alt="" />
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>Không tìm thấy ảnh!</span>
                </label>
              )}
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Thông tin cá nhân</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#eeeeee] rounded-md">
                <div className="flex gap-2">
                  <span>Mã seller:</span>
                  <span>{seller?._id}</span>
                </div>
                <div className="flex gap-2">
                  <span>Họ tên:</span>
                  <span>{seller?.name}</span>
                </div>
                <div className="flex gap-2">
                  <span>Email:</span>
                  <span>{seller?.email}</span>
                </div>
                <div className="flex gap-2">
                  <span>role:</span>
                  <span>{seller?.role}</span>
                </div>
                <div className="flex gap-2">
                  <span>Trạng thái:</span>
                  <span>{seller?.status}</span>
                </div>
                <div className="flex gap-2">
                  <span>TK thanh toán:</span>
                  <span>{seller?.payment}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Địa chỉ</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#eeeeee] rounded-md">
                <div className="flex gap-2">
                  <span>Tên shop:</span>
                  <span>{seller?.shopInfo?.shopName}</span>
                </div>
                <div className="flex gap-2">
                  <span>Tỉnh / Thành phố:</span>
                  <span>{seller?.shopInfo?.province}</span>
                </div>
                <div className="flex gap-2">
                  <span>Quận / Huyện:</span>
                  <span>{seller?.shopInfo?.district}</span>
                </div>
                <div className="flex gap-2">
                  <span>Xã / Phường:</span>
                  <span>{seller?.shopInfo?.ward}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={submit}>
            <div className="flex gap-4 py-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="py-2 px-4 hover:border-indigo-500 outline-none bg-[#eeeeee] border border-slate-400 rounded-md"
              >
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
