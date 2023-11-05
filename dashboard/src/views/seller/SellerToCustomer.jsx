import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../utils/utils";
import { get_customers, get_customer_messages } from "../../store/Reducers/chatReducer";

const ChatSellers = () => {
  const { IoMdClose, FaListAlt, MdSend } = icons;
  const [show, setShow] = useState(false);
  const sellerId = 32;

  const { customerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { customers } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_customers(userInfo._id));
  }, []);

  useEffect(() => {
    if(customerId) {
      dispatch(get_customer_messages(customerId))
    }
  }, [customerId])

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-white px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full z-10 absolute ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3">
                <h2>Khách hàng</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>
              {customers.map((c, i) => (
                <Link
                  key={i}
                  to={`/seller/dashboard/chat-customers/${c?.fdId}`}
                  className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 rounded-sm cursor-pointer bg-[#b3b3b3]`}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-slate-700 border-2 max-w-[38px] p-[2px] rounded-full"
                      src="http://localhost:3000/images/sellers/1.png"
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <div className="flex justify-center items-start flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base font-semibold">{c?.name}</h2>
                    </div>
                    <span className="text-xs font-normal">2 phút trước</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                      src="http://localhost:3000/images/sellers/1.png"
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <h2 className="text-base font-semibold">Đinh Minh Hiếu</h2>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center"
              >
                <span>
                  <FaListAlt />
                </span>
              </div>
            </div>
            <div className="py-4">
              <div className="bg-[#b3b3b3] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                <div className="w-full flex justify-start items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-2 border-slate-700 rounded-full max-w-[38px] p-[2px]"
                        src="http://localhost:3000/images/sellers/1.png"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 text-white py-2 px-2 rounded-md">
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
                        className="w-[38px] h-[38px] border-2 border-slate-700 rounded-full max-w-[38px] p-[3px]"
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
                        className="w-[38px] h-[38px] border-2 border-slate-700 rounded-full max-w-[38px] p-[3px]"
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
                className="relative w-full flex justify-between items-center border border-slate-500 px-2 py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent"
              />
              <MdSend
                size={25}
                className="absolute right-2 mt-[5px] cursor-pointer text-blue-500"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSellers;
