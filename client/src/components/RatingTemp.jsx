import React from 'react'
import icons from '../assets/icons'

const ratingTemp = ({rating}) => {
    const {AiFillStar, CiStar} = icons
  if (rating === 5) {
        return (
            <>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
            </>
        )
    }
    else if (rating === 4) {
        return (
            <>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-slate-600'><CiStar /></span>
            </>
        )
    }
    else if (rating === 3) {
        return (
            <>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-slate-600'><CiStar /></span>
                <span className='text-slate-600'><CiStar /></span>
            </>
        )
    }
    else if (rating === 2) {
        return (
            <>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-slate-600'><CiStar /></span>
                <span className='text-slate-600'><CiStar /></span>
                <span className='text-slate-600'><CiStar /></span>
            </>
        )
    }
    else if (rating === 1) {
        return (
            <>
                <span className='text-[#EDBB0E]'><AiFillStar /></span>
                <span className='text-slate-600'><CiStar /></span>
                <span className='text-slate-600'><CiStar /></span>
                <span className='text-slate-600'><CiStar /></span>
                <span className='text-slate-600'><CiStar /></span>
            </>
        )
    }
    else {
        return (
            <>
                <span className='text-slate-600'><CiStar /></span>
                <span className='text-slate-600'><CiStar /></span>
                <span className='text-slate-600'><CiStar /></span>
                <span className='text-slate-600'><CiStar /></span>
                <span className='text-slate-600'><CiStar /></span>
            </>
        )
    }
}

export default ratingTemp