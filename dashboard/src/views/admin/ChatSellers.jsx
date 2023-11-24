import React, { useEffect, useState, useRef } from "react";
import icons from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  get_sellers,
  send_message_sellers_admin,
  get_admin_messages,
  updateSellerMessage,
  messageClear,
} from "../../store/Reducers/chatReducer";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { socket } from "../../utils/utils";

const ChatSellers = () => {
  const { IoMdClose, FaListAlt, BsEmojiSmile, AiOutlinePlus, GrEmoji, IoSend } =
    icons;
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [recevedMessage, setRecevedMessage] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const {
    sellers,
    activeSellers,
    seller_admin_message,
    currentSeller,
    successMessage,
  } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const scrollRef = useRef();

  const { sellerId } = useParams();
  console.log(sellerId);

  useEffect(() => {
    dispatch(get_sellers());
  }, []);

  const send = (e) => {
    if (text) {
      dispatch(
        send_message_sellers_admin({
          senderId: "",
          receverId: sellerId,
          message: text,
          senderName: "Hỗ trợ (Admin support)",
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    if (sellerId) {
      dispatch(get_admin_messages(sellerId));
    }
  }, [sellerId]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_admin_to_seller",
        seller_admin_message[seller_admin_message.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    socket.on("receved_seller_message", (message) => {
      setRecevedMessage(message);
    });
  }, []);

  useEffect(() => {
    if (recevedMessage) {
      if (
        recevedMessage.senderId === sellerId &&
        recevedMessage.receverId === ""
      ) {
        dispatch(updateSellerMessage(recevedMessage));
      } else {
        toast.success(recevedMessage.senderName + " gửi một tin nhắn");
      }
    }
  }, [recevedMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);

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
                <h2>Sellers</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>
              {sellers.map((c, i) => (
                <Link
                  key={i}
                  to={`/admin/dashboard/chat-sellers/${c?._id}`}
                  className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 rounded-md cursor-pointer ${
                    sellerId === c._id ? "bg-gray-500 text-white" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-slate-700 border-2 max-w-[38px] p-[2px] rounded-full"
                      src={c?.image}
                      alt=""
                    />
                    {activeSellers.some((a) => a.sellerId === c._id) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
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
                      src={currentSeller?.image}
                      alt=""
                    />
                    {/* {activeSellers.some(
                      (a) => a.customerId === currentCustomer._id
                    ) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )} */}
                  </div>
                  <h2 className="text-base font-semibold">
                    {currentSeller?.name}
                  </h2>
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
                {sellerId ? (
                  seller_admin_message.map((m, i) => {
                    if (m.senderId === sellerId) {
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
                  })
                ) : (
                  <div className="w-full h-full flex justify-center items-center flex-col font-bold gap-2 text-lg text-white">
                    <span>
                      <BsEmojiSmile size={30} />
                    </span>
                    <span>Chọn seller để trò chuyện</span>
                  </div>
                )}
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

export default ChatSellers;
