import React from 'react'
import icons from '../assets/icons';

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, showItem }) => {
    const { BsChevronDoubleLeft, BsChevronDoubleRight } = icons;

    let totalPage = Math.ceil(totalItem / parPage)
    let startPage = pageNumber

    let dif = totalPage - pageNumber;
    if(showItem>6){
        showItem = 5
    }
    if (dif <= showItem) {
        startPage = totalPage - showItem
    }
    let endPage = startPage < 0 ? showItem : showItem + startPage

    if (startPage <= 0) {
        startPage = 1
    }
    const createBtn = () => {
        const btns = []

        for (let i = startPage; i < endPage; i++) {
            btns.push(
                <li onClick={() => setPageNumber(i)} className={`
                    ${pageNumber === i ? 'bg-red-500 shadow-lg shadow-red-300/50 text-white' : 'bg-slate-300 hover:bg-slate-300 shadow-lg hover:shadow-slate-300/50 hover:text-slate-800 text-slate-700'} w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`
                }>
                    {i}
                </li>
            )
        }
        return btns
    }

    return (
        <ul className='flex gap-3'>
            {
                pageNumber > 1 && <li onClick={() => setPageNumber(pageNumber - 1)} className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-slate-800 cursor-pointer hover:text-white hover:bg-red-500'>
                    <BsChevronDoubleLeft />
                </li>
            }
            {
                createBtn()
            }
            {
                pageNumber < totalPage && <li onClick={() => setPageNumber(pageNumber + 1)} className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-slate-800 cursor-pointer hover:text-white hover:bg-red-500'>
                    <BsChevronDoubleRight />
                </li>
            }
        </ul>
    )
}

export default Pagination