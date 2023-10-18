import React from "react";
import icons from "../assets/icons";

const Pagiantion = ({
  pageNumber,
  setPageNumber,
  totalItem,
  parPage,
  showItem,
}) => {
  const { BsChevronDoubleLeft, BsChevronDoubleRight } = icons;
  let totalPage = Math.ceil(totalItem / parPage);
  let startPage = pageNumber;
  let dif = totalPage - pageNumber;

  if (dif <= showItem) {
    startPage = totalPage - showItem;
  }

  let endPage = startPage < 0 ? showItem : showItem + startPage;

  if (startPage <= 0) {
    startPage = 1;
  }

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          className={`${
            pageNumber === i
              ? "bg-red-500 shadow-lg shadow-red-500/50 text-white"
              : "bg-[#eeeeee] hover:bg-red-500 shadow-lg hover:shadow-red-500/50 hover:text-white"
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
          onClick={() => setPageNumber(i)}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  return (
    <ul className="flex gap-3">
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-[#eeeeee] cursor-pointer"
        >
          <BsChevronDoubleLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-[#eeeeee] cursor-pointer"
        >
          <BsChevronDoubleRight />
        </li>
      )}
    </ul>
  );
};

export default Pagiantion;
