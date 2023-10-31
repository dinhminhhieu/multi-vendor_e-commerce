import React, { useEffect } from "react";
import icons from "../../assets/icons";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_dashboard_data } from "../../store/Reducers/dashboardReducer";

const SellerDashboard = () => {
  const {
    FaMoneyCheck,
    GrProductHunt,
    AiOutlineShoppingCart,
    RiShoppingBasketLine,
  } = icons;

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
        name: "Sellers",
        data: [78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "#F0F8FF",
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

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    totalSale,
    totalOrder,
    totalPendingOrder,
    totalProduct,
    recentOrders,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(get_seller_dashboard_data());
  }, []);

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-red-500 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <span className="font-lg font-bold">
              {(totalSale / 1000).toLocaleString("vi-VN", {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              })}
              đ
            </span>
            <span className="text-sm font-medium">Tổng Doanh Thu</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#FF0800] flex justify-center items-center text-xl">
            <FaMoneyCheck size={22} className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#0D98BA] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-2xl font-bold">{totalProduct}</h2>
            <span className="text-sm font-medium">Sản Phẩm</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#02a8c2] flex justify-center items-center text-xl">
            <GrProductHunt size={22} className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-green-600 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-2xl font-bold">{totalOrder}</h2>
            <span className="text-sm font-medium">Đơn Hàng</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#006600] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart size={22} className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fdba35] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-2xl font-bold">{totalPendingOrder}</h2>
            <span className="text-sm font-medium">Đơn Hàng Chờ Xử Lý</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#EF9B0F] flex justify-center items-center text-xl">
            <RiShoppingBasketLine size={22} className="text-white shadow-lg" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#F0F8FF] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-white p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-base">Tin nhắn gần đây</h2>
              <Link className="font-semibold text-sm">Xem tất cả</Link>
            </div>
            <div className="flex flex-col gap-2 pt-6">
              <ol className="relative border-1 ml-4">
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] rounded-full z-10 bg-[#000000]">
                    <img
                      src="http://localhost:3000/images/admin.png"
                      alt=""
                      className="rounded-full w-full h-full shadow-lg"
                    />
                  </div>
                  <div className="p-2 bg-[#eeeeee] rounded-lg border shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-sm font-normal">admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last">
                        4 ngày trước
                      </time>
                    </div>
                    <div className="p-1 text-xs font-medium rounded-lg border">
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
                  <div className="p-2 bg-[#eeeeee] rounded-lg border shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-sm font-normal">admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last">
                        4 ngày trước
                      </time>
                    </div>
                    <div className="p-1 text-xs font-medium rounded-lg border">
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
                  <div className="p-2 bg-[#eeeeee] rounded-lg border shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-sm font-normal">admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last">
                        4 ngày trước
                      </time>
                    </div>
                    <div className="p-1 text-xs font-medium rounded-lg border">
                      Xin chào
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-white rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-base ">Đơn hàng gần đây</h2>
          <Link
            to="/seller/dashboard/orders"
            className="font-bold text-base text-blue-500"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left ">
            <thead className="text-sm uppercase border-b border-slate-700">
              <tr>
                <th className="py-3 px-4" scope="col">
                  Mã đơn hàng
                </th>
                <th className="py-3 px-4" scope="col">
                  Đơn giá
                </th>
                <th className="py-3 px-4" scope="col">
                  Trạng thái thanh toán
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
              {recentOrders.map((d, i) => (
                <tr key={i}>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    #{d?._id}
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    {(d?.price / 1000).toLocaleString("vi-VN", {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })}
                    đ
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span
                      className={`py-[1px] text-xs px-3 ${
                        d?.payment_status === "paid"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } rounded-md `}
                    >
                      {d?.payment_status}
                    </span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <span
                      className={`py-[1px] text-xs px-3 ${
                        d?.delivery_status === "placed"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } rounded-md `}
                    >
                      {d?.delivery_status}
                    </span>
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    <Link
                      to={`/seller/dashboard/order/order-details/${d?._id}`}
                      className="font-bold"
                    >
                      Xem
                    </Link>
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

export default SellerDashboard;
