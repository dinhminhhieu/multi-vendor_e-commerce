import React, { useState } from "react";
import icons from "../../assets/icons";
import { Link } from "react-router-dom";

const Orders = () => {
  const { BsArrowBarDown } = icons;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const state = true;

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="flex justify-between items-center">
          <select
            name=""
            id=""
            className="py-2 px-4 hover:border-indigo-500 outline-none bg-[#283046] border border-slate-400 rounded-md text-white"
            onChange={(e) => setParPage(parseInt(e.target.value))}
          >
            <option value="5">5</option>
            <option value="5">15</option>
            <option value="5">25</option>
          </select>
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="w-[250px] px-3 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
          />
        </div>
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left [#d0d2d6]">
            <div className="text-sm text-white border-b border-slate-700 uppercase font-medium">
              <div className="flex justify-between items-start">
                <div className="py-3 w-[25%]">Mã đơn hàng</div>
                <div className="py-3 w-[13%]">Đơn giá</div>
                <div className="py-3 w-[18%]">Trạng thái</div>
                <div className="py-3 w-[18%]">Tình trạng đơn hàng</div>
                <div className="py-3 w-[18%]">Hành động</div>
                <div className="py-3 w-[8%]">
                  <BsArrowBarDown size={20} />
                </div>
              </div>
            </div>
            <div className="text-white">
              <div className="flex justify-between items-start border-b border-slate-700">
                <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                  #1
                </div>
                <div className="py-4 w-[13%]">10.000</div>
                <div className="py-4 w-[18%]">Đang xử lý</div>
                <div className="py-4 w-[18%]">Đang xử lý</div>
                <div className="py-4 w-[18%]">
                  <Link>Xem</Link>
                </div>
                <div className="py-4 w-[8%]" onClick={(e) => setShow(!show)}>
                  <BsArrowBarDown size={20} />
                </div>
              </div>
              <div
                className={
                  show
                    ? "block border-b border-slate-700 bg-slate-800"
                    : "hidden"
                }
              >
                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                    #1
                  </div>
                  <div className="py-4 w-[13%]">10.000</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                </div>

                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                    #1
                  </div>
                  <div className="py-4 w-[13%]">10.000</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                </div>
              </div>
            </div>

            <div className="text-white">
              <div className="flex justify-between items-start border-b border-slate-700">
                <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                  #1
                </div>
                <div className="py-4 w-[13%]">10.000</div>
                <div className="py-4 w-[18%]">Đang xử lý</div>
                <div className="py-4 w-[18%]">Đang xử lý</div>
                <div className="py-4 w-[18%]">
                  <Link>Xem</Link>
                </div>
                <div className="py-4 w-[8%]" onClick={(e) => setShow(!show)}>
                  <BsArrowBarDown size={20} />
                </div>
              </div>
              <div
                className={
                  show
                    ? "block border-b border-slate-700 bg-slate-800"
                    : "hidden"
                }
              >
                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                    #1
                  </div>
                  <div className="py-4 w-[13%]">10.000</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                </div>

                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                    #1
                  </div>
                  <div className="py-4 w-[13%]">10.000</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                </div>
              </div>
            </div>

            <div className="text-white">
              <div className="flex justify-between items-start border-b border-slate-700">
                <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                  #1
                </div>
                <div className="py-4 w-[13%]">10.000</div>
                <div className="py-4 w-[18%]">Đang xử lý</div>
                <div className="py-4 w-[18%]">Đang xử lý</div>
                <div className="py-4 w-[18%]">
                  <Link>Xem</Link>
                </div>
                <div className="py-4 w-[8%]" onClick={(e) => setShow(!show)}>
                  <BsArrowBarDown size={20} />
                </div>
              </div>
              <div
                className={
                  show
                    ? "block border-b border-slate-700 bg-slate-800"
                    : "hidden"
                }
              >
                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                    #1
                  </div>
                  <div className="py-4 w-[13%]">10.000</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                </div>

                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                    #1
                  </div>
                  <div className="py-4 w-[13%]">10.000</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                </div>
              </div>
            </div>

            <div className="text-white">
              <div className="flex justify-between items-start border-b border-slate-700">
                <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                  #1
                </div>
                <div className="py-4 w-[13%]">10.000</div>
                <div className="py-4 w-[18%]">Đang xử lý</div>
                <div className="py-4 w-[18%]">Đang xử lý</div>
                <div className="py-4 w-[18%]">
                  <Link>Xem</Link>
                </div>
                <div className="py-4 w-[8%]" onClick={(e) => setShow(!show)}>
                  <BsArrowBarDown size={20} />
                </div>
              </div>
              <div
                className={
                  show
                    ? "block border-b border-slate-700 bg-slate-800"
                    : "hidden"
                }
              >
                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                    #1
                  </div>
                  <div className="py-4 w-[13%]">10.000</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                </div>

                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                    #1
                  </div>
                  <div className="py-4 w-[13%]">10.000</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                </div>
              </div>
            </div>

            <div className="text-white">
              <div className="flex justify-between items-start border-b border-slate-700">
                <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                  #1
                </div>
                <div className="py-4 w-[13%]">10.000</div>
                <div className="py-4 w-[18%]">Đang xử lý</div>
                <div className="py-4 w-[18%]">Đang xử lý</div>
                <div className="py-4 w-[18%]">
                  <Link>Xem</Link>
                </div>
                <div className="py-4 w-[8%]" onClick={(e) => setShow(!show)}>
                  <BsArrowBarDown size={20} />
                </div>
              </div>
              <div
                className={
                  show
                    ? "block border-b border-slate-700 bg-slate-800"
                    : "hidden"
                }
              >
                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                    #1
                  </div>
                  <div className="py-4 w-[13%]">10.000</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                </div>

                <div className="flex justify-start items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-3">
                    #1
                  </div>
                  <div className="py-4 w-[13%]">10.000</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                  <div className="py-4 w-[18%]">Đang xử lý</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
