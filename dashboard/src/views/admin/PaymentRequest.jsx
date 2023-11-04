import React, { forwardRef, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useDispatch, useSelector } from "react-redux";
import { get_withdraw_request, confirm_withdraw_request, messageClear } from "../../store/Reducers/paymentReducer";
import toast from "react-hot-toast";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {

  const dispatch = useDispatch();
  const [paymentId, setPaymentId] = useState("");
  const { successMessage, errorMessage, loader, pendingWithdraw } = useSelector(
    (state) => state.payment
  );

    useEffect(() => {
    dispatch(get_withdraw_request());
  }, []);

  const confirm_request = (id) => {
    setPaymentId(id)
    dispatch(confirm_withdraw_request(id))
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
    }
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  }, [errorMessage, successMessage])

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
        <div className="w-[25%] p-2 whitespace-nowrap">{pendingWithdraw[index]?.date}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button disabled={loader} onClick={() => confirm_request(pendingWithdraw[index]?._id)} className="bg-green-500 shadow-lg hover:shadow-green-500/50 px-3 py-[2px] cursor-pointer text-white rounded-md text-sm">
            {(loader && paymentId === pendingWithdraw[index]?._id) ? 'loading..' : 'Xác nhận'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-white rounded-md font-medium">
        <h2 className="text-xl font-medium pb-5">Yêu cầu rút tiền</h2>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#eeeeee] uppercase text-xs min-w-[340px]">
              <div className="w-[25%] p-2">STT</div>
              <div className="w-[25%] p-2">Số tiền rút</div>
              <div className="w-[25%] p-2">Trạng thái</div>
              <div className="w-[25%] p-2">Ngày yêu cầu</div>
              <div className="w-[25%] p-2">Hành động</div>
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
    </div>
  );
};

export default PaymentRequest;
