import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import icons from "../assets/icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Ratings from "../components/Ratings";

const Details = () => {
  const {
    MdOutlineKeyboardArrowRight,
    AiFillHeart,
    FaFacebookF,
    GrInstagram,
    BsTwitter,
    BsGithub,
  } = icons;
  const images = [1, 2, 3, 4, 5, 6, 7, 8];
  const discount = 50;
  const stock = 5;
  const [image, setImage] = useState("");
  const [state, setState] = useState("reviews");
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
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  <Ratings ratings={4.5} />
                </div>
                <span className="text-green-500">(23 đánh giá)</span>
              </div>
              <span className="text-blue-500">Thương hiệu: cellphoneS</span>
              <div className="text-2xl text-red-500 font-bold flex gap-3">
                {discount ? (
                  <>
                    <span>Giá bán: </span>
                    <h2 className="line-through">100000đ</h2>
                    <h2>
                      {100000 - Math.floor((100000 * discount) / 100)}đ (Giảm{" "}
                      {discount}%)
                    </h2>
                  </>
                ) : (
                  <h2>Giá bán: 100000đ</h2>
                )}
              </div>
              <div className="text-slate-600">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <div className="flex gap-3 pb-10 border-b">
                {stock ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl">
                      <div className="px-6 cursor-pointer">-</div>
                      <div className="px-5">5</div>
                      <div className="px-6 cursor-pointer">+</div>
                    </div>
                    <div>
                      <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-red-500 text-white">
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div>
                  <div className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white">
                    <AiFillHeart />
                  </div>
                </div>
              </div>
              <div className="flex py-5 gap-5">
                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                  <span>Số lượng: </span>
                  <span>Chia sẻ: </span>
                </div>
                <div className="flex flex-col gap-5">
                  <span className={`text-${stock ? "green" : "red"}-500`}>
                    {stock ? `(${stock}) sản phẩm` : "Hết hàng"}
                  </span>
                  <ul className="flex justify-start items-center gap-3">
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white"
                        href="#"
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:text-white flex justify-center items-center bg-[#E1306C] rounded-full text-white"
                        href="#"
                      >
                        <GrInstagram />
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:text-white flex justify-center items-center bg-[#1D9BF0] rounded-full text-white"
                        href="#"
                      >
                        <BsTwitter />
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:text-white flex justify-center items-center bg-black rounded-full text-white"
                        href="#"
                      >
                        <BsGithub />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3">
                {stock ? (
                  <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white">
                    Mua ngay
                  </button>
                ) : (
                  ""
                )}
                <Link className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-green-500 text-white block">
                  Chat với người bán
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="flex flex-wrap">
            <div className="w-[72%] md-lg:w-full">
              <div className="pr-4 md-lg:pr-0">
                <div className="grid grid-cols-2">
                  <button
                    onClick={() => setState("reviews")}
                    className={`py-1 hover:text-white px-5 hover:bg-red-500 ${
                      state === "reviews"
                        ? "bg-red-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Đánh giá
                  </button>
                  <button
                    onClick={() => setState("description")}
                    className={`py-1 px-5 hover:text-white hover:bg-red-500 ${
                      state === "description"
                        ? "bg-red-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Mô tả sản phẩm
                  </button>
                </div>
                <div>
                  {state === "reviews" ? (
                    "reviews"
                  ) : (
                    <p className="py-5 text-slate-600">Mô tả sản phẩm</p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[28%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
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
