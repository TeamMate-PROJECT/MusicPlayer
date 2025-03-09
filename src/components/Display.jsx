import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import Playlist from './Playlist'
import MoodSongs from './MoodSongs'
import UploadSong from './UploadSongs'
const Display = () => {
  return (

    <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w=[75%] lg:ml-0'>
      <Routes>
        <Route path='/' element={<DisplayHome />} /> 
        <Route path="/mood/:mood" element={<MoodSongs />} />
        <Route path="/upload" element={<UploadSong />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
          </div>
  );
}

export default Display