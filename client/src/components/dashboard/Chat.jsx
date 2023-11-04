import React, { useEffect, useState, useRef } from "react";
import icons from "../../assets/icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { add_friend } from "../../store/Reducers/chatReducer";

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
                to={`/dashboard/chat/${f.fdId}`}
                key={i}
                className={`flex gap-2 justify-start items-center pl-2 py-[5px]`}
              >
                <div className="w-[30px] h-[30px] rounded-full relative">
                  {
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  }
                  <img
                    src="http://localhost:3000/images/sellers/1.png"
                    alt=""
                  />
                </div>
                <span>{f.shopName}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-[calc(100%-230px)]">
          {currentFd ? (
            <div className="w-full h-full">
              <div className="flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className="w-[30px] h-[30px] rounded-full relative">
                  {
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  }
                  <img
                    src="http://localhost:3000/images/sellers/1.png"
                    alt=""
                  />
                </div>
                <span className="font-medium text-red-500">{currentFd.shopName}</span>
              </div>
              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md bg-[#dbdbdb]">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  <div className="w-full flex gap-2 justify-start items-center text-[14px]">
                    <img
                      className="w-[30px] h-[30px]"
                      src="http://localhost:3000/images/sellers/1.png"
                      alt=""
                    />
                    <div className="p-2 bg-orange-500 font-semibold rounded-md text-white">
                      <span>Xin chào</span>
                    </div>
                  </div>
                  <div
                    ref={scrollRef}
                    className="w-full flex gap-2 justify-end items-center text-[14px]"
                  >
                    <img
                      className="w-[30px] h-[30px] "
                      src="http://localhost:3000/images/sellers/1.png"
                      alt=""
                    />
                    <div className="p-2 bg-blue-500 text-white font-semibold rounded-md">
                      <span>Xin chào</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex p-2 justify-between items-center w-full">
                <div className="w-[40px] h-[40px] border-2 p-2 justify-center items-center flex rounded-full border-blue-500">
                  <label className="cursor-pointer" htmlFor="">
                    <AiOutlinePlus color="blue" />
                  </label>
                  <input className="hidden" type="file" />
                </div>
                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
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
                  <div className="text-2xl cursor-pointer">
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
