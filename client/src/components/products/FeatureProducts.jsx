import React from "react";
import { Link } from "react-router-dom";
import icons from "../../assets/icons";
import Ratings from "../Ratings";

const FeatureProducts = ({ products }) => {
  const { AiFillHeart, FaCartShopping, FaEye } = icons;
  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Sản Phẩm Nổi Bật</h2>
          <div className="w-[100px] h-[4px] bg-red-500 mt-4"></div>
        </div>
      </div>
      <div className="w-full grid grid-cols-5 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.map((p, i) => (
          <div
            key={i}
            className="border-2 group transition-all duration-500 hover:shadow-md hover:-mt-3"
          >
            <div className="relative overflow-hidden">
              {p.discount ? (
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs right-2 top-2">
                  -{p.discount}%
                </div>
              ) : (
                ""
              )}
              <img
                className="sm:w-full w-full h-[240px] p-5"
                src={p.images[0]}
                alt="product image"
              />
              <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all">
                  <AiFillHeart />
                </li>
                <Link
                  to={`/product/details/1`}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <FaEye />
                </Link>
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all">
                  <FaCartShopping />
                </li>
              </ul>
            </div>
            <div className="py-3 text-slate-600 px-2">
              <h2 className="font-medium text-blue-500">{p.brand}</h2>
              <h2>{p?.name?.slice(0, 25)}...</h2>
              <div className="flex justify-start items-center gap-3">
                <span className="text-lg font-bold text-red-500">{(p.price / 1000).toLocaleString("vi-VN", {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3
                })}đ</span>
                <div className="flex">
                  <Ratings ratings={p.rating} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
