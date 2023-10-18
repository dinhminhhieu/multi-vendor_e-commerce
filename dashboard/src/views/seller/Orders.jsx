import React, { useState, useEffect } from "react";
import icons from "../../assets/icons";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Pagiantion from "../Pagiantion";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_orders } from "../../store/Reducers/orderReducer";

const Orders = () => {
  const { FaEye } = icons;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const dispatch = useDispatch();
  const { totalOrder, myOrders } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      get_seller_orders({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
        sellerId: userInfo._id
      })
    );
  });

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-white rounded-md">
        <Search
          setParPage={setParPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-sm uppercase border-b border-slate-700">
              <tr>
                <th className="py-3 px-4" scope="col">
                  Mã đơn hàng
                </th>
                <th className="py-3 px-4" scope="col">
                  Đơn giá
                </th>
                <th className="py-3 px-4" scope="col">
                  Thanh toán
                </th>
                <th className="py-3 px-4" scope="col">
                  Tình trạng đơn hàng
                </th>
                <th className="py-3 px-4" scope="col">
                  Ngày đặt hàng
                </th>
                <th className="py-3 px-4" scope="col">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders?.map((d, i) => (
                <tr key={i}>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    #{d?._id}
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>
                      {(d?.price / 1000).toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}{" "}
                      đ
                    </span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span
                      className={`py-[1px] text-xs px-3 ${
                        d?.payment_status === "paid"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } rounded-md `}
                    >
                      {d?.payment_status}
                    </span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span
                      className={`py-[1px] text-xs px-3 ${
                        d?.delivery_status === "placed"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } rounded-md `}
                    >
                      {d?.delivery_status}
                    </span>
                  </td>
                                    <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    {d?.date}
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/dashboard/order/order-details/${d?._id}`}
                        className="p-[5px] text-white bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        <FaEye size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalOrder <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagiantion
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
