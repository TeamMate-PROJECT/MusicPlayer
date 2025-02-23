import React from 'react'
import { assets } from '../assets/assets'

const NavBar = () => {
  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
            <img className='w-8 bg-black p-2 rounded-2x1 cursor-pointer' src={assets.arrow_left} alt="" />
            <img className='w-8 bg-black p-2 rounded-2x1 cursor-pointer' src={assets.arrow_right} alt="" />
        </div>
        <div className='flex items-center gap-4 cursor-pointer  px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors'>
        <img className='w-6' src={assets.search_icon} alt="" />
        <p className='font-bold'>Search</p>
        
        </div>
     </div>
    </>
  )
}

export default NavBar
