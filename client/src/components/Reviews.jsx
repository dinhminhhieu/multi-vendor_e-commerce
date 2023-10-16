import React, { useState, useEffect } from "react";
import Ratings from "../components/Ratings";
import RatingTemp from "../components/RatingTemp";
import icons from "../assets/icons";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import {
  customer_review,
  get_reviews,
  get_product,
  messageClear,
} from "../store/Reducers/homeReducer";
import toast from "react-hot-toast";

const Reviews = ({ product }) => {
  const { BiSolidCheckShield, AiFillStar, CiStar } = icons;
  const [pageNumber, setPageNumber] = useState(1);
  const [parPage, setParPage] = useState(3);
  const [rat, setRat] = useState("");
  const [re, setRe] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, reviews, totalReview, rating_review } = useSelector(
    (state) => state.home
  );

  const review_submit = (e) => {
    e.preventDefault();
    const obj = {
      name: userInfo.name,
      review: re,
      rating: rat,
      productId: product._id,
    };
    dispatch(customer_review(obj));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(
        get_reviews({
          productId: product._id,
          pageNumber,
        })
      );
      dispatch(get_product(product.slug));
      setRat("");
      setRe("");
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (product._id) {
      dispatch(
        get_reviews({
          productId: product._id,
          pageNumber,
        })
      );
    }
  }, [pageNumber, product]);

  return (
    <div className="mt-8">
      <div className="flex gap-10 md:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div>
            <span className="text-4xl font-semibold">{product.rating}</span>
            <span className="text-2xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex text-xl">
            <Ratings ratings={product.rating} />
          </div>
          <p className="text-base text-green-600 font-semibold">
            ({totalReview} đánh giá)
          </p>
        </div>
        <div className="flex gap-2 flex-col py-4">
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={5} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[0]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {rating_review[0]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[1]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {rating_review[1]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[2]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {rating_review[2]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[3]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {rating_review[3]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (rating_review[4]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {rating_review[4]?.sum}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-slate-600 text-xl font-bold py-5">
        Nhận xét về sản phẩm ({totalReview} đánh giá)
      </h2>
      <div className="flex flex-col gap-8 pb-10 pt-4">
        {reviews.map((r, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-1 text-xl">
                <RatingTemp rating={r.rating} />
              </div>
              <span>{r.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-600 text-sm font-medium">
                {r.name}
              </span>
              <BiSolidCheckShield className="text-green-500" size={20} />
              <span className="font-semibold text-green-500">
                Chứng nhận đã mua hàng
              </span>
            </div>
            <p className="text-slate-600 text-sm">{r.review}</p>
          </div>
        ))}
        <div className="flex justify-end">
          {totalReview > 5 && (
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={20}
              parPage={parPage}
              showItem={Math.floor(20 / 3)}
            />
          )}
        </div>
      </div>
      <div>
        {userInfo ? (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <Rating
                onChange={(e) => setRat(e)}
                initialRating={rat}
                emptySymbol={
                  <span className="text-slate-600 text-4xl">
                    <CiStar />
                  </span>
                }
                fullSymbol={
                  <span className="text-[#EDBB0E] text-4xl">
                    <AiFillStar />
                  </span>
                }
              />
            </div>
            <form onSubmit={review_submit}>
              <textarea
                value={re}
                required
                onChange={(e) => setRe(e.target.value)}
                className="border outline-0 p-3 w-full"
                name=""
                id=""
                cols="30"
                rows="5"
              ></textarea>
              <div className="mt-2">
                <button className="py-2 px-5 bg-red-500 text-white rounded-sm">
                  Gửi đánh giá
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Link
              className="py-2 px-5 bg-red-500 text-white rounded-sm"
              to="/login"
            >
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
