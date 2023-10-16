import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import icons from "../assets/icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Ratings from "../components/Ratings";
import Reviews from "../components/Reviews";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { get_product } from "../store/Reducers/homeReducer";
import {
  messageClear,
  add_to_cart,
  add_to_wishlist,
} from "../store/Reducers/cartReducer";
import toast from "react-hot-toast";

const Details = () => {
  const {
    MdOutlineKeyboardArrowRight,
    AiFillHeart,
    FaFacebookF,
    GrInstagram,
    BsTwitter,
    BsGithub,
  } = icons;
  const navigate = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { product, moreProducts, relatedProducts } = useSelector(
    (state) => state.home
  );
  const { userInfo } = useSelector((state) => state.auth);
  const { errorMessage, successMessage } = useSelector((state) => state.cart);

  const stock = 5;
  const [image, setImage] = useState("");
  const [state, setState] = useState("reviews");
  const [quantity, setQuantity] = useState(1);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  useEffect(() => {
    dispatch(get_product(slug));
  }, [slug]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  const add_cart = () => {
    if (userInfo) {
      dispatch(
        add_to_cart({
          userId: userInfo.id,
          quantity,
          productId: product._id,
        })
      );
    } else {
      navigate("/login");
    }
  };

  const add_wishlist = () => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          discount: product.discount,
          rating: product.rating,
          slug: product.slug,
        })
      );
    } else {
      navigate("/login");
    }
  };

  const inc = () => {
    if (quantity >= product.stock) {
      toast.error("Hết hàng");
    } else {
      setQuantity(quantity + 1);
    }
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const buy_now = () => {
    let price = 0;
    if (product.discount !== 0) {
      price =
        product.price - Math.floor((product.price * product.discount) / 100);
    } else {
      price = product.price;
    }
    const obj = [
      {
        sellerId: product.sellerId,
        shopName: product.shopName,
        price: quantity * (price - Math.floor((price * 5) / 100)),
        products: [
          {
            quantity,
            productInfo: product,
          },
        ],
      },
    ];
    navigate("/shipping", {
      state: {
        products: obj,
        price: price * quantity,
        shipping_fee: 30000,
        items: 1,
      },
    });
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
            <Link to="/" className="text-sm font-medium">
              Trang chủ
            </Link>
            <span className="pt-1">
              <MdOutlineKeyboardArrowRight />
            </span>
            <Link className="text-sm font-medium">{product.category}</Link>
            <span className="pt-1">
              <MdOutlineKeyboardArrowRight />
            </span>
            <span className="text-sm font-medium">{product.name}</span>
          </div>
        </div>
      </div>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="grid grid-cols-2 md-lg:grid-cols-1">
            <div>
              <div className="p-9 border h-[450px] w-[450px]">
                <img
                  className="h-[400px] w-[400px]"
                  src={image ? image : product.images?.[0]}
                  alt=""
                />
              </div>
              <div className="py-3 w-[500px]">
                {product.images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {product.images.map((img, i) => {
                      return (
                        <div key={i} onClick={() => setImage(img)}>
                          <img
                            className="h-[120px] cursor-pointer"
                            src={img}
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
              <h2 className="font-medium text-lg">{product.name}</h2>
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  <Ratings ratings={product.rating} />
                </div>
                <span className="text-green-500">(23 đánh giá)</span>
              </div>
              <span className="text-blue-500 font-medium">
                Thương hiệu: {product.brand}
              </span>
              {product.discount ? (
                <>
                  <div className="flex gap-3">
                    <h2 className="text-base font-medium text-slate-500">
                      Giá bán:{" "}
                    </h2>
                    <span className="text-base line-through">
                      {(product.price / 1000).toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                      đ
                    </span>
                    <span className="text-xl text-red-500 font-bold ml-2">
                      {(
                        (product.price -
                          Math.floor(
                            (product.price * product.discount) / 100
                          )) /
                        1000
                      ).toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                      đ
                    </span>
                  </div>
                  <h2 className="text-base font-medium text-slate-500 gap-3">
                    Giảm giá:{" "}
                    <span className="text-red-500 font-medium text-lg">
                      {product.discount}%
                    </span>
                  </h2>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-medium text-slate-500">
                    Giá bán:{" "}
                    <span className="text-lg text-red-500 font-bold">
                      {(product.price / 1000).toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                      đ
                    </span>
                  </h2>
                </>
              )}
              <div className="flex gap-3 pb-10 border-b">
                {product.quantity ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl">
                      <div onClick={dec} className="px-4 cursor-pointer">
                        -
                      </div>
                      <div className="px-4">{quantity}</div>
                      <div onClick={inc} className="px-4 cursor-pointer">
                        +
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={add_cart}
                        className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-red-500 text-white"
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div>
                  <div
                    onClick={add_wishlist}
                    className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white"
                  >
                    <AiFillHeart />
                  </div>
                </div>
              </div>
              <div className="flex py-5 gap-5">
                <div className="w-[150px] font-bold text-base flex flex-col gap-5">
                  <span>Số lượng: </span>
                  <span>Chia sẻ: </span>
                </div>
                <div className="flex flex-col gap-5">
                  <span
                    className={`font-medium text-${
                      product.quantity ? "green" : "red"
                    }-500`}
                  >
                    {product.quantity
                      ? `(${product.quantity}) sản phẩm`
                      : "Hết hàng"}
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
                {product.quantity ? (
                  <button
                    onClick={buy_now}
                    className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white"
                  >
                    Mua ngay
                  </button>
                ) : (
                  ""
                )}
                <Link to={`/dashboard/chat/${product.sellerId}`} className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-green-500 text-white block">
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
                    className={`py-1 px-5 ${
                      state === "reviews"
                        ? "bg-red-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm`}
                  >
                    Đánh giá của khách hàng
                  </button>
                  <button
                    onClick={() => setState("description")}
                    className={`py-2 px-5 ${
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
                    <Reviews product={product} />
                  ) : (
                    <p className="py-5 text-slate-600">{product.description}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[25%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
                <div className="px-3 py-2 text-white text-center bg-red-500">
                  <h2>{product.shopName}</h2>
                </div>
                <div className="flex flex-col gap-2 mt-3 p-3">
                  {moreProducts.map((p, i) => {
                    return (
                      <Link to={`/product/details/${p.slug}`} className="block border-2 p-3">
                        <div className="relative h-[270px]">
                          <img className="w-full h-full" src={p.images[0]} />
                          {p.discount !== 0 && (
                            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs right-2 top-2">
                              {p.discount}%
                            </div>
                          )}
                        </div>
                        <h2 className="text-slate-600 py-1">{p.name}</h2>
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
                              (p.price -
                                Math.floor(p.price * p.discount) / 100) /
                              1000
                            ).toLocaleString("vi-VN", {
                              minimumFractionDigits: 3,
                              maximumFractionDigits: 3,
                            })}
                            đ
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Ratings ratings={p.rating} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <h2 className="text-2xl py-8 text-red-600 font-medium">
            Sản phẩm tương tự
          </h2>
          <div>
            <Swiper
              slidesPerView="auto"
              breakpoints={{
                1280: {
                  slidesPerView: 5,
                },
                565: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom_bullet",
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {relatedProducts.map((p, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link to={`/product/details/${p.slug}`} className="block">
                      <div className="relative h-[270px]">
                        <div className="w-full h-full">
                          <img className="w-full h-full" src={p.images[0]} />
                          <div className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500"></div>
                        </div>
                        {p.discount !== 0 && (
                          <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs right-2 top-2">
                            {p.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col gap-1">
                        <h2 className="font-semibold text-sm">
                          {p?.name?.slice(0, 25)}...
                        </h2>
                        <div className="flex justify-start items-center gap-3">
                          <span className="text-base font-bold line-through">
                            {(p.price / 1000).toLocaleString("vi-VN", {
                              minimumFractionDigits: 3,
                              maximumFractionDigits: 3,
                            })}
                            đ
                          </span>
                          <span className="text-lg font-bold text-red-500">
                            {(
                              (p.price -
                                Math.floor(p.price * p.discount) / 100) /
                              1000
                            ).toLocaleString("vi-VN", {
                              minimumFractionDigits: 3,
                              maximumFractionDigits: 3,
                            })}
                            đ
                          </span>
                        </div>
                        <div className="flex">
                          <Ratings ratings={p.rating} />
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="w-full flex justify-center items-center py-10">
            <div className="custom_bullet justify-center gap-3 !w-auto"></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Details;
