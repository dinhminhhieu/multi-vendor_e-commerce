import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import icons from "../../assets/icons";
import Ratings from "../Ratings";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_cart,
  messageClear,
  add_to_wishlist,
} from "../../store/Reducers/cartReducer";
import toast from "react-hot-toast";

const FeatureProducts = ({ products }) => {
  const { AiFillHeart, FaCartShopping, FaEye } = icons;

  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const add_cart = (id) => {
    if (userInfo) {
      dispatch(
        add_to_cart({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const add_wishlist = (pro) => {
    dispatch(
      add_to_wishlist({
        userId: userInfo.id,
        productId: pro._id,
        name: pro.name,
        price: pro.price,
        image: pro.images[0],
        discount: pro.discount,
        rating: pro.rating,
        slug: pro.slug,
      })
    );
  };

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-3xl text-red-600 font-bold relative pb-[45px]">
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
              <Link to={`/product/details/${p.slug}`}>
                <img
                  className="sm:w-full w-full h-[240px] p-5"
                  src={p.images[0]}
                  alt="product image"
                />
              </Link>
              <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                <li
                  onClick={() => add_wishlist(p)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <AiFillHeart />
                </li>
                <Link
                  to={`/product/details/${p.slug}`}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <FaEye />
                </Link>
                <li
                  onClick={() => add_cart(p._id)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <FaCartShopping />
                </li>
              </ul>
            </div>
            <div className="py-3 text-slate-600 px-2">
              <h2 className="font-medium text-blue-500">{p.brand}.</h2>
              <Link to={`/product/details/${p.slug}`}>
                {p?.name.length > 25 ? p?.name?.slice(0, 25) + "..." : p?.name}
              </Link>
              <div className="flex justify-start items-center gap-2 m-[2px]">
                <span className="text-base font-bold line-through">
                  {(p.price / 1000).toLocaleString("vi-VN", {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })}
                  đ
                </span>
                <span className="text-lg font-bold text-red-500">
                  {(
                    (p.price - Math.floor(p.price * p.discount) / 100) /
                    1000
                  ).toLocaleString("vi-VN", {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })}
                  đ
                </span>
              </div>
              <div className="flex justify-start items-center">
                <Ratings ratings={p.rating} />
                <h2 className="font-medium text-green-600 ml-10">
                  Số lượng: {p.quantity}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
