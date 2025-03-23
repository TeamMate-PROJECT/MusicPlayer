import React from 'react'
import NavBar from './NavBar'
import  CarouselDefault  from './CarouselDefault'
import { songsData } from '../assets/assets';
import Songitem from './Songitem';
import { Key } from 'lucide-react';

const DisplayHome = () => {
  let slides = [
    "https://images.unsplash.com/photo-1483032469466-b937c425697b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images6.alphacoders.com/134/1348417.png ",
    "https://wallpaperaccess.com/full/3565937.jpg",
    "https://wallpaperaccess.com/full/1162633.jpg",
    "https://wallpaperaccess.com/full/1162824.jpg",
  ];
  return (
    <>
      <NavBar />
      <div className="w-full h-[40vh] ">
      <CarouselDefault  slides={slides} />
    </div>
    <div className='mb-4'>
      <h1 className='my-5 font-bold text-2x1'>Top List</h1>
      <div className='flex overflow-auto'>
        {songsData.map((item,index)=>(<Songitem Key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
      </div>
    </div>
    </>
  );
}

export default DisplayHome
