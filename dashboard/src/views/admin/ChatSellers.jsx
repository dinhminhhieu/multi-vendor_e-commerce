import React, { useState } from "react";
import icons from "../../assets/icons";

const ChatSellers = () => {
  const { IoMdClose } = icons;
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#283046] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full z-10 absolute ${
              show ? "-left-[16px]" : "-[336px]"
            } md:left-0 md:relative transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                <h2>Sellers</h2>
                <span
                  onClick={() => setShow(true)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>
              <div
                className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 text-white rounded-sm cursor-pointer`}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                    src="http://localhost:3000/images/sellers/1.png"
                    alt=""
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <div className="flex justify-center items-start flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                        <h2 className="text-base font-semibold">Đinh Minh Hiếu</h2>
                    </div>
                    <span className="text-xs font-normal">2 phút trước</span>
                </div>
              </div>
              <div
                className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 text-white rounded-sm cursor-pointer`}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                    src="http://localhost:3000/images/sellers/1.png"
                    alt=""
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <div className="flex justify-center items-start flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                        <h2 className="text-base font-semibold">Đinh Minh Hiếu</h2>
                    </div>
                    <span className="text-xs font-normal">2 phút trước</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSellers;
