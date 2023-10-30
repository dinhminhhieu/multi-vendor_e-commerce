import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  get_seller_order,
  seller_order_status_update,
} from "../../store/Reducers/orderReducer";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { order, errorMessage, successMessage } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(get_seller_order(orderId));
  }, [orderId]);

  const [status, setStatus] = useState("");
  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);
  const status_update = (e) => {
    dispatch(
      seller_order_status_update({ orderId, info: { status: e.target.value } })
    );
    setStatus(e.target.value);
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
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-medium">Chi tiết đơn hàng</h2>
          <select
            onChange={status_update}
            value={status}
            name=""
            id=""
            className="py-2 px-4 hover:border-indigo-500 outline-none border border-slate-400 rounded-md"
          >
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="warehouse">Kho hàng</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
        <div className="p-4">
          <div className="text-base text-red-500 font-medium">
            <h2>Mã đơn hàng: #{order._id}</h2>
          </div>
          <span className="text-base font-medium text-green-600">
            Ngày đặt hàng: {order.date}
          </span>
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="pr-3 text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="font-medium text-base">
                    Đơn vị giao hàng: {order?.shippingInfo}
                  </h2>
                </div>
                <p>
                  Đơn giá:{" "}
                  <span className="text-base text-red-500 font-bold">
                    {(order?.price / 1000).toLocaleString("vi-VN", {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })}
                    đ
                  </span>
                </p>
                <div className="flex justify-start items-center gap-3">
                  <h2 className="text-blue-500 font-medium">
                    Trạng thái thanh toán:{" "}
                  </h2>
                  <span
                    className={`py-[1px] text-xs px-3 ${
                      order?.payment_status === "paid"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    } rounded-md `}
                  >
                    {order?.payment_status}
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-4">
                  {order?.products?.map((p, i) => (
                    <div key={i} className="flex gap-3 text-md">
                      <img
                        className="w-[50px] h-[50px]"
                        src={p.images[0]}
                        alt=""
                      />
                      <div>
                        <Link className="text-sm">{p.name}</Link>
                        <p>
                          <span className="text-sm text-blue-600 font-medium">
                            Thương hiệu : {p.brand}
                          </span>
                          <h2 className="text-sm">Số lượng: {p.quantity}</h2>
                        </p>
                      </div>
                    </div>
                  ))}
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
