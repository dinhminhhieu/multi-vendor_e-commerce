import React from 'react'
import icons from '../assets/icons'

const ratingTempTemp = ({ratingTemp}) => {
    const {AiFillStar, CiStar} = icons
  if (ratingTemp === 5) {
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
    else if (ratingTemp === 4) {
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
    else if (ratingTemp === 3) {
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
    else if (ratingTemp === 2) {
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
    else if (ratingTemp === 1) {
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

export default ratingTempTemp