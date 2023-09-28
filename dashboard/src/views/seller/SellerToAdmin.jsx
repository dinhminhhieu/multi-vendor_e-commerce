import React, { useState } from "react";
import icons from "../../assets/icons";

const SellerToAdmin = () => {
  const { IoMdClose, FaListAlt, MdSend } = icons;
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#283046] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div className="w-full md:pl-4">
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                      src="http://localhost:3000/images/sellers/1.png"
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <h2 className="text-base text-white font-semibold">Support</h2>
                </div>
            </div>
            <div className="py-4">
              <div className="bg-slate-700 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                <div className="w-full flex justify-start items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                        src="http://localhost:3000/images/sellers/1.png"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 text-white py-1 px-2 rounded-sm">
                      <span>Xin chào</span>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-end items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">                 
                    <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                      <span>Xin chào</span>
                    </div>
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                        src="http://localhost:3000/images/sellers/1.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-start items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                        src="http://localhost:3000/images/sellers/1.png"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 text-white py-1 px-2 rounded-sm">
                      <span>Xin chào</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form className="flex gap-3">
              <input
                type="text"
                placeholder="Nhập tin nhắn của bạn"
                className="relative w-full flex justify-between items-center border border-slate-500 px-2 py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-white"
              />
              <MdSend
                size={25}
                className="absolute right-2 mt-[5px] cursor-pointer text-red-500"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToAdmin;
