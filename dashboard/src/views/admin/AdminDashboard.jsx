import React from "react";
import icons from "../../assets/icons";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { FaMoneyCheck, GrProductHunt, AiOutlineShoppingCart, HiUserGroup } =
    icons;

  const state = {
    series: [
      {
        name: "Đơn hàng",
        data: [34, 65, 34, 65, 34, 34, 34, 56, 23, 67, 23, 45],
      },
      {
        name: "Doanh thu",
        data: [34, 32, 45, 32, 34, 34, 43, 56, 65, 67, 45, 78],
      },
      {
        name: "Người bán",
        data: [78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43],
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
      responsive: [
        {
          breakpoint: 565,
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
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
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
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#283046] p-4 rounded-md text-white">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-base text-white">
                Tin nhắn gần đây
              </h2>
              <Link className="font-semibold text-sm text-[#cccccc]">
                Xem tất cả
              </Link>
            </div>
            <div className="flex flex-col gap-2 pt-6 text-white">
              <ol className="relative border-1 border-slate-600 ml-4">
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] rounded-full z-10 bg-[#000000]">
                    <img
                      src="http://localhost:3000/images/admin.png"
                      alt=""
                      className="rounded-full w-full h-full shadow-lg"
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-sm font-normal">admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last">
                        4 ngày trước
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      Xin chào
                    </div>
                  </div>
                </li>

                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] rounded-full z-10 bg-[#000000]">
                    <img
                      src="http://localhost:3000/images/admin.png"
                      alt=""
                      className="rounded-full w-full h-full shadow-lg"
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-sm font-normal">admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last">
                        4 ngày trước
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      Xin chào
                    </div>
                  </div>
                </li>

                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] rounded-full z-10 bg-[#000000]">
                    <img
                      src="http://localhost:3000/images/admin.png"
                      alt=""
                      className="rounded-full w-full h-full shadow-lg"
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-sm font-normal">admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last">
                        4 ngày trước
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      Xin chào
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-base text-white">
            Đơn hàng gần đây
          </h2>
          <Link className="font-semibold text-sm text-[#cccccc]">
            Xem tất cả
          </Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-sm text-white uppercase border-b border-slate-700">
              <tr>
                <th className="py-3 px-4" scope="col">
                  Mã đơn hàng
                </th>
                <th className="py-3 px-4" scope="col">
                  Đơn giá
                </th>
                <th className="py-3 px-4" scope="col">
                  Trạng thái
                </th>
                <th className="py-3 px-4" scope="col">
                  Tình trạng đơn hàng
                </th>
                <th className="py-3 px-4" scope="col">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, , 4, 5].map((d, i) => (
                <tr key={i}>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    1
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    10.000
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>Đang xử lý</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span>Đang xử lý</span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <Link>Xem</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
