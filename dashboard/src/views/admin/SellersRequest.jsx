import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";
import { Link } from "react-router-dom";
import Pagiantion from "../Pagiantion";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_request } from "../../store/Reducers/sellerReducer";
import Search from "../components/Search";

const SellersRequest = () => {
  const { FaEye } = icons;
  const dispatch = useDispatch();
  const { sellers, totalSeller } = useSelector((state) => state.seller);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(
      get_seller_request({
        parPage,
        searchValue,
        page: currentPage,
      })
    );
  }, [parPage, searchValue, currentPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-white rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-sm uppercase border-b border-slate-700">
              <tr>
                <th className="py-3 px-4" scope="col">
                  STT
                </th>
                <th className="py-3 px-4" scope="col">
                  Họ và tên
                </th>
                <th className="py-3 px-4" scope="col">
                  Email
                </th>
                <th className="py-3 px-4" scope="col">
                  Trạng thái
                </th>
                <th className="py-3 px-4" scope="col">
                  Thanh toán
                </th>
                <th className="py-3 px-4" scope="col">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((d, i) => (
                <tr className="border-b border-slate-600" key={i}>
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
                    <span>{d.status}</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>{d.payment}</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/dashboard/sellers/details/${d._id}`}
                        className="p-[5px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        <FaEye color="white" size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalSeller <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagiantion
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellersRequest;
