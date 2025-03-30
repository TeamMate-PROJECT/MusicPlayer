import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import CarouselDefault from './CarouselDefault';

const DisplayHome = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchRandomSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/songs/random-songs");
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchRandomSongs();
  }, []);

  let slides = [
    "https://images.unsplash.com/photo-1483032469466-b937c425697b?q=80&w=2070&auto=format&fit=crop",
    "https://images6.alphacoders.com/134/1348417.png",
    "https://wallpaperaccess.com/full/3565937.jpg",
    "https://wallpaperaccess.com/full/1162633.jpg",
    "https://wallpaperaccess.com/full/1162824.jpg",
  ];

  return (
    <>
      <NavBar />
      
      {/* Carousel Section */}
      <div className="w-full h-[40vh] mb-6 px-6">
        <CarouselDefault slides={slides} />
      </div>

      {/* Top List Section */}
      <div className="px-6">
  <h1 className="my-5 font-bold text-2xl text-white">Top List</h1>
  <div className="flex overflow-x-auto gap-4 scrollbar-hide">
    {songs.length === 0 ? (
      <p className="text-red-500">No songs available</p>
    ) : (
      songs.map((item) => (
        <div
          key={item._id}
          onClick={() => handleSongClick(item)}
          className="min-w-[180px] h-[250px] p-3 bg-[#181818] rounded-lg shadow-md text-white flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          <img
            src={item.imageUrl}
            alt="song cover"
            className="w-full h-[150px] object-cover rounded-md"
          />
          <div className="mt-2 text-center">
            <p className="font-bold truncate">{item.title}</p>
            <p className="text-gray-400 text-sm truncate">{item.artist}</p>
          </div>
        </div>
      ))
    )}
  </div>
</div>


    </>
  );
};

export default DisplayHome;