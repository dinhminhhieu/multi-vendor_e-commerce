import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import icons from "../assets/icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Ratings from '../components/Ratings'

const Details = () => {
  const { MdOutlineKeyboardArrowRight } = icons;
  const images = [1, 2, 3, 4, 5, 6, 7, 8];
  const [image, setImage] = useState("");
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Header />
      <div className='bg-[url("http://localhost:3000/images/banners/1.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">SnapDeal</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 py-5 mb-5">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="flex justify-start items-center text-lg text-slate-600 w-full">
            <Link to="/">Trang chủ</Link>
            <span className="pt-1">
              <MdOutlineKeyboardArrowRight />
            </span>
            <Link to="/">Điện thoại di động</Link>
            <span className="pt-1">
              <MdOutlineKeyboardArrowRight />
            </span>
            <span>Iphone 14 promax</span>
          </div>
        </div>
      </div>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
            <div>
              <div className="p-5 border">
                <img
                  className="h-[450px] w-full"
                  src={
                    image
                      ? `http://localhost:3000/images/categories/${image}.png`
                      : `http://localhost:3000/images/categories/${images[2]}.png`
                  }
                  alt=""
                />
              </div>
              <div className="py-3">
                {images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {images.map((img, i) => {
                      return (
                        <div onClick={() => setImage(img)}>
                          <img
                            className="h-[120px] cursor-pointer"
                            src={`http://localhost:3000/images/categories/${img}.png`}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-2xl font-bold">
                <h2>Iphone 14</h2>
              </div>
              <div className='flex justify-start items-center gap-4'>
                                <div className='flex text-xl'>
                                    <Ratings ratings={4.5} />
                                </div>
                                <span className='text-green-500'>(23 reviews)</span>
                            </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Details;
