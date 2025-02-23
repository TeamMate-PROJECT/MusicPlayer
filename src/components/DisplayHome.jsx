import React from 'react'
import NavBar from './NavBar'
import  CarouselDefault  from './CarouselDefault'
const DisplayHome = () => {
  let slides = [
    "https://wallpaperaccess.com/full/809523.jpg",
    "https://wallpapercave.com/wp/wp3386769.jpg",
    "https://wallpaperaccess.com/full/809523.jpg",
    "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
    "rahmanjpg.jpeg",
  ];
  return (
    <>
      <NavBar />
      <div className="w-full h-[50vh] ">
      <CarouselDefault  slides={slides} />
    </div>
    </>
  );
}

export default DisplayHome
