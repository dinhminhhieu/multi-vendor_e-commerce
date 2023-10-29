import React, {useEffect} from "react";
import icons from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "../Ratings";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_cart,
  messageClear,
  add_to_wishlist,
} from "../../store/Reducers/cartReducer";
import toast from "react-hot-toast";

const ShopProducts = ({ styles, products }) => {
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
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-4 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-3`}
    >
      {products.map((p, i) => (
        <div
          key={i}
          className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 border-[3px] ${
            styles === "grid"
              ? "flex-col justify-start items-start"
              : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start"
          } w-full gap-4 bg-white p-1 rounded-md`}
        >
          <div
            className={
              styles === "grid"
                ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden"
                : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
            }
          >
            <img
              className="h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full p-5"
              src={p.images[0]}
              alt="image"
            />
            <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
              <li onClick={() => add_wishlist(p)} className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all">
                <AiFillHeart  />
              </li>
              <Link
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
                to={`/product/details/${p.slug}`}
              >
                <FaEye />
              </Link>
              <li onClick={() => add_cart(p._id)} className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all">
                <FaCartShopping />
              </li>
            </ul>
          </div>
          <div className="flex justify-start items-start flex-col gap-1">
            <h2 className="text-blue-500 font-medium">{p.brand}</h2>
            <h2 className="text-md text-slate-700 font-medium">{p?.name?.slice(0, 20)}...</h2>
            <div className="flex justify-start items-center gap-2">
                <span className="text-lg font-bold text-red-500">{(p.price / 1000).toLocaleString("vi-VN", {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3
                })}đ</span>
              <div className="flex text-lg">
                <Ratings ratings={p.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
