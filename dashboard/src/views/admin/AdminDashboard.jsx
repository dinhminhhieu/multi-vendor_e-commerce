import React from "react";
import icons from "../../assets/icons";
import Chart from "react-apexcharts";

const AdminDashboard = () => {
  const { FaMoneyCheck, GrProductHunt, AiOutlineShoppingCart, HiUserGroup } =
    icons;

  const state = {
    series: [
      {
        name: "Đơn Hàng",
        data: [34, 65, 343, 65, 34, 34, 34, 56, 23, 67, 23, 45],
      },
      {
        name: "Doanh Thu",
        data: [34, 32, 45, 32, 34, 34, 43, 56, 23, 67, 23, 45],
      },
      {
        name: "Người Bán",
        data: [94, 65, 343, 65, 34, 34, 34, 56, 23, 67, 23, 45],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLables: {
        enable: false,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        color: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-2xl font-bold">10.000.000</h2>
            <span className="text-sm font-medium">Tổng Doanh Thu</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#008000] flex justify-center items-center text-xl">
            <FaMoneyCheck size={22} className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-2xl font-bold">16</h2>
            <span className="text-sm font-medium">Sản Phẩm</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#ff6600] flex justify-center items-center text-xl">
            <GrProductHunt size={22} className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-2xl font-bold">10</h2>
            <span className="text-sm font-medium">Đơn Hàng</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#660000] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart size={22} className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-2xl font-bold">4</h2>
            <span className="text-sm font-medium">Người Bán</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#999900] flex justify-center items-center text-xl">
            <HiUserGroup size={22} className="text-white shadow-lg" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
