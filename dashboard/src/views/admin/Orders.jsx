import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";
import { Link } from "react-router-dom";
import Pagiantion from "../Pagiantion";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_orders } from "../../store/Reducers/orderReducer";

const Orders = () => {
  const { BsArrowBarDown, FaEye } = icons;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { myOrders, totalOrder } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(
      get_admin_orders({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
      })
    );
  });

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <select
            name=""
            id=""
            className="py-2 px-4 hover:border-indigo-500 outline-none bg-white border border-slate-400 rounded-md"
            onChange={(e) => setParPage(parseInt(e.target.value))}
          >
            <option value="5">5</option>
            <option value="15">15</option>
            <option value="25">25</option>
          </select>
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="w-[250px] px-3 py-2 outline-none border bg-transparent border-slate-400 rounded-md focus:border-indigo-500 overflow-hidden"
          />
        </div>
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left [#d0d2d6]">
            <div className="text-sm border-b border-slate-700 uppercase font-medium">
              <div className="flex justify-between items-start">
                <div className="py-3 w-[25%]">Mã đơn hàng</div>
                <div className="py-3 w-[13%]">Đơn giá</div>
                <div className="py-3 w-[18%]">Trạng thái thanh toán</div>
                <div className="py-3 w-[18%]">Tình trạng đơn hàng</div>
                <div className="py-3 w-[18%]">Hành động</div>
                <div className="py-3 w-[8%]">
                  <BsArrowBarDown size={20} />
                </div>
              </div>
            </div>
            {myOrders.map((o, i) => (
              <div>
                <div className="flex justify-between items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                    #{o?._id}
                  </div>
                  <div className="py-4 w-[13%]">
                    <span>
                      {(o?.price / 1000).toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}{" "}
                      đ
                    </span>
                  </div>
                  <div className="py-4 w-[18%]">
                    {" "}
                    <span
                      className={`py-[1px] text-xs px-3 ${
                        o?.payment_status === "paid"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } rounded-md `}
                    >
                      {o?.payment_status}
                    </span>
                  </div>
                  <div className="py-4 w-[18%]">
                    <span
                      className={`py-[1px] text-xs px-3 ${
                        o?.delivery_status === "placed"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } rounded-md `}
                    >
                      {o?.delivery_status}
                    </span>
                  </div>
                  <div className="py-4 w-[18%]">
                    <Link to={`/admin/dashboard/orders/details/${o?._id}`}>
                      <FaEye
                        size={25}
                        color="white"
                        className="p-[5px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      />
                    </Link>
                  </div>
                  <div
                    className="py-4 w-[8%] cursor-pointer"
                    onClick={() => setShow(o._id)}
                  >
                    <BsArrowBarDown size={20} />
                  </div>
                </div>
                <div
                  className={
                    show === o?._id
                      ? "block border-b border-slate-700 bg-gray-500"
                      : "hidden"
                  }
                >
                  {o.suborder.map((so, i) => (
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                        #{so?._id}
                      </div>
                      <div className="py-4 w-[13%]">
                        <span>
                          {(so?.price / 1000).toLocaleString("vi-VN", {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                          })}{" "}
                          đ
                        </span>
                      </div>
                      <div className="py-4 w-[18%]">{so?.payment_status}</div>
                      <div className="py-4 w-[18%]">{so?.delivery_status}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
              showItem={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
