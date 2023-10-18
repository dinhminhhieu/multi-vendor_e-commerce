import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const PaymentRequest = () => {
  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">10.00</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[2px] px-[6px] bg-slate-700 text-blue-500 rounded-md text-xs">
            Đang xử lý
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">21/09/2023</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button className="bg-green-500 shadow-lg hover:shadow-green-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm">
            Xác nhận
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-white rounded-md font-medium">
        <h2 className="text-xl font-medium pb-5">Withdrawal request</h2>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#eeeeee] uppercase text-xs min-w-[340px]">
              <div className="w-[25%] p-2">STT</div>
              <div className="w-[25%] p-2">Tổng tiền</div>
              <div className="w-[25%] p-2">Trạng thái</div>
              <div className="w-[25%] p-2">Ngày đáo hạn</div>
              <div className="w-[25%] p-2">Hành động</div>
            </div>
            {
              <List
                style={{ minWidth: "340px", overflowX: "hidden" }}
                className="List"
                height={350}
                itemCount={10}
                itemSize={30}
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
