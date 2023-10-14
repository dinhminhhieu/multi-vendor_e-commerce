import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Orders = () => {
  const [state, setState] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-600">Đơn hàng của tôi</h2>
        <select
          className="outline-none px-3 py-1 border rounded-md text-slate-600"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">--Tình trạng đơn hàng---</option>
          <option value="placed">Đã giao</option>
          <option value="pending">Đang xử lý</option>
          <option value="cancelled">Đã hủy</option>
          <option value="warehouse">Kho hàng</option>
        </select>
      </div>
      <div className="pt-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Mã đơn hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Đơn giá
                </th>
                <th scope="col" className="px-6 py-3">
                  Trang thái thanh toán
                </th>
                <th scope="col" className="px-6 py-3">
                  Tình trạng đơn hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((o, i) => (
                <tr key={i} className="bg-white border-b">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {o._id}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    ${o.price}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {o.payment_status}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {o.delivery_status}
                  </td>
                  <td scope="row" className="px-6 py-4">
                    <Link to={`/dashboard/order/details/${o._id}`}>
                      <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-[1px] rounded">
                        Xem
                      </span>
                    </Link>
                    {o.payment_status !== "paid" && (
                      <span
                        
                        className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-[1px] rounded cursor-pointer"
                      >
                        Thanh toán
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;