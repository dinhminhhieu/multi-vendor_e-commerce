import React, { useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {get_category} from '../store/Reducers/homeReducer'

const Home = () => {
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.home);
  
  useEffect(() => {
    dispatch(get_category())
  })
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <div className="py-[45px]">
        <FeatureProducts />
      </div>
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto bg-white">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Sản phẩm mới nhất" />
            </div>
            <div className="overflow-hidden">
              <Products title="Sản phẩm đánh giá cao" />
            </div>
            <div className="overflow-hidden">
              <Products title="Sản phẩm giảm giá" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
