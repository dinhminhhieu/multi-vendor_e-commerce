import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import icons from "../../assets/icons";
import { Link } from "react-router-dom";
import Pagiantion from "../Pagiantion";
import { useDispatch, useSelector } from "react-redux";
import { get_products } from "../../store/Reducers/productReducer";

const Products = () => {
  const { FaEdit, FaEye, FaTrash } = icons;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector((state) => state.product);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <Search
          setParPage={setParPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className="relative overflow-x-auto mt-5">
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
              {products.map((d, i) => (
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
                    <img
                      className="w-[45px] h-[45px]"
                      src={d.images[0]}
                      alt=""
                    />
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>{d?.name?.slice(0, 20)}...</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>{d.category}</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>{d.brand}</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>{(d.price / 1000).toLocaleString("vi-VN", {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3
                })}đ</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    {d.discount === 0 ? (
                      <span>Không giảm</span>
                    ) : (
                      <span>{d.discount}%</span>
                    )}
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>{d.quantity}</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/dashboard/edit-product/${d._id}`}
                        className="p-[5px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <button className="p-[5px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                        <FaTrash size={18} />
                      </button>
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
        {totalProduct <= parPage ? (
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

export default Products;
