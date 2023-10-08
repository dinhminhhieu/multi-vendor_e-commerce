import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import icons from "../assets/icons";
import Footer from "../components/Footer";

const Cart = () => {
  const { MdOutlineKeyboardArrowRight } = icons;
  const cart_products = [1, 2];
  const outOfStockProduct = [1, 2];

  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banners/6.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">SnapDeal</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Trang chủ</Link>
                <span className="pt-2">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Cart</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90] mx-auto py-16">
          {cart_products.length > 0 || outOfStockProduct.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500 font-semibold">
                        Số lượng sản phẩm {cart_products.length}
                      </h2>
                    </div>
                    {cart_products.map((pt, i) => (
                      <div className="flex bg-white p-4 flex-col gap-2">
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-red-600 font-medium">
                            cellphoneS
                          </h2>
                        </div>
                        {[1, 2].map((p, i) => (
                          <div className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-7/12 mb-3">
                              <div className="flex gap-2 justify-start items-center">
                                <img
                                  className="w-[80px] h-[80px]"
                                  src={`http://localhost:3000/images/categories/1.png`}
                                  alt="product image"
                                />
                                <div className="pr-4 text-slate-600">
                                  <h2 className="text-md">Iphone 14 promax</h2>
                                  <span className="text-sm">
                                    Thương hiệu : Apple
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500">
                                  100000đ
                                </h2>
                                <p className="line-through">150000đ</p>
                                <p>-5%</p>
                              </div>
                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                  <div className="px-3 cursor-pointer m-2">
                                    -
                                  </div>
                                  <div>5</div>
                                  <div className="px-3 cursor-pointer m-2">
                                    +
                                  </div>
                                </div>
                                <button className="px-5 py-[3px] bg-red-500 text-white">
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {outOfStockProduct.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="bg-white p-4">
                          <h2 className="text-md text-red-500 font-semibold">
                            Hết hàng {outOfStockProduct.length}
                          </h2>
                        </div>
                        <div className="bg-white p-4">
                          {[1, 2].map((p, i) => (
                            <div className="w-full flex flex-wrap">
                              <div className="flex sm:w-full gap-2 w-7/12 mb-3">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    className="w-[80px] h-[80px]"
                                    src={`http://localhost:3000/images/categories/1.png`}
                                    alt="product image"
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2 className="text-md">
                                      Iphone 14 promax
                                    </h2>
                                    <span className="text-sm">
                                      Thương hiệu : Apple
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500">
                                    100000đ
                                  </h2>
                                  <p className="line-through">150000đ</p>
                                  <p>-5%</p>
                                </div>
                                <div className="flex gap-2 flex-col">
                                  <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                    <div className="px-3 cursor-pointer m-2">
                                      -
                                    </div>
                                    <div>5</div>
                                    <div className="px-3 cursor-pointer m-2">
                                      +
                                    </div>
                                  </div>
                                  <button className="px-5 py-[3px] bg-red-500 text-white">
                                    Xóa
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {cart_products.length > 0 && (
                    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                      <h2 className="text-xl font-bold">Đơn hàng</h2>
                      <div className="flex justify-between items-center">
                        <span> 4 sản phẩm</span>
                        <span>100000đ</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Phí vận chuyển</span>
                        <span>30000đ</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                          type="text"
                          placeholder="Nhập mã giảm giá"
                        />
                        <button className="px-8 py-[1px] bg-red-500 text-white rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tổng tiền</span>
                        <span className="text-lg text-orange-500">100000đ</span>
                      </div>
                      <button className='px-5 py-[8px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-red-500 text-sm text-white uppercase'>Thanh toán 4 sản phẩm</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/shops" className="px-4 py-1 bg-red-500 text-white">
                Mua Ngay
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
