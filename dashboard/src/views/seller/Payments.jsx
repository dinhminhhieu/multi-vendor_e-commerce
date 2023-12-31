import React, { forwardRef, useEffect, useState } from "react";
import icons from "../../assets/icons";
import { FixedSizeList as List } from "react-window";
import { useDispatch, useSelector } from "react-redux";
import {
  get_seller_payment_request,
  send_withdraw_request,
  messageClear,
} from "../../store/Reducers/paymentReducer";
import toast from "react-hot-toast";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const { MdOutlineAttachMoney } = icons;
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    successMessage,
    errorMessage,
    loader,
    pendingWithdraw,
    successWithdraw,
    totalAmount,
    withdrawAmount,
    pendingAmount,
    availableAmount,
  } = useSelector((state) => state.payment);

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {(pendingWithdraw[index]?.amount / 1000).toLocaleString("vi-VN", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}
          đ
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[6px] bg-red-500 text-white rounded-md text-xs">
            {pendingWithdraw[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {pendingWithdraw[index]?.date}
        </div>
      </div>
    );
  };

  const Rows = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {(successWithdraw[index]?.amount / 1000).toLocaleString("vi-VN", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}
          đ
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[6px] bg-red-500 text-white rounded-md text-xs">
            {successWithdraw[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {successWithdraw[index]?.date}
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(get_seller_payment_request(userInfo._id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  const sendWithdrawRequest = (e) => {
    e.preventDefault();
    if (availableAmount - amount > 10) {
      dispatch(send_withdraw_request({ amount, sellerId: userInfo._id }));
      setAmount(0);
    } else {
      toast.error("Số tiền khả dụng không đủ!");
    }
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-green-500 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <span className="font-lg font-bold">
              {(totalAmount / 1000).toLocaleString("vi-VN", {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              })}
              đ
            </span>
            <span className="text-sm font-normal">Tổng Doanh Thu</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#008000] flex justify-center items-center text-xl">
            <MdOutlineAttachMoney size={22} className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-orange-700 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <span className="font-lg font-bold">
              {(availableAmount / 1000).toLocaleString("vi-VN", {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              })}
              đ
            </span>
            <span className="text-sm font-normal">Số Tiền Khả Dụng</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#ff6600] flex justify-center items-center text-xl">
            <MdOutlineAttachMoney size={22} className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-red-500 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <span className="font-lg font-bold">
              {(withdrawAmount / 1000).toLocaleString("vi-VN", {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              })}
              đ
            </span>
            <span className="text-sm font-normal">Số Tiền Rút</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#660000] flex justify-center items-center text-xl">
            <MdOutlineAttachMoney size={22} className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-yellow-600 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <span className="font-lg font-bold">
              {(pendingAmount / 1000).toLocaleString("vi-VN", {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              })}
              đ
            </span>
            <span className="text-sm font-normal">Số Tiền Chờ Xử Lý</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#999900] flex justify-center items-center text-xl">
            <MdOutlineAttachMoney size={22} className="text-white shadow-lg" />
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pb-4 mt-5">
        <div className="bg-white rounded-md p-5">
          <h2 className="text-lg font-bold">Gửi yêu cầu rút tiền</h2>
          <div className="py-5">
            <form onSubmit={sendWithdrawRequest}>
              <div className="flex gap-3 flex-wrap">
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  required
                  min="0"
                  type="number"
                  className="py-2 px-3 w-[79%] h-[50%] hover:border-indigo-500 outline-none bg-[#eeeeee] border border-slate-400 rounded-md"
                  name="amount"
                />
                <button
                  disabled={loader}
                  className="bg-red-500 hover:shadow-red-500/50 hover:shadow-lg text-white rounded-md px-7 py-2"
                >
                  {loader ? "Đang gửi" : "Gửi"}
                </button>
              </div>
            </form>
          </div>
          <div>
            <h2 className="text-lg pb-4">Yêu cầu rút tiền đang chờ xử lý</h2>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#eeeeee] uppercase text-xs min-w-[340px] font-semibold">
                <div className="w-[25%] p-2">STT</div>
                <div className="w-[25%] p-2">Số tiền rút</div>
                <div className="w-[25%] p-2">Trạng thái</div>
                <div className="w-[25%] p-2">Ngày gửi yêu cầu</div>
              </div>
              {
                <List
                  style={{ minWidth: "340px", overflowX: "hidden" }}
                  className="List"
                  height={350}
                  itemCount={pendingWithdraw.length}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md p-5">
          <div>
            <h2 className="text-lg pb-4 font-bold">Rút tiền thành công</h2>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#eeeeee] uppercase text-xs min-w-[340px] font-semibold">
                <div className="w-[25%] p-2">STT</div>
                <div className="w-[25%] p-2">Số tiền rút</div>
                <div className="w-[25%] p-2">Trạng thái</div>
                <div className="w-[25%] p-2">Ngày gửi yêu cầu</div>
              </div>
              {
                <List
                  style={{ minWidth: "340px", overflowX: "hidden" }}
                  className="List"
                  height={350}
                  itemCount={successWithdraw.length}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Rows}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
