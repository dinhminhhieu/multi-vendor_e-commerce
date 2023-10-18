import React from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  get_seller_order,
} from "../../store/Reducers/orderReducer";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-white font-medium">Chi tiết đơn hàng</h2>
          <select
            name=""
            id=""
            className="py-2 px-4 hover:border-indigo-500 outline-none bg-[#283046] border border-slate-400 rounded-md text-white"
          >
            <option value="">Chờ xử lý</option>
            <option value="">Đang xử lý</option>
            <option value="">Kho hàng</option>
            <option value="">Đã giao</option>
            <option value="">Đã hủy</option>
          </select>
        </div>
        <div className="p-4">
          <div className="flex gap-2 text-lg text-white">
            <h2>#1</h2>
            <span>22/09/2023</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[32%]">
              <div className="pr-3 text-white text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">Vận chuyển đến: Gò Vấp</h2>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Trạng thái thanh toán: </h2>
                  <span className="py-[2px] px-[6px] bg-green-600 text-white rounded-md text-xs font-medium">
                    Đã thanh toán
                  </span>
                </div>
                <span>Đơn giá: 10.000</span>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="text-white">
                    <div className="flex gap-3 text-md">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/images/categories/1.png`}
                        alt=""
                      />
                      <div>
                        <h2>Áo sơ mi</h2>
                        <p>
                          <span>Thương hiệu: </span>
                          <span>Mohi </span>
                          <span className="text-lg">SL: 2</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 text-md">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/images/categories/1.png`}
                        alt=""
                      />
                      <div>
                        <h2>Áo sơ mi</h2>
                        <p>
                          <span>Thương hiệu: </span>
                          <span>Mohi </span>
                          <span className="text-lg">SL: 2</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
