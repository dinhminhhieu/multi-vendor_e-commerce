import React from "react";
import icons from "../../assets/icons";
import {Link} from 'react-router-dom'

const index = () => {
  const { AiOutlineShoppingCart } = icons;
  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
        <div className="flex justify-between items-center p-5 bg-green-600 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-2xl font-bold">6</h2>
            <span className="text-xl font-medium">Đơn Hàng</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#008000] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart size={22} className="text-white shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-yellow-600 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-2xl font-bold">6</h2>
            <span className="text-xl font-medium">Đơn Hàng Đang Xử Lý</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-yellow-900 flex justify-center items-center text-xl">
            <AiOutlineShoppingCart size={22} className="text-white shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-red-600 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-2xl font-bold">6</h2>
            <span className="text-xl font-medium">Đơn Hàng Đã Hủy</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-red-900 flex justify-center items-center text-xl">
            <AiOutlineShoppingCart size={22} className="text-white shadow-lg" />
          </div>
        </div>
      </div>
      <div className='bg-white p-4 mt-5 rounded-md'>
                <h2 className='text-lg font-semibold text-slate-600'>Đơn Hàng Gần Đây</h2>
                <div className='pt-4'>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-gray-500'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>Mã đơn hàng</th>
                                    <th scope='col' className='px-6 py-3'>Giá hàng</th>
                                    <th scope='col' className='px-6 py-3'>Trạng thái thanh toán</th>
                                    <th scope='col' className='px-6 py-3'>Tình trạng đơn hàng</th>
                                    <th scope='col' className='px-6 py-3'>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [1, 2, 3].map((o, i) => <tr key={i} className='bg-white border-b'>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o._id}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>${o.price}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.payment_status}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.delivery_status}</td>
                                        <td scope='row' className='px-6 py-4'>
                                            <Link to={`/dashboard/order/details/${o._id}`}>
                                                <span className='bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-[1px] rounded'>Xem</span>
                                            </Link>
                                            {
                                                o.payment_status !== 'paid' && <span className='bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-[1px] rounded cursor-pointer'>Thanh toán</span>
                                            }
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </div>
  );
};

export default index;
