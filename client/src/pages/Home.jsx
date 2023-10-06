import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <div className="py-[45px]">
        <FeatureProducts />
      </div>
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto bg-[#eeeeee]">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Sản phẩm mới nhất" />
            </div>
            <div className="overflow-hidden">
              <Products title="Sản phẩm được đánh giá cao nhất" />
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
