import React, { useEffect, useState } from "react";
import Pagiantion from "../Pagiantion";
import icons from "../../assets/icons";
import { Link } from "react-router-dom";
import { get_active_sellers } from "../../store/Reducers/sellerReducer";
import { useDispatch, useSelector } from "react-redux";

const Sellers = () => {
  const { FaEye } = icons;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { sellers, totalSellers } = useSelector((state) => state.seller);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_active_sellers(obj));
  }, [searchValue, currentPage, parPage]);

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
            <option value="5">15</option>
            <option value="5">25</option>
          </select>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="text"
            id="name"
            placeholder="Tìm kiếm..."
            className="w-[250px] px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md focus:border-indigo-500 overflow-hidden"
          />
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-sm uppercase border-b border-slate-700">
              <tr>
                <th className="py-3 px-4" scope="col">
                  STT
                </th>
                <th className="py-3 px-4" scope="col">
                  Hình ảnh
                </th>
                <th className="py-3 px-4" scope="col">
                  Họ tên
                </th>
                <th className="py-3 px-4" scope="col">
                  Email
                </th>
                <th className="py-3 px-4" scope="col">
                  Tên shop
                </th>
                <th className="py-3 px-4" scope="col">
                  Trạng thái
                </th>
                <th className="py-3 px-4" scope="col">
                  Địa chỉ
                </th>
                <th className="py-3 px-4" scope="col">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((d, i) => (
                <tr key={i}>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    {i + 1}
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <img className="w-[45px] h-[45px]" src={d.image} alt="" />
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>{d.name}</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>{d.email}</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>{d.shopInfo?.shopName}</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>{d.status}</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>{d.shopInfo?.province}</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/dashboard/sellers/details/${d._id}`}
                        className="p-[5px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 text-white"
                      >
                        <FaEye size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalSellers <= parPage ? (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagiantion
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalSellers}
              parPage={parPage}
              showItem={4}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Sellers;
