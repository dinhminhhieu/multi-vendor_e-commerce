import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddProducts = () => {
  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    quantity: "",
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-white text-xl font-semibold">Thêm Sản Phẩm</h1>
          <Link
            className="bg-red-500 hover:shadow-red-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
            to="/seller/dashboard/products"
          >
            Sản Phẩm
          </Link>
        </div>
        <div>
          <form>
            <div className="flex flex-col mb-3 md:flex-row gap-4 text-white">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Tên sản phẩm</label>
                <input
                  onClick={handleInput}
                  value={state.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nhập tên sản phẩm..."
                  className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Thương hiệu</label>
                <input
                  onClick={handleInput}
                  value={state.name}
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Nhập tên thương hiệu..."
                  className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
