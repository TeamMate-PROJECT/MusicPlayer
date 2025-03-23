import React from 'react'
import Sidebar from './components/Sidebar'
import Display from './components/Display'
import Player from './components/Player'
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
const App = () => {
  return (
    <div className="h-screen bg-black">
     <div className='h-[90%] flex'>
      <Sidebar />
      <Display />
     </div>
     <AudioPlayerProvider>
     <Player />
     </AudioPlayerProvider>
    </div>
  )
}

export default App