import React, { useState } from "react";
import Search from "../components/Search";
import icons from "../../assets/icons";
import { Link } from "react-router-dom";
import Pagiantion from "../Pagiantion";

const Discount = () => {
  const { FaEdit, FaEye, FaTrash } = icons;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-white rounded-md">
        <Search
          setParPage={setParPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className="relative overflow-x-auto mt-5">
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
                      Tên sản phẩm
                    </th>
                    <th className="py-3 px-4" scope="col">
                      Danh mục
                    </th>
                    <th className="py-3 px-4" scope="col">
                      Thương hiệu
                    </th>
                    <th className="py-3 px-4" scope="col">
                      Giá bán
                    </th>
                    <th className="py-3 px-4" scope="col">
                      Giảm giá
                    </th>
                    <th className="py-3 px-4" scope="col">
                      Số lượng
                    </th>
                    <th className="py-3 px-4" scope="col">
                      Hành động
                    </th>
                  </tr>
            </thead>
            <tbody className="text-sm font-normal">
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
                      src={`http://localhost:3000/images/categories/${d}.png`}
                      alt=""
                    />
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>Áo Polo siêu chất lượng </span>
                  </td>
                   <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>Áo Polo</span>
                  </td>
                                     <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>Mimo</span>
                  </td>
                                     <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>100.000</span>
                  </td>
                                     <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>5%</span>
                  </td>
                                     <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>50</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link className="p-[5px] text-white bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                        <FaEdit size={15} />
                      </Link>
                      <button className="p-[5px] text-white bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                        <FaTrash size={15} />
                      </button>
                      <Link className="p-[5px] text-white bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        <FaEye size={15} />
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

export default Discount;
