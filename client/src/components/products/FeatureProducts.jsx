import React from "react";
import { Link } from "react-router-dom";
import icons from "../../assets/icons";
import Ratings from "../Ratings";

const FeatureProducts = () => {
  const { AiFillHeart, FaCartShopping, FaEye } = icons;
  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-3xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Sản Phẩm Nổi Bật</h2>
          <div className="w-[100px] h-[4px] bg-red-500 mt-4"></div>
        </div>
      </div>
      <div className="w-full grid grid-cols-5 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {[1, 2, 3, 4, 5].map((p, i) => (
          <div className="w-full h-[340px] bg-[#eeeeee] rounded-lg shadow-sm p-3 relative cursor-pointer">
            <div className="flex justify-between"></div>
            <Link>
              <img
                src={`http://localhost:3000/images/categories/${p}.png`}
                alt=""
                className="w-full h-[170px] object-contain"
              />
            </Link>
            <Link to="/">
              <h5 className="pt-2 text-[15px] text-blue-400 pb-2">Apple</h5>
            </Link>
            <Link>
              <h4 className='"pb-3 font-[500]'>
                ultra Bộ nhớ 128G Mơi Sẵn điện thoai chơi
              </h4>
              <div className="flex">
                <Ratings className="mr-2 cursor-pointer" ratings={4.5} />
              </div>
              <div className="py-2 flex items-center justify-between">
                <div className="flex">
                  <h4 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px]">
                    100000đ
                  </h4>
                </div>
                <span className="font-[400] text-[17px] text-[#6dd268]">
                  10 Đã bán
                </span>
              </div>
            </Link>
            <ul>
              <li className="cursor-pointer bg-[#eeeeee] absolute right-2 top-5">
                <AiFillHeart
                  className="text-red-600"
                  size={23}
                  title="Thêm vào danh sách yêu thích"
                />
              </li>
              <Link className="cursor-pointer bg-[#eeeeee] absolute right-2 top-14">
                <FaEye className="text-green-600" size={23} title="Xem" />
              </Link>
              <li className="cursor-pointer bg-[#eeeeee] absolute right-2 top-24">
                <FaCartShopping className="text-yellow-500" size={20} title="Thêm vào giỏ hàng" />
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
