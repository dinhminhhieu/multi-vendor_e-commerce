import React, { useEffect, useState, useRef } from "react";
import icons from "../../assets/icons";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  add_friend,
  messageClear,
  send_message_seller,
  updateMessage,
} from "../../store/Reducers/chatReducer";

const socket = io("http://localhost:5000");

const Chat = () => {
  const { AiOutlineMessage, GrEmoji, IoSend, AiOutlinePlus } = icons;
  const scrollRef = useRef();

  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const [text, setText] = useState("");
  const [receverMessage, setReceverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const { my_friends, fd_messages, currentFd, successMessage } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    socket.emit("add_user", userInfo.id, userInfo);
  }, []);

  useEffect(() => {
    dispatch(
      add_friend({
        sellerId: sellerId || "",
        customerId: userInfo.id,
      })
    );
  }, [sellerId]);

  const send = () => {
    if (text) {
      dispatch(
        send_message_seller({
          customerId: userInfo.id,
          text,
          sellerId,
          name: userInfo.name,
        })
      );
      setText("");
    }
  };

  // Nhận tin nhắn từ seller
  useEffect(() => {
    socket.on("seller_message", (message) => {
      console.log(message);
      setReceverMessage(message);
    });
    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);
  // console.log(activeSeller)

  // Cập nhật tin nhắn và gửi thông báo khi có tin nhắn mới
  useEffect(() => {
    // console.log(receverMessage);
    if (receverMessage) {
      if (
        sellerId === receverMessage.senderId &&
        userInfo.id === receverMessage.receverId
      ) {
        dispatch(updateMessage(receverMessage));
      } else {
        toast.success(receverMessage.senderName + " " + "đã gửi 1 tin nhắn");
        dispatch(messageClear());
      }
    }
  }, [receverMessage]);

    // Gửi tin nhắn từ customer sang seller
  useEffect(() => {
    if (successMessage) {
      socket.emit("send_message_customer", fd_messages[fd_messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);

  return (
    <div className="bg-white p-3 rounded-md">
      <div className="w-full flex">
        <div className="w-[230px]">
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <span>
              <AiOutlineMessage size={24} />
            </span>
            <span className="font-bold text-slate-500">Tin nhắn</span>
          </div>
          <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3">
            {my_friends.map((f, i) => (
              <Link
                key={i}
                to={`/dashboard/chat/${f.fdId}`}
                className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 rounded-md cursor-pointer`}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-slate-700 border-2 max-w-[38px] p-[2px] rounded-full"
                    src={f?.image}
                    alt=""
                  />
                  {activeSeller.some((c) => c.sellerId === f.fdId) && (
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  )}
                </div>
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-base font-semibold">{f?.shopName}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-[calc(100%-230px)]">
          {currentFd ? (
            <div className="w-full h-full">
              <div className="flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                      src={currentFd?.image}
                      alt=""
                    />
                    {activeSeller.some((c) => c.sellerId === currentFd.fdId) && (
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  )}
                  </div>
                  <h2 className="text-base font-semibold">{currentFd?.name}</h2>
                </div>
                <span className="font-medium">{currentFd.shopName}</span>
              </div>
              <div className="h-[400px] w-full p-3 rounded-md bg-[#dbdbdb]">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  {fd_messages.map((m, i) => {
                    if (currentFd?.fdId !== m.receverId) {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="w-full flex gap-2 justify-start items-center text-[14px]"
                        >
                          <img
                            className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                            src={currentFd?.image}
                            alt=""
                          />
                          <div className="p-2 bg-orange-500 font-semibold rounded-md text-white">
                            <span>{m?.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="w-full flex gap-2 justify-end items-center text-[14px]"
                        >
                          <div className="p-2 bg-blue-500  text-white font-semibold rounded-md">
                            <span>{m?.message}</span>
                          </div>
                          <img
                            className="w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[2px]"
                            src="http://localhost:3000/images/sellers/1.png"
                            alt=""
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex p-2 justify-between items-center w-full">
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
          ) : (
            <div className="w-full h-full flex justify-center items-center text-lg font-bold text-red-600">
              <span>Chọn nhà cung cấp để trò chuyện</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
