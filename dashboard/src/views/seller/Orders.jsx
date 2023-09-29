import React, { useState } from "react";
import icons from "../../assets/icons";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Pagiantion from "../Pagiantion";

const Orders = () => {
  const { FaEye } = icons;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <Search
          setParPage={setParPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-sm text-white uppercase border-b border-slate-700">
              <tr>
                <th className="py-3 px-4" scope="col">
                  Mã đơn hàng
                </th>
                <th className="py-3 px-4" scope="col">
                  Đơn giá
                </th>
                <th className="py-3 px-4" scope="col">
                  Trạng thái
                </th>
                <th className="py-3 px-4" scope="col">
                  Tình trạng đơn hàng
                </th>
                <th className="py-3 px-4" scope="col">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, , 4, 5].map((d, i) => (
                <tr key={i}>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    1
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    10.000
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span className="py-[2px] px-[6px] bg-slate-700 text-blue-500 rounded-md text-xs">
                      Đang xử lý
                    </span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span className="py-[2px] px-[6px] bg-slate-700 text-blue-500 rounded-md text-xs">
                      Đang xử lý
                    </span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link to={`/seller/dashboard/order/order-details/1`} className="p-[5px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        <FaEye size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagiantion
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
