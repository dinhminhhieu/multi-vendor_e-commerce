import React, { useState, useRef, useEffect } from "react";
import icons from "../../assets/icons";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_seller_messages,
  send_message_sellers_admin,
  messageClear,
  updateAdminMessage,
} from "../../store/Reducers/chatReducer";
import { socket } from "../../utils/utils";

const SellerToAdmin = () => {
  const { GrEmoji, IoSend, AiOutlinePlus } = icons;
  const [text, setText] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { seller_admin_message, successMessage, activeAdmin } = useSelector(
    (state) => state.chat
  );

  const dispatch = useDispatch();
  const scrollRef = useRef();

  const send = (e) => {
    if (text) {
      dispatch(
        send_message_sellers_admin({
          senderId: userInfo?._id,
          receverId: "",
          message: text,
          senderName: userInfo?.name,
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    socket.on("receved_admin_message", (message) => {
      dispatch(updateAdminMessage(message));
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_seller_to_admin",
        seller_admin_message[seller_admin_message.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    dispatch(get_seller_messages());
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-white px-4 py-4 rounded-md h-[calc(100vh-140px)]">
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
                  {activeAdmin && (
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  )}
                </div>
                <h2 className="text-base font-semibold">Hỗ trợ</h2>
              </div>
            </div>
            <div className="py-4">
              <div className="bg-[#eeeeee] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {seller_admin_message.map((m, i) => {
                  if (userInfo?._id !== m.senderId) {
                    return (
                      <div
                        ref={scrollRef}
                        key={i}
                        className="w-full flex justify-start items-center"
                      >
                        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                          <div>
                            <img
                              className="w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[2px]"
                              src="http://localhost:3001/images/sellers/1.png"
                              alt=""
                            />
                          </div>
                          <div className="flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 text-white py-2 px-2 rounded-md">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        ref={scrollRef}
                        key={i}
                        className="w-full flex justify-end items-center"
                      >
                        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                          <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-2 px-2 rounded-md">
                            <span>{m.message}</span>
                          </div>
                          <div>
                            <img
                              className="w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[2px]"
                              src="http://localhost:3001/images/admin.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-[40px] h-[40px] border-2 p-2 justify-center items-center flex rounded-full border-blue-500">
                <label className="cursor-pointer" htmlFor="">
                  <AiOutlinePlus color="blue" />
                </label>
                <input className="hidden" type="file" />
              </div>
              <div className="border-2 h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  type="text"
                  placeholder="Nhắn tin..."
                  className="w-full rounded-full h-full outline-none p-3"
                />
                <div className="text-2xl right-2 top-2 absolute cursor-auto">
                  <span>
                    <GrEmoji color="blue" />
                  </span>
                </div>
              </div>
              <div className="w-[40px] p-2 justify-center items-center rounded-full">
                <div onClick={send} className="text-2xl cursor-pointer">
                  <IoSend color="blue" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToAdmin;
