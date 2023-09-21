import React, { useState } from "react";
import Pagiantion from "../Pagiantion";
import icons from "../../assets/icons";
import { Link } from "react-router-dom";

const Sellers = () => {
  const { FaEye } = icons;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center">
          <select
            name=""
            id=""
            className="py-2 px-4 hover:border-indigo-500 outline-none bg-[#283046] border border-slate-400 rounded-md text-white"
            onChange={(e) => setParPage(parseInt(e.target.value))}
          >
            <option value="5">5</option>
            <option value="5">15</option>
            <option value="5">25</option>
          </select>
          <input
            type="text"
            id="name"
            placeholder="Tìm kiếm..."
            className="w-[250px] px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
          />
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-sm text-white uppercase border-b border-slate-700">
              <tr>
                <th className="py-3 px-4" scope="col">
                  STT
                </th>
                <th className="py-3 px-4" scope="col">
                  Hình ảnh
                </th>
                <th className="py-3 px-4" scope="col">
                  Họ và tên
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
                  Phân loại
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
              {[1, 2, 3, , 4, 5].map((d, i) => (
                <tr key={i}>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    {d}
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <img
                      className="w-[45px] h-[45px]"
                      src={`http://localhost:3000/images/sellers/${d}.png`}
                      alt=""
                    />
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>Đinh Minh Hiếu</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>dinhminhhieuvn@gmail.com</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>Thời trang</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>Hoạt động</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>Gò Vấp</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>Gò Vấp</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link className="p-[5px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        <FaEye size={20} />
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

export default Sellers;
