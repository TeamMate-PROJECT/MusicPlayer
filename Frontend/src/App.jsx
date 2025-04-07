import React, { useState } from "react";
import Sidebar from './components/Sidebar'
import Display from './components/Display'
import Player from './components/Player'
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
const App = () => {
  const { user } = useAuth(); // get logged-in user from context
  const [isSignup, setIsSignup] = useState(false); // toggle between login/signup

  if (!user) {
    return isSignup ? (
      <Signup switchToLogin={() => setIsSignup(false)} />
    ) : (
      <Login switchToSignup={() => setIsSignup(true)} />
    );
  }



  return (
    <AudioPlayerProvider>
    <div className="h-screen bg-black">
     <div className='h-[90%] flex'>
      <Sidebar />
      <Display />
     </div>
     <Player />
    </div>
    </AudioPlayerProvider>
  )
}

export default App