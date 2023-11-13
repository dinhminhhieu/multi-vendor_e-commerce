import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_order } from "../../store/Reducers/orderReducer";

const Order = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { myOrder, products } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(get_order(orderId));
  }, [orderId]);

  return (
    <div className="bg-white p-5">
      <h1 className="text-2xl font-semibold text-center mb-2">
        Chi tiết đơn hàng
      </h1>
      <h2 className="text-red-600 font-semibold">
        Mã đơn hàng: #{myOrder._id}
        <h2 className="text-green-500">
          Ngày đặt hàng: <span>{myOrder.date}</span>
        </h2>
      </h2>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-slate-600 font-semibold">
            Giao hàng đến: {myOrder.shippingInfo?.name}
          </h2>
          <p>
            <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              Nhà riêng
            </span>
            <span className="text-slate-600 text-sm">
              {myOrder.shippingInfo?.address}, {""}
              {myOrder.shippingInfo?.ward}, {""}
              {myOrder.shippingInfo?.district}, {""}
              {myOrder.shippingInfo?.province}
            </span>
          </p>
          <p className="text-slate-600 text-sm font-semibold">
            Email: {userInfo.email}
          </p>
        </div>
      </div>
      <div className="text-slate-600">
        <p>
          Đơn giá:{" "}
          <span className="text-base text-red-500 font-bold">
            {(myOrder.price / 1000).toLocaleString("vi-VN", {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            })}
            đ
          </span>
        </p>
        <p>
          Trạng thái thanh toán:{" "}
          <span
            className={`py-[1px] text-xs px-3 ${
              myOrder.payment_status === "paid"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            } rounded-md `}
          >
            {myOrder.payment_status}
          </span>
        </p>
        <p>
          Tình trạng đơn hàng:{" "}
          <span
            className={`py-[1px] text-xs px-3 ${
              myOrder.delivery_status === "placed"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            } rounded-md `}
          >
            {myOrder.delivery_status}
          </span>
        </p>
      </div>
      <div className="mt-3">
        <h2 className="text-slate-600 text-lg pb-2 font-semibold">
          Sản phẩm đã mua
        </h2>
        <div className="flex gap-5 flex-col">
          {myOrder.products?.map((p, i) => (
            <div key={i}>
              <div className="flex gap-5 justify-start items-center text-slate-600">
                <div className="flex gap-2">
                  <img
                    className="w-[55px] h-[55px]"
                    src={p.images[0]}
                    alt="image"
                  />
                  <div className="flex text-sm flex-col justify-start items-start">
                    <Link to={`/product/details/${p.slug}`}>{p.name}</Link>
                    <p>
                      <span className="text-sm text-blue-600 font-medium">
                        Thương hiệu : {p.brand}
                      </span>
                      <h2>Số lượng: {p.quantity}</h2>
                    </p>
                  </div>
                  <div className="pl-4 flex justify-end">
                    <span className="text-base line-through">
                      {(p.price / 1000).toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                      đ
                    </span>
                    <span className="text-lg text-red-500 font-bold ml-2">
                      {(
                        (p.price - Math.floor((p.price * p.discount) / 100)) /
                        1000
                      ).toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                      đ
                    </span>
                    <p className="ml-6 font-bold text-red-500">
                      (Giảm {p.discount}%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
