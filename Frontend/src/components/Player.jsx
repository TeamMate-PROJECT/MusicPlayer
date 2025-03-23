import React, { useContext, useEffect, useRef } from "react";
import { AudioPlayerContext } from "../context/AudioPlayerContext";
import { assets } from "../assets/assets";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    playSong, // ✅ Use this to toggle play/pause
    progress,
    duration,
    seekTo,
    volume,
    changeVolume,
  } = useContext(AudioPlayerContext);

  const progressRef = useRef(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${(progress / duration) * 100}%`;
    }
  }, [progress, duration]);

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* Song Details */}
      <div className="hidden lg:flex items-center gap-4">
        {currentSong && (
          <>
            <img className="w-12 rounded-md" src={currentSong.imageUrl} alt="" />
            <div>
              <p>{currentSong.title}</p>
              <p className="text-gray-400 text-sm">{currentSong.artist}</p>
            </div>
          </>
        )}
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="Shuffle" />
          <img className="w-4 cursor-pointer" src={assets.prev_icon} alt="Previous" />
          <img
            className="w-4 cursor-pointer"
            src={isPlaying ? assets.pause_icon : assets.play_icon}
            alt="Play/Pause"
            onClick={() => playSong(currentSong)} // ✅ Toggle play/pause
          />
          <img className="w-4 cursor-pointer" src={assets.next_icon} alt="Next" />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="Loop" />
        </div>

        {/* Seek Bar */}
        <div className="flex items-center gap-5">
          <p>{formatTime(progress)}</p>
          <div
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer relative h-1"
            onClick={(e) => {
              const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
              seekTo(newTime);
            }}
          >
            <div ref={progressRef} className="absolute top-0 left-0 h-full bg-green-800 rounded-full"></div>
          </div>
          <p>{formatTime(duration)}</p>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => changeVolume(e.target.value)}
          className="w-20"
        />
      </div>
    </div>
  );
};

// Function to format time (MM:SS)
const formatTime = (time) => {
  if (!time) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default Player;