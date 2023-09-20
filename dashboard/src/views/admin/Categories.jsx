import React, { useState } from "react";
import { Link } from "react-router-dom";
import icons from "../../assets/icons";
import Pagiantion from "../Pagiantion";

const Categories = () => {
  const { FaEdit, FaTrash, FaEye, BsImage, GrClose } = icons;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex justify-between items-center lg:hidden mb-5 p-4 bg-[#283046] rounded-md">
        <h1 className="text-white font-semibold text-lg">Danh mục</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Thêm
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
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
                placeholder="Tìm kiếm danh mục..."
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
                      Danh mục
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
                        <span>Áo Polo</span>
                      </td>
                      <td
                        className="py-3 px-4 font-medium whitespace-nowrap"
                        scope="row"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <Link className="p-[5px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                            <FaEdit size={18} />
                          </Link>
                          <Link className="p-[5px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                            <FaTrash size={18} />
                          </Link>
                          <Link className="p-[5px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
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
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] z-20 top-0 transition-all duration-500`}
        >
          <div className="w-full p-5">
            <div className="bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-white">
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-xl text-white font-semibold mb-4 w-full text-center">
                  Thêm danh mục
                </h1>
                <div
                  onClick={() => setShow(false)}
                  className="block lg:hidden cursor-pointer"
                >
                  <GrClose className="text-white" size={20} />
                </div>
              </div>
              <form>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="">Nhập tên danh mục</label>
                  <input
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="Ví dụ: Tai nghe, quần áo..."
                    className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-col h-[283px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-white"
                  >
                    <span>
                      <BsImage />
                    </span>
                    <span>Chọn ảnh</span>
                  </label>
                </div>
                <input type="file" name="image" id="image" className="hidden" />
                <div>
                  <button className="bg-red-500 w-full hover:shadow-red-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2">
                    Thêm danh mục
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
