import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icons from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/Reducers/orderReducer";

const Shipping = () => {
  const { MdOutlineKeyboardArrowRight } = icons;
  const [res, setRes] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();
  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    district: "",
    ward: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const save = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, district, ward } = state;
    if (name && address && phone && post && province && district && ward) {
      setRes(true);
    }
  };

  const placeOrder = () => {
    dispatch(
      place_order({
        price,
        products,
        shipping_fee,
        shippingInfo: state,
        userId: userInfo.id,
        navigate,
        items,
      })
    );
  };

  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banners/7.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">SnapDeal</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Trang chủ</Link>
                <span className="pt-2">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Thanh toán</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90] mx-auto py-16">
          <div className="w-full flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm rounded-md">
                  {!res && (
                    <>
                      <h2 className="text-slate-600 font-bold pb-3">
                        Địa chỉ giao hàng
                      </h2>
                      <form onSubmit={save}>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="province">Tỉnh/Thành phố</label>
                            <input
                              onChange={inputHandle}
                              required
                              value={state.province}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="province"
                              placeholder="Nhập tên tỉnh/thành phố ví dụ: Hồ Chí Minh"
                              id="province"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="name">Họ và tên</label>
                            <input
                              onChange={inputHandle}
                              required
                              value={state.name}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="name"
                              placeholder="Nhập họ và tên ví dụ: Nguyễn Văn A"
                              id="name"
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="district">Quận/Huyện</label>
                            <input
                              onChange={inputHandle}
                              required
                              value={state.district}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="district"
                              placeholder="Nhập tên quận/huyện ví dụ: Gò Vấp"
                              id="district"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="post">
                              Mã bưu chính (ZIP code/Postal code)
                            </label>
                            <input
                              onChange={inputHandle}
                              required
                              value={state.post}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="post"
                              placeholder="Nhập Zip code/Postal code ví dụ TP.HCM: 700000"
                              id="post"
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="ward">Xã/Phường</label>
                            <input
                              onChange={inputHandle}
                              required
                              value={state.ward}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="ward"
                              placeholder="Nhập tên xã/phường ví dụ: Thạnh Xuân"
                              id="ward"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                              onChange={inputHandle}
                              required
                              value={state.phone}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="phone"
                              placeholder="Nhập số điện thoại ví dụ: xxxxxxx205"
                              id="phone"
                            />
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                              onChange={inputHandle}
                              required
                              value={state.address}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="address"
                              placeholder="Số nhà/Tòa nhà, tên đường"
                              id="address"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mt-7 w-full">
                            <button className="px-3 py-[8px] rounded-md hover:shadow-red-500/20 hover:shadow-lg bg-red-500 text-white">
                              Lưu
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  {res && (
                    <div className="flex flex-col gap-1">
                      <h2 className="text-slate-600 font-semibold pb-2">
                        Giao hàng đến {state.name}
                      </h2>
                      <p>
                        <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                          Nhà riêng
                        </span>
                        <span className="text-slate-600 text-sm">
                          {state.address}, {state.ward}, {state.district}, {state.province}{" "}
                          {state.area}
                        </span>
                        <span
                          onClick={() => setRes(false)}
                          className="text-red-500 cursor-pointer"
                        >
                          {" "}
                          Thay đổi
                        </span>
                      </p>
                      <p className="text-slate-600 text-sm font-medium">
                        Email: {userInfo.email}
                      </p>
                    </div>
                  )}
                </div>
                {products.map((p, i) => (
                  <div key={i} className="flex bg-white p-4 flex-col gap-2">
                    <div className="flex justify-start items-center">
                      <h2 className="text-md font-medium">
                        Cửa hàng:{" "}
                        <span className="text-red-600 font-medium">
                          {p.shopName}
                        </span>
                      </h2>
                    </div>
                    {p.products.map((pt, j) => (
                      <div key={i + 99} className="w-full flex flex-wrap">
                        <div className="flex sm:w-full gap-2 w-7/12">
                          <div className="flex gap-2 justify-start items-center">
                            <img
                              className="w-[80px] h-[80px]"
                              src={pt.productInfo.images[0]}
                              alt="product image"
                            />
                            <div className="pr-4 text-slate-600">
                              <h2 className="text-md">{pt.productInfo.name}</h2>
                              <span className="text-sm text-blue-600 font-medium">
                                Thương hiệu : {pt.productInfo.brand}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end w-5/12 sm:w-full sm:mt-3">
                          <div className="pl-4 sm:pl-0">
                            <div className="flex justify-between">
                              <span className="text-base line-through">
                                {(pt.productInfo.price / 1000).toLocaleString(
                                  "vi-VN",
                                  {
                                    minimumFractionDigits: 3,
                                    maximumFractionDigits: 3,
                                  }
                                )}
                                đ
                              </span>
                              <span className="text-lg text-red-500 font-bold ml-2">
                                {(
                                  (pt.productInfo.price -
                                    Math.floor(
                                      (pt.productInfo.price *
                                        pt.productInfo.discount) /
                                        100
                                    )) /
                                  1000
                                ).toLocaleString("vi-VN", {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                })}
                                đ
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0">
                <div className="bg-white font-medium p-5 text-slate-600 flex flex-col gap-3">
                  <h2 className="text-xl font-semibold">Tóm tắt đơn hàng</h2>
                  <div className="flex justify-between items-center">
                    <span>Tổng cộng ({items} sản phẩm)</span>
                    <span className="text-lg font-bold ml-2">
                      {(price / 1000).toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                      đ
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phí vận chuyển</span>
                    <span className="text-lg font-bold ml-2">
                      {(shipping_fee / 1000).toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                      đ
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tổng cộng</span>
                    <span className="text-xl font-bold ml-2 text-red-600">
                      {((price + shipping_fee) / 1000).toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                      đ
                    </span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={res ? false : true}
                    className={`px-5 py-[8px] rounded-sm hover:shadow-red-700/20 hover:shadow-lg ${
                      res ? "bg-red-500" : "bg-red-700"
                    } text-sm text-white uppercase`}
                  >
                    Đặt Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;
