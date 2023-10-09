import React, {useState} from "react";
import Ratings from "../components/Ratings";
import RatingTemp from "../components/RatingTemp";
import icons from "../assets/icons";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import Rating from 'react-rating';

const Reviews = () => {
  const { BiSolidCheckShield, AiFillStar, CiStar } = icons;
  const [pageNumber, setPageNumber] = useState(1);
  const [parPage, setParPage] = useState(3)
    const [rat, setRat] = useState('')
  const [re, setRe] = useState('')
  const userInfo = ""
  return (
    <div className="mt-8">
      <div className="flex gap-10 md:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div>
            <span className="text-4xl font-semibold">4.5</span>
            <span className="text-2xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex text-2xl">
            <Ratings ratings={4.5} />
          </div>
          <p className="text-sm text-green-600 font-semibold">23 đánh giá</p>
        </div>
        <div className="flex gap-2 flex-col py-4">
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp ratingTemp={5} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#EDBB0E]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[20%]">20</p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp ratingTemp={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#EDBB0E]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[50%]">10</p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp ratingTemp={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#EDBB0E]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">10</p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp ratingTemp={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#EDBB0E]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">10</p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp ratingTemp={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#EDBB0E]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">10</p>
          </div>
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp ratingTemp={0} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#EDBB0E]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">10</p>
          </div>
        </div>
      </div>
      <h2 className="text-slate-600 text-xl font-bold py-5">
        Nhận xét về sản phẩm
      </h2>
      <div className="flex flex-col gap-8 pb-10 pt-4">
        {[1, 2, 3, 4, 5, 6, 7].map((p, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-1 text-xl">
                <RatingTemp ratingTemp={4} />
              </div>
              <span>23 thg 10 2023</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-600 text-md font-medium">
                Đinh Minh Hiếu
              </span>
              <BiSolidCheckShield className="text-green-500" size={20} />
              <span className="font-semibold text-green-500">
                Chứng nhận đã mua hàng
              </span>
            </div>
            <p className="text-slate-600 text-sm">Sản phẩm rất hay rất ưng ý</p>
          </div>
        ))}
        <div className="flex justify-end">
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalItem={20}
            parPage={parPage}
            showItem={Math.floor(20 / 3)}
          />
        </div>
      </div>
          <div>
            {
          userInfo ? <div className='flex flex-col gap-3'>
            <div className='flex gap-1'>
              <Rating
                onChange={(e) => setRat(e)}
                initialRating={rat}
                emptySymbol={<span className='text-slate-600 text-4xl'><CiStar /></span>}
                fullSymbol={<span className='text-[#EDBB0E] text-4xl'><AiFillStar /></span>}
              />
            </div>
            <form>
              <textarea value={re} required onChange={(e) => setRe(e.target.value)} className='border outline-0 p-3 w-full' name="" id="" cols="30" rows="5"></textarea>
              <div className='mt-2'>
                <button className='py-2 px-5 bg-red-500 text-white rounded-sm'>Gửi đánh giá</button>
              </div>
            </form>
          </div> : <div>
            <Link className='py-2 px-5 bg-red-500 text-white rounded-sm' to='/login'>Đăng nhập</Link>
          </div>
        }
          </div>
    </div>
  );
};

export default Reviews;
